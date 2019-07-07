const e = require("./echo");
const s = require("./server");
const c = require("./config");
const b = require("./bot");

const config = c.get();

const errors = Object.entries(config).filter(v => v[1] === undefined);

if (errors.length > 0) {
  console.log('Errors ->\t', errors.map(v => v[0]).join(', '));
  throw new Error(`Configure env VARS`);
}

[e, s, b].forEach(v => v.start(config));
