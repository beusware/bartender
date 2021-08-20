export class Command {
  name: string;
  command: Function;

  constructor(name: string, command: Function) {
    this.name = name;
    this.command = command;
  }
}

