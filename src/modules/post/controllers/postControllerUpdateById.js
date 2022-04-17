import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
import postModel from '../postModel.js';
import { userCanByOwner } from '../../permission/userCheckPerm.js';

const { get } = pkg;

export default async function postUpdateById(req, res) {

  const authorId = get(req, 'userData.userId', null);
  const postId = get(req, 'params.postId', null);
  const title = get(req, 'body.title', '');
  const content = get(req, 'body.content', '');

  const updatedPost = {
    title,
    content
  };

  const userCanByOwnerResult = await userCanByOwner(postModel, postId, authorId, res); // verify if user is owner

  if (userCanByOwnerResult.success) {
    await postModel.update(updatedPost, { where: { id: postId }})
      .then((post) => {
        analytics('POST_UPDATE_BY_ID_SUCCESS', {
          user: authorId,
          postId: postId,
        });
        res.status(200).json(message.success('Post updated by id. Success', { postId : postId }));
      })
      .catch((error) => {
        analytics('POST_UPDATE_BY_ID_ERROR', {
          error: error.message,
          user: authorId,
          controller: 'postControllerUpdateById',
        });
        res.status(400).json(message.fail('Post updated by id failed. Error', error.message));
      });
  }
}
