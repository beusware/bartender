import { Client, Collection, Intents, Message} from "discord.js";

import { getCommandCollection } from "./helper/commandHandler";

require("dotenv").config();

export const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
let commandCollection: Collection<string, Function>;

client.once("ready", async () => {
  commandCollection = await getCommandCollection();
  console.log(`Client online as ${client.user.tag} on ${client.guilds.cache.map((guild) => guild.name)}! Loaded ${commandCollection.size} commands!`);
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;
  if (message.content[0] != process.env.PREFIX) return;

  let command: string = message.content.substr(1, message.content.length - 1).trim().toLowerCase().split(" ")[0];

  if (commandCollection.get(command)) commandCollection.get(command)(message);
});

client.login();
