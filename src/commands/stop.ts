import { Message } from "discord.js";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const stop = new Command("stop", (_: Message) => {
  MusicHandler.stop();
});
