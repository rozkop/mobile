import axios from "axios";

import { API_URL } from "@env";

export async function joinCommunity(communitySlug, authToken) {
  const response = await axios.put(
    API_URL + "/c/" + communitySlug + "/react",
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
}
