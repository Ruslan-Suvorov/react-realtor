import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// user API =========================================
export const signIn = (formData) => API.post("/signin", formData);
export const signUp = (formData) => API.post("/signup", formData);
export const googleSignIn = (result) => API.post("/google-signin", result);

// advert API =======================================
export const createAdvert = (result) => API.post("/create-advert", result);
export const getAdverts = (page, search, tag) =>
  API.get(`/adverts?page=${page}&search=${search}&tag=${tag}`);
export const getAdvert = (id) => API.get(`/advert/${id}`);
export const getAdvertsByUser = (userId) => API.get(`/dashboard/${userId}`);
export const updateAdvert = (id, updatedAdvertData) =>
  API.patch(`/edit-advert/${id}`, updatedAdvertData);
export const deleteAdvert = (id) => API.delete(`/delete-advert/${id}`);
export const likeAdvert = (id) => API.patch(`/like/${id}`);

// comment API ======================================
export const createComment = (comment) => API.post("/create-comment", comment);
export const getComments = (id) => API.get(`/comments/${id}`);
export const deleteComment = (id) => API.delete(`/delete-comment/${id}`);
export const deleteReply = (id, commentId) =>
  API.patch(`/delete-reply/${id}`, commentId);
