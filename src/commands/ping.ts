import { Message } from "discord.js";

import { Command } from "../helper/commandClass";

export const ping = new Command("ping", (message: Message) => {
  message.reply("Pong! :ping_pong:");
});
