const { xnxx, xnxxdl } = require('node-fetch')
exports.run = {
   usage: ['xnxx', 'xnxxdl'],
   hidden: ['xx'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
    try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'Enter valid link!'), m)
         if (!args[0].match('xnxx.com')) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🍒', m.key)
         let old = new Date()
         let json = await fetch(`https://api-fgmods.ddns.net/api/xnxxdl?url=${text}&apikey=BgCbiEyg`)
		  if (Object.keys(json).length < 1) return client.reply(m.chat, global.status.fail, m)
		  let caption = `*Fetching* : ${((new Date - old) * 1)} ms`
		  if (command == 'xnxx' || command == 'xnxx') return client.sendMessage(m.chat, { video: { url: json.video[0] }, caption: caption }, { quoted: m })
         //client.sendFile(m.chat, json.video[0], '', caption, m)
		 }
    },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}