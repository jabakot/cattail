const disco = require("discord.js");
const emo = require("node-emoji");
const { dRoll, rollBlock } = require("./roll");

let currentClient;

const rollStats = () => {
  const embeded = new disco.RichEmbed().setColor("RANDOM");
  const stats = [];
  for (let i = 0; i < 6; i++) {
    const block = rollBlock();
    const sum = block.rolls.reduce((a, v) => a + v, 0);
    const stat = sum - block.min;
    stats.push(stat);
    embeded.addField(
      `Why ${stat}`,
      `${block.rolls.join(" + ")} - ${block.min} (minumum) roll =  ${stat} `
    );
  }
  embeded.setTitle(`Your stats ->>\t${stats.join(", ")}`);
  embeded.addField(
    `Sorted stats`,
    `\t${stats.sort((a, b) => a - b).join(", ")}`
  );
  embeded.setFooter(`Cattail with \t ${emo.get("heart")}`);
  return embeded;
};

const rollHelp = () => {
  return new disco.RichEmbed()
    .setTitle("Cattail help")
    .addField("/roll dY", "rolls die of Y, for example /roll d6")
    .addField("/roll XdY", "rolls X dice of Y, for example /roll 4d6")
    .addField("/roll stats", "rolls dice for stats")
    .addField("/roll help", "show helps")
    .setFooter(`Cattail with \t ${emo.get("heart")}`);
};

const rollMessage = msg => {
  const content = msg.content;
  if (content.startsWith("/roll")) {
    const tail = content.replace("/roll", "").trim();
    if (tail === "help") {
      msg.reply(rollHelp());
      return;
    } else if (tail === "stats") {
      msg.reply(rollStats());
      return;
    } else if (tail.includes("d")) {
      msg.reply(dRoll(tail));
      return;
    }
    msg.reply("Invalid roll command. Check /roll help");
  }
};

const setup = client => {
  client.on("ready", () => {
    client.user.setActivity("/roll help");
  });
  client.on("message", msg => {
    rollMessage(msg);
  });
};

const start = config => {
  const client = new disco.Client();
  setup(client, config);
  client.login(config.discord);
  currentClient = client;
};

const stop = () => {
  currentClient.destroy();
  currentClient = undefined;
};

module.exports = {
  start,
  stop
};
