import { Client, Intents, Message } from "discord.js";

import { CommandHandler } from "./helper/commandHandler";

require("dotenv").config();

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commandHandler: CommandHandler = new CommandHandler();

client.once("ready", async () => {
  console.log(`Client online as ${client.user.tag} on ${client.guilds.cache.map((guild) => guild.name)}! Loaded ${commandHandler.collection.entries.length} commands!`);
});

client.on("messageCreate", async (message: Message) => {
  if (message.content[0] != process.env.PREFIX) return;
  if (message.author.bot) return;

  let command: string = message.content.substr(1, message.content.length - 1).trim().toLowerCase().split(" ")[0];

  console.log(commandHandler.collection.entries);

  if (commandHandler.collection.get(command)) commandHandler.collection.get(command).call(message);
});

client.login();
