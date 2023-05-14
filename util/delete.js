import axios from "axios";

import { API_URL } from "@env";

export async function deletePost(postId, authToken) {
  await axios.delete(API_URL + "/post/" + postId + "/delete", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function deleteComment(postId, commentId, authToken) {
  await axios.delete(
    API_URL + "/post/" + postId + "/comments/" + commentId + "/delete",
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}
