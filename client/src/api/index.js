import axios from 'axios';

const api = axios.create({ baseurl: "http://localhost:5000/" });
api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => api.get(`/posts/`);
export const fetchPostsBySearch = (searchQuery) => api.get(`/posts/search?searchQuery=${searchQuery.search || null}&tags=${searchQuery.tags}`);
export const createPost = (post) => api.post(`/posts/`, post);
export const updatePost = (currentid, post) => api.patch(`/posts/${currentid}`, post);
export const deletePost = (currentid) => api.delete(`/posts/${currentid}`);
export const likePost = (currentid, data) => api.patch(`/posts/${currentid}/likepost`, data);

export const signIn = (formdata) => api.post('/users/signin', formdata);
export const signUp = (formdata) => api.post('/users/signup', formdata);