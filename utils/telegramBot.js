const axios = require("axios");
const chatId = process.env.CHAT_ID;
const botToken = process.env.BOT_TOKEN;

module.exports = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${data}&parse_mode=html`)
      .then((res) => {
        if (res.data.ok) {
          resolve(res);
        } else {
          reject(res.data.description);
        }
      })
      .catch((error) => {
        console.log(error);
        reject("Not send message to telegram bot");
      });
  });
};