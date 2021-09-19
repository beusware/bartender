import { EmbedFieldData, Message, MessageEmbed } from "discord.js";
import * as ytdl from "ytdl-core";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

// FIXME: Sometimes some songs are not really added to the queue, even though the bot sais so.
export const queue = new Command("queue", (message: Message) => {
  let fields: Array<EmbedFieldData> = [];
  let totalTime: number = 0;

  for (let songIndex in MusicHandler.queue) {
    const song = MusicHandler.queue[songIndex];

    totalTime = totalTime + parseInt(song.info.videoDetails.lengthSeconds);
    fields.push({ 
      name: `${songIndex == "0" ? ":arrow_forward: " : ""}${song.info.videoDetails.title}`,
      value: `${song.url} - ${getLength(song.info)}`,
    });

    if (songIndex == "25") break;
  }

  const embed = new MessageEmbed()
      .setColor(0x2ECC71)
      .setTitle("Warteliste")
      .setDescription(`Es sind ${MusicHandler.queue.length} Songs auf der Liste.\
        Die Gesamtzeit beträgt ${getLength(totalTime)}.\n\
        Hier sind die nächsten ${MusicHandler.queue.length > 25 ? 25 : MusicHandler.queue.length} Songs:`
      )
      .addFields(fields);

  message.reply({ embeds: [ embed ] });
});

const getLength = (info: ytdl.videoInfo | number) => {
  const time: number = (typeof info == "number") ? info : parseInt(info.videoDetails.lengthSeconds);

  const hours = Math.floor(time / 3600).toString().padStart(2, "0");
  const minutes = Math.floor(time % 3600 / 60).toString().padStart(2, "0");
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");

  return `${hours != "00" ? hours + ":" : "" }${minutes}:${seconds}`;
}