if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const get = () => {
  const { client, token, topinambur, secret, source } = process.env;
  return {
    client,
    port: process.env.$PORT || process.env.PORT || 8080,
    secret,
    source,
    token,
    topinambur
  };
};

module.exports = {
  get
};
