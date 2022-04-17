import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
import postModel from '../postModel.js';

const { get } = pkg;

export default async function postGetById(req, res) {

  const authorId = get(req, 'userData.userId', null);
  const postId = get(req, 'params.postId', null);

  await postModel.findOne({ where : { id: postId }})
    .then((doc) => {
      if (doc) {
        analytics('POST_GET_BY_ID_SUCCESS', {
          user: authorId,
          postId: postId,
        });
        res.status(200).json(message.success('Post get by id. Success', doc));
      }
      else {
        analytics('POST_GET_BY_ID_FAIL', {
          user: authorId,
        })
        return res.status(400).json(message.fail('Post get by id. Fail. No such post'));
      }
    })
    .catch((error) => {
      analytics('POST_GET_BY_ID_ERROR', {
        error: error.message,
        user: authorId,
        controller: 'postControllerGetById',
      });
      res.status(400).json(message.fail('Post get by id failed. Error', error.message));
    });
}
