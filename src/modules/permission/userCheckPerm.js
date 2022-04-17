import message from '../utils/messages.js';
import User from '../user/userModel.js';
import roles from './roles.js';
import analytics from '../analytics/controllers/analytics.js';
import pkg from 'lodash';

const { get } = pkg;

export const userCan = (userRoles, checkedPermission) => {
  for (let i = 0; i < userRoles.length; i += 1) {
    if (roles[userRoles[i]].includes(checkedPermission)) return true;
  }
  return false;
};

const userCheckPerm = (checkedPermission) => (req, res, next) => {
  const userId = get(req, 'userData.userId', null);

  User.findOne({ where : { id: userId }})
    .then((doc) => {
      if (doc) {
        const roles = get(doc, 'roles', []);

        if (userCan(roles, checkedPermission)) {
          req.userData.roles = roles;
          req.userData.name = get(doc, 'name');
          next();
        } else {
          const reason = 'Permission denied';
          analytics('USER_CHECK_PERMISSION_FAIL', {
            reason,
            roles,
            user: userId,
            controller: 'userCheckPerm',
          });

          res.status(400).json(message.fail(reason));
        }
      } else {
        const reason = 'Current user not found';
        //
        analytics('USER_CHECK_PERMISSION_FAIL', {
          reason,
          user: userId,
          controller: 'userCheckPerm',
        });

        res.status(400).json(message.fail(reason));
      }
    })
    .catch((error) => {
      //
      analytics('USER_CHECK_PERMISSION_ERROR', {
        error: error.message,
        roles,
        user: userId,
        controller: 'userCheckPerm',
      });

      res.status(400).json(message.fail('Permission denied. Error'));
    });
};

export default userCheckPerm;

export const userCanByPerm = async (userId, checkedPermission) => {
  return await User.findOne({ where : { id: userId }})
    .then((doc) => {
      const roles = get(doc, 'roles', []);
      return userCan(roles, checkedPermission);
    })
    .catch((err) => {
      analytics('USER_CHECK_PERMISSION_ERROR', {
        reason: err,
        checkedPermission,
        user: userId,
        controller: 'userCheckPerm',
      });
    });
};

export const userCanByOwnerAndAdmin = async (Model, filterId, userRoles, userId, res) => {  //verify if user is owner or is admin
  let admin;
  for (let i = 0; i < userRoles.length; i += 1) {
    if (userRoles[i].includes('admin')) admin = true;
    else admin = false;
  }
  return Model.findOne({ where : { id: filterId }})
    .then((doc) => {
      if (doc) {
        if ((userId === doc.authorId) || (admin === true)) {
          return message.success('Success', doc);
        } else {
          analytics('ERROR_YOU_ARE_NOT_AN_OWNER', {
            user: userId,
            owner: doc.authorId,
          })
          return res.status(400).json(message.fail('You are not allowed to do this. You are not an owner. Error.'));
        }
      }
      else
      {
        analytics('OWNER_NOT_FOUND_FAIL', {
          user: userId,
          owner: doc.authorId,
        })
        return res.status(400).json(message.fail('Owner not found. Fail.'));
      }
    })
    .catch((error) => {
      //
      analytics('OWNER_NOT_FOUND_ERROR', {
        error,
        user: userId,
        controller: 'userCheckPerm',
      });
      return res.status(400).json(message.fail('Owner not found. Error.'));
    });
};

export const userCanByOwner = async (Model, filterId, userId, res) => {  //verify if user is owner
  //
  return Model.findOne({ where : { id: filterId }})
    .then((doc) => {
      if (doc) {
        if (userId === doc.authorId) {
          return message.success('Success', doc);
        } else {
          analytics('ERROR_YOU_ARE_NOT_AN_OWNER', {
            user: userId,
            owner: doc.authorId,
          })
          return res.status(400).json(message.fail('You are not allowed to do this. You are not an owner. Error.'));
        }
      }
      else
      {
        analytics('OWNER_NOT_FOUND_FAIL', {
          user: userId,
          owner: doc.authorId,
        })
        return res.status(400).json(message.fail('Owner not found. Fail.'));
      }
    })
    .catch((error) => {
      //
      analytics('OWNER_NOT_FOUND_ERROR', {
        error,
        user: userId,
        controller: 'userCheckPerm',
      });
      return res.status(400).json(message.fail('Owner not found. Error.'));
    });
};
