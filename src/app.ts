import { Client, Collection, Intents, Message} from "discord.js";

import { getCommandCollection } from "./helper/commandHandler";

require("dotenv").config();

export const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
let commandCollection: Collection<string, Function>;

client.once("ready", async () => {
  commandCollection = await getCommandCollection();
  client.user.setActivity(`${process.env.PREFIX}help`, { type: "LISTENING" });
  console.log(`Client online as ${client.user.tag} on ${client.guilds.cache.map((guild) => guild.name)}! Loaded ${commandCollection.size} commands!`);
});

// TODO: Add good loging
client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;
  if (message.content[0] != process.env.PREFIX) return;

  console.log(`[ ${new Date().toLocaleString() } ] ${message.author.username} > ${message.content.slice(1).trim()}`);

  let command: string = message.content.slice(1).trim().toLowerCase().split(" ")[0];

  if (commandCollection.get(command)) commandCollection.get(command)(message);
});

client.login();
