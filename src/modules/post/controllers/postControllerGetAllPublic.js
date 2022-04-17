import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
import postModel from '../postModel.js';

const { get } = pkg;

export default async function postGetAllPublic(req, res) {   //get all public posts

  const userId = get(req, 'userData.userId', null);

  await postModel.findAll({ where: { isHidden: false }})
    .then((doc) => {
      if (doc) {
        analytics('GET_ALL_PUBLIC_POSTS_SUCCESS', {
          user: userId,
        });
        res.status(200).json(message.success('Get all public posts. Success', doc));
      }
      else {
        analytics('GET_ALL_PUBLIC_POSTS__FAIL', {
          user: userId,
          controller: 'postControllerGetAllByPublic',
        })
        return res.status(400).json(message.fail('Get all public posts. Fail. No such posts'));
      }
    })
    .catch((error) => {
      analytics('GET_ALL_PUBLIC_POSTS__ERROR', {
        error: error.message,
        user: userId,
        controller: 'postControllerGetAllPublic',
      });
      res.status(400).json(message.fail('Get all public posts failed. Error', error.message));
    });
}
