import { Message } from "discord.js";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const skip = new Command("skip", (message: Message) => {
  MusicHandler.skip();
  message.reply(":fast_forward: Jawohl! Das derzeitige Lied wurde Übersprungen!");
});
