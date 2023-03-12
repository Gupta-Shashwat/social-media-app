import axios from 'axios';

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (post) => axios.post(url, post);
export const updatePost = (currentId, post) => axios.patch(`${url}/${currentId}`, post);
export const deletePost = (currentId) => axios.delete(`${url}/${currentId}`);