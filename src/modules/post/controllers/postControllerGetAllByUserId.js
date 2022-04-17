import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
import postModel from '../postModel.js';

const { get } = pkg;

export default async function postGetAllByUserId(req, res) {   //get all posts which belong to the user (current logged user)

  const userId = get(req, 'userData.userId', null);

  await postModel.findAll({ where: { authorId: userId }})
    .then((doc) => {
      if (doc) {
        analytics('POST_GET_ALL_BY_USER_ID_SUCCESS', {
          user: userId,
        });
        res.status(200).json(message.success('Get all post by user id. Success', doc));
      }
      else {
        analytics('POST_GET_ALL_BY_USER_ID_FAIL', {
          user: userId,
          controller: 'postControllerGetAllByUserId',
        })
        return res.status(400).json(message.fail('Get all post by user id. Fail. No such posts'));
      }
    })
    .catch((error) => {
      analytics('POST_GET_ALL_BY_USER_ERROR', {
        error: error.message,
        user: userId,
        controller: 'postControllerGetAllByUserId',
      });
      res.status(400).json(message.fail('Get all post by user id failed. Error', error.message));
    });
}
