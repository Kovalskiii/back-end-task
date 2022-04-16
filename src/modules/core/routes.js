import userRouter from '../user/userRoutes.js';
import postRouter from '../post/postRoutes.js';

export default function routes(app) {
  app.use('/user', userRouter);
  app.use('/post', postRouter);
}
