import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "./Post";
import Container from "./Container";

const PostView = () => {
  const { postId } = useParams();
  const selectedPostFromParams = useSelector((state) =>
    state.posts.postsList?.find((post) => post.id === postId)
  );

  return (
    <Container>
      <Post post={selectedPostFromParams} expanded />
    </Container>
  );
};

export default PostView;
