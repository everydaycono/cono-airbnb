import { Router } from 'express';
import {
  getVisitorHistory,
  postVisitorHistory,
  getSingleVisitorHistory,
  deleteSingleVisitorHistory,
} from '../controllers/visitor.controller.js';

const router = Router();

router.route('/').get(getVisitorHistory);
router.route('/').post(postVisitorHistory);
router.route('/:id').get(getSingleVisitorHistory);
router.route('/:id').delete(deleteSingleVisitorHistory);

export default router;
