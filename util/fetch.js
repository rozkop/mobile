import axios from "axios";

import { API_URL } from "@env";
import { getFormattedDate } from "../util/date";

export async function fetchPosts(sort, pageNumber) {
  const response = await axios.get(
    API_URL + "/" + sort + "?page=" + pageNumber
  );
  const posts = [];

  for (const key in response.data.data) {
    const postObj = {
      id: response.data.data[key].id,
      user_id: response.data.data[key].user.id,
      user_name: response.data.data[key].user.name,
      community_id: response.data.data[key].community.id,
      community_name: response.data.data[key].community.name,
      community_slug: response.data.data[key].community.slug,
      comments: response.data.data[key].count_comments,
      date: getFormattedDate(new Date(response.data.data[key].created_at)),
      slug: response.data.data[key].slug,
      title: response.data.data[key].title,
      text: response.data.data[key].text,
      rating: response.data.data[key].rating,
    };

    posts.push(postObj);
  }

  return posts;
}

export async function fetchCommunityData(
  communitySlug,
  sort,
  pageNumber,
  authToken
) {
  const response = await axios.get(
    API_URL + "/c/" + communitySlug + "/" + sort + "?page=" + pageNumber,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const communityObj = {
    id: response.data.data.Community.id,
    date: getFormattedDate(new Date(response.data.data.Community.created_at)),
    rating: response.data.data.Community.rating,
    user: response.data.data.Community.user,
    community_slug: response.data.data.Community.slug,
    community_name: response.data.data.Community.name,
    color: response.data.data.Community.color,
    description: response.data.data.Community.description,
    posts: response.data.data.Posts,
    is_user_reacting: response.data.data.Community.is_user_reacting,
  };

  return communityObj;
}

export async function fetchCommunities() {
  const response = await axios.get(API_URL + "/c");
  const communities = [];

  for (const key in response.data) {
    const communityObj = {
      key: [response.data[key].id.toString(), response.data[key].slug],
      value: response.data[key].name,
    };
    communities.push(communityObj);
  }

  return communities;
}

export async function fetchPost(postId) {
  const response = await axios.get(API_URL + "/post/" + postId);

  return response.data.data;
}

export async function fetchUserData(authToken) {
  const response = await axios.get(API_URL + "/user/show", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}
