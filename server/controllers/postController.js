import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with that ID");
    const updatedPost = await postMessage.findByIdAndUpdate(_id, body, { new: true });
    return res.json(updatedPost);
}