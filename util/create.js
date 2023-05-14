import axios from "axios";

import { API_URL } from "@env";

export async function createPost(communitySlug, title, text, authToken) {
  await axios.post(
    API_URL + "/c/" + communitySlug + "/post/submit",
    {
      title: title,
      text: text,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}

export async function createComment(postId, text, authToken) {
  const response = await axios.post(
    API_URL + "/post/" + postId + "/comments/submit",
    {
      text: text,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data.data;
}

export async function createCommunity(
  communityName,
  communityDescription,
  authToken
) {
  const response = await axios.post(
    API_URL + "/c/create",
    {
      name: communityName,
      description: communityDescription,
      color: "#808080",
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}

export async function createReport(postId, authToken) {
  await axios.put(
    API_URL + "/post/" + postId + "/report",
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}
