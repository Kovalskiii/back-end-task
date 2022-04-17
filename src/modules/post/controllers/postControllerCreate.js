import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
import postModel from '../postModel.js';

const { get } = pkg;

export default async function postCreate(req, res) {

  const authorId = get(req, 'userData.userId', null);
  const title = get(req, 'body.title', '');
  const content = get(req, 'body.content', '');

  const newPost = {
    title,
    content,
    authorId: authorId
  };

  await postModel
    .create(newPost)
    .then((post) => {
      analytics('POST_CREATE_SUCCESS', {
        user: authorId,
        postId: post.id
      });
      res.status(200).json(message.success('Post created. Success', { postId: post.id }));
    })
    .catch((error) => {
      analytics('POST_CREATE_ERROR', {
        error: error.message,
        user: authorId,
        controller: 'postControllerCreate'
      });
      res.status(400).json(message.fail('Creating post failed. Error', error.message));
    });
}
