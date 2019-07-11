const Telegraf = require("telegraf");
const emo = require("node-emoji");
const { dRoll, rollBlock } = require("./roll");

const rollStats = () => {
  const explanations = [];
  const stats = [];
  for (let i = 0; i < 6; i++) {
    const block = rollBlock();
    const sum = block.rolls.reduce((a, v) => a + v, 0);
    const stat = sum - block.min;
    stats.push(stat);
    explanations.push(
      `Why ${stat}: ${block.rolls.join(" + ")} - ${
        block.min
      } (minumum) roll =  ${stat} `
    );
  }
  return `Your stats:\t <b>${stats.join(", ")}</b>\nSorted:\t<b>${stats
    .sort((a, b) => a - b)
    .join(", ")}</b>\n<i>Explanations:</i>\n${explanations.join(
    "\n"
  )}\nCattail with \t ${emo.get("heart")}`;
};

const rollHelp = () => {
  return `<b>/roll dY</b>, rolls die of Y, for example /roll d6\n<b>/roll XdY</b>, rolls X dice of Y, for example /roll 4d\n<b>/roll stats</b>, rolls dice for stats\n<b>/roll help</b>, show helps\n<i>Cattail with</i> ${emo.get(
    "heart"
  )}`;
};

const rollMessage = (text, reply, replyWithHTML) => {
  const tail = text.replace("/roll", "").trim();
  if (tail === "help") {
    replyWithHTML(rollHelp());
    return;
  } else if (tail === "stats") {
    replyWithHTML(rollStats());
    return;
  } else if (tail.includes("d")) {
    reply(dRoll(tail));
    return;
  }
};

const start = config => {
  const bot = new Telegraf(config.telegram);

  bot.command("roll", ctx => {
    const {
      reply,
      replyWithHTML,
      chat: { username },
      message: { text }
    } = ctx;

    const _r = msg => reply(`@${username}, ${msg}`);
    rollMessage(text, _r, replyWithHTML);
  });

  bot.help(ctx => ctx.replyWithHTML(rollHelp()));

  bot.launch();
};

module.exports = {
  start
};
