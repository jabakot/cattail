const fetch = require("node-fetch");

const job = url => async () => fetch(url).then();

const toMs = mins => mins * 60000;

let stopJob = undefined;

const register = config => {
  const { secret, source, topinambur } = config;
  fetch(`${topinambur}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      source
    })
  }).then();
};

const start = config => {
  register(config);
  stopJob = setInterval(job(config.topinambur), toMs(3));
};

const stop = () => clearInterval(stopJob);

module.exports = {
  start,
  stop
};
