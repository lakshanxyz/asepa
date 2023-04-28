exports.run = {
   usage: ["ai"],
   hidden: ["openai"],
   use: "word",
   category: "downloader",
  async: async (m, { client, args, isPrefix, command }) => {
    try {
      if (!args || !args[0])
        return client.reply(m.chat, Func.example(isPrefix, command, "hai"), m);
      client.sendReact(m.chat, "🕒", m.key);
      let old = new Date();
      let commandos = args[0]
      let json = await (await require('axios').get('https://botcahx.cyclic.app/openai?logic=' + commandos + '&prompt=en')).data
      if (!json.result) return m.reply(json)
      await m.reply(json.hasil);
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