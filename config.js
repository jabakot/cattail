if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const get = () => {
  const {
    client,
    discord,
    telegram,
    topinambur,
    secret,
    source
  } = process.env;
  return {
    client,
    discord,
    port: process.env.$PORT || process.env.PORT || 8080,
    secret,
    source,
    telegram,
    topinambur
  };
};

module.exports = {
  get
};
