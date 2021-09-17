import { Message } from "discord.js";

import { Command } from "../helper/commandClass";

export const ping = new Command("help", (message: Message) => {
  message.reply("no help");
});
