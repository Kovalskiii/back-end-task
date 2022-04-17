import { Router } from 'express';
import serviceHeader from "../utils/serviceHeader.js";
import userCheckAuth from "../user/middlewares/userCheckAuth.js";
import userCheckPerm from "../permission/userCheckPerm.js";
import postCreate from "./controllers/postControllerCreate.js";
import postDeleteById from "./controllers/postControllerDeleteById.js";
import postUpdateById from "./controllers/postControllerUpdateById.js";
import postChangeVisibility from "./controllers/postControllerChangeVisibility.js";
import postGetById from "./controllers/postControllerGetById.js";
import postGetAllByUserId from "./controllers/postControllerGetAllByUserId.js";
import postGetAllPublic from "./controllers/postControllerGetAllPublic.js";

const router = Router();

router.post(
  '/create',
  serviceHeader('postControllerCreate'),
  userCheckAuth,
  userCheckPerm('post.create'),
  postCreate,
);

router.patch(
  '/update/:postId',
  serviceHeader('postControllerUpdateById'),
  userCheckAuth,
  userCheckPerm('post.update'),
  postUpdateById,
);

router.patch(
  '/update/visibility/:postId',
  serviceHeader('postControllerChangeVisibility'),
  userCheckAuth,
  userCheckPerm('post.update'),
  postChangeVisibility,
);

router.get(
  '/get/:postId',
  serviceHeader('postControllerGetById'),
  userCheckAuth,
  userCheckPerm('post.get.all'),
  postGetById,
);

router.get(
  '/getAll/by/user',
  serviceHeader('postControllerGetAllByUserId'),
  userCheckAuth,
  userCheckPerm('post.get.all'),
  postGetAllByUserId,
);

router.get(
  '/getAll/public',
  serviceHeader('postControllerGetAllPublic'),
  userCheckAuth,
  userCheckPerm('post.get.all'),
  postGetAllPublic,
);

router.delete(
  '/delete/:postId',
  serviceHeader('postControllerDeleteById'),
  userCheckAuth,
  userCheckPerm('post.delete'),
  postDeleteById,
);

export default router;
