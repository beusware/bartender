import { Collection } from "discord.js";
import * as fs from "fs";

import "../commands/help";
import "../commands/ping";

export const getCommandCollection = async (): Promise<Collection<string, Function>> => {
  let collection: Collection<string, Function> = new Collection();

  for (let file of fs.readdirSync("src/commands/")) {
    let command: any = await import(`../commands/${file.substring(0, file.lastIndexOf("."))}`);
    command = command[Object.keys(command)[1]];

    collection.set(command.name, command.command);
  }

  return collection;
}