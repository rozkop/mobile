import axios from "axios";

import { API_URL } from "@env";

export async function editPost(postId, postTitle, postText, authToken) {
  await axios.put(
    API_URL + "/post/" + postId + "/edit",
    {
      title: postTitle,
      text: postText,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}
