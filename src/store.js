import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/postsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
