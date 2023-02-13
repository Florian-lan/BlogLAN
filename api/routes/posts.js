import express from "express";
import {
    getPosts,
    getPost, 
    addPost,
    deletePost,
    updatePost,
} from '../controllers/posts.js'

const router = express.Router()

// post delete get put 分别对应增删查改
router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',addPost)
router.delete('/:id',deletePost)
router.put('/:id',updatePost)


export default router
