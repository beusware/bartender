import { AudioPlayerStatus, joinVoiceChannel } from "@discordjs/voice";
import { Message, VoiceChannel } from "discord.js";
import * as ytdl from "ytdl-core";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const play = new Command("play", (message: Message) => {
  const songURL = message.content.split(" ")[1];
  const voiceChannel = message.member.voice.channel as VoiceChannel;

  if (!voiceChannel) return message.reply("Geh in nen Voice!");

  ytdl.getInfo(songURL).then((info) => {
    message.reply(`:arrow_forward: Jawohl! Spiele \`${info.videoDetails.title}\`.`);
    MusicHandler.queue.push(songURL);
    MusicHandler.id = message.guildId;

    connect(voiceChannel);
    if (MusicHandler.player.state.status != AudioPlayerStatus.Playing) MusicHandler.play();
  });
});

const connect = (voiceChannel: VoiceChannel) => {
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  connection.subscribe(MusicHandler.player);
}

/* audioPlayer.play(createAudioResource("/home/me/git/personal/beusware/bartender/assets/voice/musik1.mp3")); */
