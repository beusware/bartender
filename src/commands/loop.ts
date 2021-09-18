import { Message } from "discord.js";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const loop = new Command("loop", (_: Message) => {
  MusicHandler.loop();
});
