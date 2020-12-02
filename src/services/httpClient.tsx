import Axios from "axios";
import config from "../config.json"
const youtubeApi = "https://www.googleapis.com/youtube/v3/search";

export async function fetchVideoSearch(searchText: string) : Promise<VideoData[]>{
  return (
    await Axios.get(
      `${youtubeApi}?part=snippet&key=${config.YoutubeAPIKey}&q=${searchText}&type=video&maxResults=25`
    )
  ).data.items;
}
export type VideoData = {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
  };
};
