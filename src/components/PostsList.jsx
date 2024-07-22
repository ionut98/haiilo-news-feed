import { useSelector } from "react-redux";
import { CatSpinner } from "@haiilo/catalyst-react";

import { isError, isLoading, postsList } from "../reducers/postsSlice";
import Post from "./Post";
import Container from "./Container";

const PostsList = () => {
  const posts = useSelector(postsList);
  const loading = useSelector(isLoading);
  const error = useSelector(isError);

  return (
    <Container>
      {error && <div className="cat-text-danger">{error}</div>}
      {loading && !posts && <CatSpinner size="xl" className="cat-mt-xl" />}
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </Container>
  );
};

export default PostsList;
