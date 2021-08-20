import { Collection } from "discord.js";

export class CommandHandler {
  collection: Collection<string, Function>;

  private _add = async (string: string): Promise<void> => {
    let command: any = import(string);

    this.collection.set(command.name, command.command);
  }

  constructor() {
    this.collection = new Collection();

    this._add("../commands/ping");
  }
}
