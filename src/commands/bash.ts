import { Message, MessageAttachment } from "discord.js";
import { exec } from "child_process";
import * as os from "os";

import { Command } from "../helper/commandClass";
import { client } from "../app";

export const bash = new Command("bash", (message: Message) => {
  if (os.hostname() === "manjaro") return;
  if (!authorized.includes(message.author.id)) return;

  const args = message.content.toLowerCase().substring(1, message.content.length).split(" ").slice(1);

  client.user.setPresence({ status: "idle" });

  exec(args.join(" "), (error, stdout, _) => {
    let answer = error ? `${error.code}\n${error.message}` : `0\n${stdout}`;

    try {
      sendFile(stdout, message, answer);
    } catch (e) {
      console.log(e);
    } finally {
      client.user.setPresence({ status: "online" });
    }
  });
});

const authorized = ["322769681079336972", "441975703135846401", "500574701652017164"];

const sendFile = (stdout: string, message: Message, code: string) => {
  const buffer = Buffer.alloc(stdout.length);

  buffer.write(stdout, "utf-8");

  const attachment = new MessageAttachment(buffer, `${Date.now()}.log`);

  message.reply({
    files: [ attachment ],
    content: code,
  });
}
