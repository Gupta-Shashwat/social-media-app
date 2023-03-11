import Express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/postController.js';

const router = Express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;