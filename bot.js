const disco = require("discord.js");
const emo = require("node-emoji");
let currentClient;

const roll = max => (max > 0 ? Math.round(Math.random() * (max - 1)) + 1 : 0);

const rollBlock = () => {
  const rolls = Array(4)
    .fill(null)
    .map(v => roll(6));

  const min = Math.min.apply(null, rolls);
  return { rolls, min };
};

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

const dRoll = tail => {
  const rollsAndDice = tail.split("d").filter(v => v && v !== "");
  if (rollsAndDice.length === 2) {
    const [rolls, d] = [Number(rollsAndDice[0]), Number(rollsAndDice[1])];
    if (rolls === 1) {
      return roll(d);
    } else if (rolls > 1) {
      const result = Array(rolls)
        .fill(null)
        .map(v => roll(d));
      const sum = result.reduce((acc, v) => acc + v, 0);
      return `${sum} = ${result.join(" + ")}`;
    }
  } else if (rollsAndDice.length === 1) {
    return roll(rollsAndDice[0]);
  }
  return "Invalid roll command. Check /roll help";
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
  client.login(config.token);
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
