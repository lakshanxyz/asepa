exports.run = {
  usage: ["korea"],
  hidden: ["korea"],
  use: "word",
  category: "cecan",
  async: async (m, { client, args, isPrefix, command, participants }) => {
    try {
      client.sendReact(m.chat, "🕒", m.key);
      let old = new Date();
      let json = await Func.fetchBuffer(`https://restapi.zeynnnn.repl.co/api/cecan/korea?apikey=zeyn`)
      client.sendFile(m.chat, json, '', `🍟 Fetching : ${((new Date - old) * 1)} ms`, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}