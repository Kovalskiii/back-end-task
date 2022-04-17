import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
import postModel from "../postModel.js";
import { userCanByOwner } from "../../permission/userCheckPerm.js";

const { get } = pkg;

export default async function postChangeVisibility(req, res) {

  const authorId = get(req, 'userData.userId', null);
  const postId = get(req, 'params.postId', null);
  const isHidden = get(req, 'body.isHidden', '');

  const updatedPost = {
    isHidden
  };

  const userCanByOwnerResult = await userCanByOwner(postModel, postId, authorId, res); //check owner permission

  if (userCanByOwnerResult.success) {
    await postModel.update(updatedPost, { where: { id: postId }})
      .then(() => {
        analytics('POST_CHANGE_VISIBILITY_SUCCESS', {
          user: authorId,
          postId: postId,
        });
        res.status(200).json(message.success('Post change visibility. Success', { isHidden : isHidden }));
      })
      .catch((error) => {
        analytics('POST_CHANGE_VISIBILITY_ERROR', {
          error: error.message,
          user: authorId,
          controller: 'postControllerChangeVisibility',
        });
        res.status(400).json(message.fail('Post change visibility. Error', error.message));
      });
  }
}
