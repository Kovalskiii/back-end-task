import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
import postModel from '../postModel.js';
import { userCanByOwnerAndAdmin } from '../../permission/userCheckPerm.js';

const { get } = pkg;

export default async function postDeleteById(req, res) {

  const authorId = get(req, 'userData.userId', null);
  const postId = get(req, 'params.postId', null);
  const roles = get(req, 'userData.roles', null);

  const userCanByOwnerAndAdminResult = await userCanByOwnerAndAdmin(postModel, postId, roles, authorId, res); // verify if user is owner or is admin

  if (userCanByOwnerAndAdminResult.success) {
    await postModel
      .destroy({ where: { id: postId }})
      .then(() => {
        analytics('POST_DELETE_SUCCESS', {
          user: authorId,
          postId: postId
        });
        res.status(200).json(message.success('Post deleted. Success'));
      })
      .catch((error) => {
        analytics('POST_DELETE_ERROR', {
          error: error.message,
          user: authorId,
          controller: 'postControllerDeleteById',
        });
        res.status(400).json(message.fail('Post delete failed. Error', error.message));
      });
  }
}
