import { Message } from "discord.js";

import { Command } from "../helper/commandClass";
import { MusicHandler } from "../helper/musicHandler";

export const stop = new Command("stop", (message: Message) => {
  MusicHandler.stop();
  message.reply(":stop_button: Auf Wiedersehen!");
});
