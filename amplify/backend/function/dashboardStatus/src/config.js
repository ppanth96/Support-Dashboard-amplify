require("dotenv").config();

const configuration = {
  headers: {
    Authorization: process.env.Authorization,
  },
  timeout: 5000,
};

const chatconfiguration = {
  headers: { 
    Authorization: process.env.chatAuth,
  },
  timeout: 5000,
};

module.exports = {
    configuration,
    chatconfiguration
};
