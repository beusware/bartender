import { AudioPlayerStatus, joinVoiceChannel } from "@discordjs/voice";
import { Message, VoiceChannel } from "discord.js";
import * as ytdl from "ytdl-core";
import * as ytsr from "ytsr";
import * as ytpl from "ytpl";

import { Song } from "../helper/songClass";
import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const play = new Command("play", async (message: Message) => {
  const voiceChannel = message.member.voice.channel as VoiceChannel;

  if (!voiceChannel) return message.reply("Geh in nen Voice!");

  const song = await getSong(message.content.split(" ").slice(1), message);

  if (MusicHandler.player.state.status == AudioPlayerStatus.Idle) message.channel.send(`:arrow_forward: Spiele \`${song.info.videoDetails.title}\`.`);
  MusicHandler.id = message.guildId;

  connect(voiceChannel);
  if (MusicHandler.player.state.status != AudioPlayerStatus.Playing) MusicHandler.play();
});

const getSong = async (args: Array<string>, message: Message): Promise<Song> => {
  message.reply(`:mag_right: Jawohl! Suche nach \`${args.join(" ")}\``);

  if (args[0] == "ltgtr$") return await handleVideo([ "https://www.youtube.com/watch?v=yE2YeW99_tE" ], message);
  if (args[0] == "hh$") return await handleVideo([ "https://www.youtube.com/watch?v=SGvo_YY3GkE" ], message);

  if (ytdl.validateURL(args[0])) {
    return await handleVideo(args, message);
  } else if (ytpl.validateID(args[0])) {
    return await handleCollection(args, message);
  } else {
    return await handleSearch(args, message);
  }
}

const handleVideo = async (args: Array<string>, message: Message) => {
  const song = new Song(args[0], await ytdl.getInfo(args[0]));

  MusicHandler.queue.push(song);
  message.channel.send(`:arrow_forward: \`${song.info.videoDetails.title}\` wurde auf die Warteliste hinzugefügt.`);

  return song;
}

const handleCollection = async (args: Array<string>, message: Message) => {
  const playlist: ytpl.Result = await ytpl(args[0]);
  let result: Song;

  for (let item of playlist.items) {
    const song = new Song(item.url, await ytdl.getInfo(item.url));

    if (playlist.items.indexOf(item) == 0) result = song;

    MusicHandler.queue.push(song);
  }

  message.channel.send(`:arrow_forward: \`${result.info.videoDetails.title}\` und \`${playlist.items.length}\` weitere wurde auf die Warteliste hinzugefügt.`);

  return result;
}

const handleSearch = async (args: Array<string>, message: Message) => {
  const filters = await ytsr.getFilters(args.join(" "));
  const filter = filters.get("Type").get("Video");
  const search = await ytsr(filter.url, { limit: 1 });
  const songURL = (search.items[0] as ytsr.Video).url;
  const song =  new Song(songURL, await ytdl.getInfo(songURL));

  MusicHandler.queue.push(song);
  message.channel.send(`:arrow_forward: \`${song.info.videoDetails.title}\` wurde auf die Warteliste hinzugefügt.`);

  return song;
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
