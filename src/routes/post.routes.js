import { Router } from 'express';
import {
  createAuthPost,
  deletePost,
  showAllPost,
  showSinglePost,
} from '../controllers/post.controller.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = Router();

router.route('/').get(showAllPost);
router.route('/').post(authenticateUser, createAuthPost);
router.route('/:id').get(showSinglePost);
router.route('/:id').delete(authenticateUser, deletePost);

export default router;
