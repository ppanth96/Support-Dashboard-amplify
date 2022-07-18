const config = require("./config");
const axios = require("axios");

async function planEnterprise() {
  try {
    return new Promise((resolve, reject) => {
      var url =
        "https://d1support.zendesk.com/api/v2/search/count.json?query=type:ticket status:open type:group group_id:20032183 group_id:128337 tags:plan_enterprise assignee:none";
      axios
        .get(url, config.configuration)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(JSON.stringify(response.data.count));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}

async function planMidmarket() {
  try {
    return new Promise((resolve, reject) => {
      var url =
        "https://d1support.zendesk.com/api/v2/search/count.json?query=type:ticket status<pending type:group group_id:20032183 group_id:128337 tags:plan_mid_market assignee:none";
      axios
        .get(url, config.configuration)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(JSON.stringify(response.data.count));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}

async function firstResponse() {
  try {
    return new Promise((resolve, reject) => {
      var url =
        "https://d1support.zendesk.com/api/v2/search/count.json?query=type:ticket status<pending group_id:128337 group_id:360008758873 group_id:20032183 group_id:360008788134 assignee:none";
      axios
        .get(url, config.configuration)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(response.data.count);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}
async function vmsActivity() {
  try {
    return new Promise((resolve, reject) => {
      var url =
        "https://d1support.zendesk.com/api/v2/channels/voice/stats/current_queue_activity";
      axios
        .get(url, config.configuration)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(response.data.current_queue_activity);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}
async function openVms() {
  try {
    return new Promise((resolve, reject) => {
      var url =
        "https://d1support.zendesk.com/api/v2/search.json?query=type:ticket status<pending type:group group_id:360008758873 assignee:none";
      axios
        .get(url, config.configuration)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(response.data.count);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}

async function onAgents() {
  try {
    return new Promise((resolve , reject) => {
      var url =
        "https://rtm.zopim.com/stream/agents";
      axios
        .get(url, config.chatconfiguration)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(response.data.content.data.agents_online);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}

async function incomingChats() {
  try {
    return new Promise((resolve, reject) => {
      var url =
        "https://rtm.zopim.com/stream/chats";
      axios
        .get(url, config.chatconfiguration)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(response.data.content.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}

async function dudaStatus() {
  try {
    return new Promise((resolve , reject) => {
      var url =
        "https://status.duda.co/api/v2/status.json";
      axios
        .get(url)
        .then(function (response) {
          resolve(response.data.status.description);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}

async function ecwidStatus() {
  try {
    return new Promise((resolve , reject) => {
      var url =
        "https://status.ecwid.com/api/v2/status.json";
      axios
        .get(url)
        .then(function (response) {
          resolve(response.data.status.description);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (e) {
    console.warn(e);
  }
}


module.exports = {
  planEnterprise,
  planMidmarket,
  firstResponse,
  vmsActivity,
  openVms,
  onAgents,
  incomingChats,
  dudaStatus,
  ecwidStatus
};
