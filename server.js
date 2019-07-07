const server = require("fastify")({ logger: false });

const init = config => {
  const page = (() =>
    `
    <h2>I'm a cattail - roller bot</h2>
      "<a href='https://discordapp.com/oauth2/authorize?client_id=${
        config.client
      }&scope=bot&permissions=264256'>Invite me</a>"
      <br>
      `)();

  server.get("/", (req, res) =>
    res.type("text/html; charset=utf-8").send(page)
  );
};

const start = config => {
  init(config);
  server.listen(config.port, "0.0.0.0", (err, addr) => {
    if (err) throw err;
    console.log("Server is on", config.port)
  });
};

module.exports = {
  start
};
