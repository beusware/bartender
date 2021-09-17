import { Message } from "discord.js";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const skip = new Command("skip", (_: Message) => {
  MusicHandler.skip();
});
