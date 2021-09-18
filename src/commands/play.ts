import { AudioPlayerStatus, joinVoiceChannel } from "@discordjs/voice";
import { Message, VoiceChannel } from "discord.js";
import * as ytdl from "ytdl-core";
import * as ytsr from "ytsr";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const play = new Command("play", async (message: Message) => {
  const voiceChannel = message.member.voice.channel as VoiceChannel;

  if (!voiceChannel) return message.reply("Geh in nen Voice!");

  const songURL = await findSong(message.content.split(" ").slice(1));
  const info = await ytdl.getInfo(songURL);

  message.reply(`:arrow_forward: Jawohl! Spiele \`${info.videoDetails.title}\`.`);
  MusicHandler.queue.push(songURL);
  MusicHandler.id = message.guildId;

  connect(voiceChannel);
  if (MusicHandler.player.state.status != AudioPlayerStatus.Playing) MusicHandler.play();
});

const findSong = async (args: Array<string>): Promise<string> => {
  if (!ytdl.validateURL(args[0])) {
    const filters = await ytsr.getFilters(args.join(" "));
    const filter = filters.get("Type").get("Video");
    const search = await ytsr(filter.url, { limit: 1 });

    // @ts-ignore
    return search.items[0].url;
  } else {
    return args[0];
  }
}

const connect = (voiceChannel: VoiceChannel) => {
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  connection.subscribe(MusicHandler.player);
}

/* audioPlayer.play(createAudioResource("/home/me/git/personal/beusware/bartender/assets/voice/musik1.mp3")); */
