import React from 'react';
import { getPosts } from '../controllers/postController.js';

const router = React.Router();

router.get('/', getPosts);

export default router;