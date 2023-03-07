import Express from 'express';
import { getPosts, createPost } from '../controllers/postController.js';

const router = Express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;