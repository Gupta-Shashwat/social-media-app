import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    try {
        const { searchQuery, tags } = req.query;
        const title = new RegExp(searchQuery, 'i');
        const post = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags?.split(',') } }] });
        res.status(200).json({ data: post });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date() });
    console.log(newPost);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with that ID");
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    return res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with that ID");
    await PostMessage.findByIdAndDelete(_id);

    res.status(200).send("Post deleted successfully")
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post found with that ID");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}