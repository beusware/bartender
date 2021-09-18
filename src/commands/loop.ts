import { Message } from "discord.js";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const loop = new Command("loop", (message: Message) => {
  MusicHandler.loop();

  if (MusicHandler.looping) {
    message.reply(":repeat: Jawohl! Wiederhole das derzeitige Lied!");
  } else {
    message.reply(":arrow_right: Jawohl! Wiederhole nicht mehr!");
  }
});
