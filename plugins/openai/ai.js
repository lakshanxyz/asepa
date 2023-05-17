const fetch = require('node-fetch');

exports.run = {
  usage: ["ai"],
  hidden: ["openai"],
  use: "word",
  category: "downloader",
  async: async (m, { client, text, isPrefix, command }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'presiden Indonesia'), m)
      client.sendReact(m.chat, "🕒", m.key);
      const response = await fetch(`https://sh.xznsenpai.xyz/api/openai?text=${text}`);
      const json = await response.json();
      if (!json.result) return m.reply(json);
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
