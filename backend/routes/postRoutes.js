import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {
  createPost,
  deletePost,
  getFeedPost,
  getPost,
  getUserPosts,
  likeUnlikePost,
  replyToPost,
} from '../controller/postController.js';
const router = express.Router();

// router.post('/create', protectRoute, createPost);
// router.get('/:id', getPost);
// router.delete('/:id', protectRoute, deletePost);
// router.put('/like/:id', protectRoute, likeUnlikePost);
// router.post('/reply/:id', protectRoute, replyToPost);
// router.get('/feed', protectRoute, getFeedPost);
router.get('/feed', protectRoute, getFeedPost);
router.get('/:id', getPost);
router.get('/user/:query', getUserPosts);
router.post('/create', protectRoute, createPost);
router.delete('/:id', protectRoute, deletePost);
router.put('/like/:id', protectRoute, likeUnlikePost);
router.put('/reply/:id', protectRoute, replyToPost);
//
export default router;
