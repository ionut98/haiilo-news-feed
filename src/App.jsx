import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PostsList from "./components/PostsList";
import PostView from "./components/PostView";
import {
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  postsList,
} from "./reducers/postsSlice";
import getPosts from "./services/getPosts";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(postsList);

  const fetchPosts = React.useCallback(async () => {
    dispatch(fetchPostsStart());
    const results = await getPosts();
    if (results.success) {
      dispatch(fetchPostsSuccess(results.data));
    } else {
      dispatch(fetchPostsFailure(results.error));
    }
  }, []);

  React.useEffect(() => {
    if (posts === null) {
      fetchPosts();
    }
  }, [posts]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:postId" element={<PostView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
