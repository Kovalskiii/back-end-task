import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pkg from 'lodash';
const { get, uniq, flattenDeep, hasIn } = pkg;
import User from '../userModel.js';
import message from '../../utils/messages.js';
import roles from '../../permission/roles.js';
import analytics from '../../analytics/controllers/analytics.js';
import userUpdateByIdQuery from '../queries/userUpdateByIdQuery.js';

const permissions = (userRoles) => uniq(flattenDeep(userRoles.map((el) => roles[el])));

const userLogin = (req, res) => {
  const email = get(req, 'body.email', '').trim().toLowerCase();

  User.findOne({ where : { email: email }})
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
          if (err) {
            //
            analytics('USER_LOGIN_FAIL', {
              email: user.email,
              reason: err,
              isBodyPasswordExist: hasIn(req, 'body.password'),
              isUserPasswordExist: hasIn(user, 'password'),
            });

            return res.status(401).json(message.fail('Auth failed'));
          } else if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              },
            );

            user.password = null;

            // Setting login date
            await userUpdateByIdQuery({
              userId: user.id,
              values: { lastLoginAt: new Date() },
            });

            analytics('USER_LOGIN_SUCCESS', {
              user: user.id,
            });

            return res.status(200).json({
              message: 'Auth success',
              token,
              user: user,
              permissions: permissions(user.roles),
              userId: user.id,
            });
          } else {
            //
            analytics('USER_LOGIN_FAIL', {
              email,
              reason: 'Wrong password',
              controller: 'userControllerLogin',
            });

            res.status(401).json(message.fail('Auth failed'));
          }
        });
      } else {
        //
        analytics('USER_LOGIN_FAIL', {
          email,
          reason: 'User not found',
          controller: 'userControllerLogin',
        });

        res.status(401).json(message.fail('Auth failed'));
      }
    })
    .catch((error) => {
      //
      analytics('USER_LOGIN_ERROR', {
        email,
        controller: 'userControllerLogin',
        error,
      });

      res.status(400).json(message.fail('Auth failed. Error'));
    });
};

export default userLogin;
