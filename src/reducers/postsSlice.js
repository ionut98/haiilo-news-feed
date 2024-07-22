import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postsList: null,
    error: null,
    isLoading: false,
    likedPosts: [],
  },
  reducers: {
    fetchPostsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.postsList = action.payload;
    },
    fetchPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    likePost: (state, action) => {
      if (state.likedPosts.includes(action.payload)) {
        state.likedPosts = state.likedPosts.filter(
          (postId) => postId !== action.payload
        );
      } else {
        state.likedPosts.push(action.payload);
      }
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  likePost,
} = postsSlice.actions;

export const postsList = (state) => state.posts.postsList;
export const likedPosts = (state) => state.posts.likedPosts;
export const isLoading = (state) => state.posts.isLoading;
export const isError = (state) => state.posts.error;

export default postsSlice.reducer;
