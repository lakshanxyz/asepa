const fetch = require('node-fetch');

exports.run = {
  usage: ["periodic"],
  hidden: ["atom"],
  use: "word",
  category: "utilities",
  async: async (m, { client, text, isPrefix, command }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'sadium'), m)
      client.sendReact(m.chat, "🕒", m.key);
      const response = await fetch(`https://api.popcat.xyz/periodic-table?element=${text}`);
      const json = await response.json();
      if (!json.result) return m.reply(Func.jsonFormat(json));
      await m.reply(json.result);
    } catch (e) {
      console.log(e);
      return client.reply(m.chat, global.status.error, m);
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename,
};