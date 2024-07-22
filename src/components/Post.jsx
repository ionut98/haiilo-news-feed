import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CatAvatar,
  CatButton,
  CatCard,
  CatIcon,
  CatInput,
  CatSpinner,
} from "@haiilo/catalyst-react";

import getHoursBetweenDates from "../helpers/getHoursBetweenDates";
import formatLikesNumber from "../helpers/formatLikesNumber";
import { likedPosts, likePost } from "../reducers/postsSlice";
import { AVATAR_PLACEHOLDER } from "../constants";
import truncateText from "../helpers/truncateText";

const Post = ({ post, expanded = false }) => {
  if (!post) {
    return <CatSpinner size="xl" className="cat-mt-xl" />;
  }

  const { author, avatar, content, createdAt, id, image, likes, title } = post;

  const navigate = useNavigate();
  const navigateToPostView = () => {
    navigate(`/post/${id}`);
  };

  const isLiked = useSelector(likedPosts).includes(id);
  const dispatch = useDispatch();

  const handleLikeButton = React.useCallback(() => {
    dispatch(likePost(id));
  }, []);

  const likesText = isLiked
    ? `You and ${formatLikesNumber(likes)} others`
    : `${formatLikesNumber(likes)}`;

  const postedHour = getHoursBetweenDates(new Date(), createdAt);

  return (
    <CatCard className="post-card cat-border cat-flex cat-flex-col cat-items-start cat-gap-s">
      <div className="cat-flex cat-flex-row cat-gap-m">
        <CatAvatar
          size="m"
          round
          src={avatar || AVATAR_PLACEHOLDER}
          label={author}
        />
        <div className="cat-flex cat-flex-col cat-justify-center">
          <p className="cat-h6">{author || "Author"}</p>
          <p className="cat-text-xs cat-muted">{postedHour} hours ago</p>
        </div>
      </div>

      <p className="cat-h4 cat-mt-xs">{title || ""}</p>

      <p className="cat-text-s cat-mt-xs">
        {!expanded ? truncateText(content, 400) : content}
      </p>

      {!expanded && (
        <a
          onClick={navigateToPostView}
          className="cat-mt-m cat-text-s read-more"
        >
          Read entire post
        </a>
      )}

      <img
        src={image}
        alt="post image"
        className="post-thumbnail cat-radius-s cat-mt-s"
      />

      <hr className="cat-mt-s cat-fill-width" />

      <div className="cat-flex cat-flex-row cat-gap-s">
        <div>
          <CatButton
            size="s"
            icon={isLiked ? "thumbs-up-filled" : "thumbs-up-outlined"}
            color={isLiked ? "info" : "secondary"}
            variant="text"
            onCatClick={handleLikeButton}
            role="button"
          >
            Like
          </CatButton>
        </div>
        <div>
          <CatButton size="s" icon="chat-outlined" variant="text">
            Comment
          </CatButton>
        </div>
      </div>

      <hr className="cat-mt-m cat-fill-width" />

      {likes > 0 && (
        <div className="cat-pl-s cat-flex cat-flex-row cat-gap-xs cat-items-center cat-muted cat-text-xs cat-mt-s">
          <CatIcon
            icon="16-reaction-thumbs-up"
            size="xs"
            style={{ color: "#1C8193" }}
          />
          <span>{likesText}</span>
        </div>
      )}

      <div className="cat-flex cat-flex-row cat-items-center cat-border cat-fill-width cat-mt-s cat-p-s cat-gap-s comment-wrapper cat-radius-l">
        <CatAvatar
          round
          size="m"
          src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg"
        />
        <CatInput
          id="comment-input-id"
          className="cat-flex-1 cat-mb-s"
          placeholder="Leave a comment..."
        />
        <CatButton variant="text" size="s">
          Post
        </CatButton>
      </div>
    </CatCard>
  );
};

export default Post;
