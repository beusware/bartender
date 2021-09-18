import { Message, MessageEmbed } from "discord.js";

import { Command } from "../helper/commandClass";

export const ping = new Command("help", (message: Message) => {
  const embed = new MessageEmbed()
      .setColor(0x2ECC71)
      .setTitle("Hilfe")
      .setDescription("Das sind meine Befehle. Einige haben ja vielleicht Aliasse. :wink:")
      .addField("Musik", "`play`, `skip`, `stop`, `loop`")
      .addField("Anderes", "`ping`")

  message.reply({
    embeds: [ embed ],
  });
});
