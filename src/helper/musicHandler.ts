import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection } from "@discordjs/voice";
import * as ytdl from "ytdl-core";

export class MusicHandler {
  static id: string;
  static queue: Array<string> = [];
  static player: AudioPlayer = createAudioPlayer();

  static play() {
    let stream = ytdl(MusicHandler.queue[0]);
    this.player.play(createAudioResource(stream));
  }

  static skip() {
    this.queue.shift();
    if (this.player.state.status == AudioPlayerStatus.Playing) this.player.stop();
    
    if (this.queue.length != 0) {
      this.play();
      return;
    }

    setTimeout(() => {
      if (this.queue.length == 0) this.stop();
    }, 15000);
  }

  static stop() {
    if (this.id) getVoiceConnection(this.id).destroy();
  }
}

setInterval(() => {
  if (MusicHandler.player.state.status == AudioPlayerStatus.Idle && MusicHandler.queue.length != 0) MusicHandler.skip();
}, 1000);