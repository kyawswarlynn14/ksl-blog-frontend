import axios from "axios"

export const getPosts = async () => {
    const res = await axios.get('http://localhost:8080/api/posts');

    return res.data;
}

export const getPostDetails = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/posts/${id}`);

    return res.data;
}

export const getCategories = async () => {
    const res = await axios.get(`http://localhost:8080/api/categories`);

    return res.data;
}

export const getAuthors = async () => {
    const res = await axios.get(`http://localhost:8080/api/authors`);

    return res.data;
}

export const getRecentPosts = async () => {
    const res = await axios.get(`http://localhost:8080/api/posts/recent`);

    return res.data;
}

export const getCategoryPosts = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/posts/categoryposts/${id}`);

    return res.data;
}

export const getFeaturedPosts = async () => {
    const res = await axios.get(`http://localhost:8080/api/posts/featured`);

    return res.data;
}

export const getComments = async () => {
    const res = await axios.get('http://localhost:8080/api/comments');

    return res.data;
}