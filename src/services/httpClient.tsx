import React from "react";
import Axios from "axios";
const youtubeApi = "https://www.googleapis.com/youtube/v3/search";
const apiKey = "AIzaSyA5ZwwOWpGSejsJexLRqHUv3kh2YPg4Lw0";

export async function fetchVideoSearch(searchText: string) {
  return await Axios.get(
    `${youtubeApi}?part=snippet&key=${apiKey}&q=${searchText}&type=video`
  );
}
