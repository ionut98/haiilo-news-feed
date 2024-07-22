import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";

import Post from "../../components/Post";
import store from "../../store";
import getHoursBetweenDates from "../../helpers/getHoursBetweenDates";
import truncateText from "../../helpers/truncateText";
import formatLikesNumber from "../../helpers/formatLikesNumber";
import userEvent from "@testing-library/user-event";

const mockedPost = {
  createdAt: "2024-07-22T05:31:28.110Z",
  title:
    "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
  avatar:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1043.jpg",
  content:
    "Veritatis at deserunt vero veniam rerum sunt repellendus blanditiis. Nesciunt tempora ad reiciendis dignissimos sed eaque quas. Nam dolorum expedita molestias facilis eligendi corrupti quo fuga. Quas culpa explicabo saepe amet reprehenderit quos atque debitis ratione. Ut accusamus amet. Voluptatum repudiandae nesciunt nesciunt molestiae cum assumenda. Rerum laborum saepe quos. Accusantium perspiciatis quis architecto voluptas ratione necessitatibus ullam provident similique. Quam veniam facere sed quaerat ullam repudiandae. Voluptas cum expedita deleniti commodi ullam nobis rem quisquam. Illum consequatur asperiores blanditiis.",
  likes: 57060,
  author: "Gretchen Deckow",
  image: "https://loremflickr.com/640/480/fashion",
  id: "1",
};

describe("Post", () => {
  const renderComponent = (expanded = false) => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Post post={mockedPost} expanded={expanded} />
        </BrowserRouter>
      </Provider>
    );

    const formattedPostHour =
      getHoursBetweenDates(new Date(), mockedPost.createdAt) + " hours ago";

    const content = !expanded
      ? truncateText(mockedPost.content, 400)
      : mockedPost.content;

    return {
      author: screen.getByText(mockedPost.author),
      title: screen.getByText(mockedPost.title),
      content: screen.getByText(content),
      createdAt: screen.getByText(formattedPostHour),
      likes: screen.getByText(`${formatLikesNumber(mockedPost.likes)}`, {
        exact: false,
      }),
      image: screen.getByAltText("post image"),
      likeButton: screen.getByRole("button", { name: "Like" }),
      readPost: !expanded ? screen.getByText("Read entire post") : null,
    };
  };

  it("should render Post with the correct author when is provided", () => {
    const { author } = renderComponent();
    expect(author).toBeInTheDocument();
  });

  it("should render Post with the correct title when is provided", () => {
    const { title } = renderComponent();
    expect(title).toBeInTheDocument();
  });

  it("should render Post with the correct image when is provided", () => {
    const { image } = renderComponent();
    expect(image).toBeInTheDocument();
  });

  it("should render Post with the correct post hour when is provided", () => {
    const { createdAt } = renderComponent();
    expect(createdAt).toBeInTheDocument();
  });

  it("should render Post with the correct content when is provided", () => {
    const { content } = renderComponent();
    expect(content).toBeInTheDocument();
  });

  it("should render Post with the expanded content when is expanded prop is provided", () => {
    const expanded = true;
    const { content } = renderComponent(expanded);
    expect(content).toBeInTheDocument();
  });

  it("should update likes list when clicks on Like button", async () => {
    const { likeButton } = renderComponent();

    fireEvent(likeButton, createEvent("catClick", likeButton));

    const formattedLikesText = `You and ${formatLikesNumber(
      mockedPost.likes
    )} others`;
    expect(screen.getByText(formattedLikesText)).toBeInTheDocument();
  });

  it("should update likes list when unlike the post", async () => {
    const { likeButton } = renderComponent();

    fireEvent(likeButton, createEvent("catClick", likeButton));
    fireEvent(likeButton, createEvent("catClick", likeButton));

    const formattedLikesText = `${formatLikesNumber(mockedPost.likes)}`;
    expect(
      screen.getByText(formattedLikesText, { exact: false })
    ).toBeInTheDocument();
  });

  it("should change route to /post/1", async () => {
    const { readPost } = renderComponent();

    const user = userEvent.setup();
    await user.click(readPost);

    expect(location.pathname).toEqual("/post/1");
  });
});
