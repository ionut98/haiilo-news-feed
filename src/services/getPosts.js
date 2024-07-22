import { API, POSTS_URI } from "../constants";

export default async () => {
  try {
    const response = await fetch(`${API}${POSTS_URI}`);
    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};
