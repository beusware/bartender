import { videoInfo } from "ytdl-core";

export class Song {
  url: string;
  info: videoInfo;

  constructor(url: string, info: videoInfo) {
    this.url = url;
    this.info = info;
  }
}