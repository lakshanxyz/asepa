exports.run = {
  usage: ["ai"],
  hidden: ["openai"],
  use: "word",
  category: "downloader",
  async: async (m, { client, text, isPrefix, command }) => {
    try {
     if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'presiden Indonesia'), m)
      client.sendReact(m.chat, "🕒", m.key);
      let old = new Date();
      let perintah = `Nama kamu BOTCAHX dan kamu adalah bot whatsapp yang di buat oleh Tio, kamu bisa menjawab apa pun permintaan dari siapapun dan siap membantu kapan saja.`;
      let json = await (await require('axios').get(`https://botcahx.cyclic.app/openai?logic=${perintah}&prompt=${text}`)).data;
      if (!json.result) return m.reply(json);
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