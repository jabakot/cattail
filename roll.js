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

const roll = max => (max > 0 ? Math.round(Math.random() * (max - 1)) + 1 : 0);

const rollBlock = () => {
  const rolls = Array(4)
    .fill(null)
    .map(v => roll(6));

  const min = Math.min.apply(null, rolls);
  return { rolls, min };
};

module.exports = {
  dRoll,
  roll,
  rollBlock
};
