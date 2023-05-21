const axios = require('axios')
exports.run = {
   usage: ['fetch'],
   hidden: ['get'],
   use: 'link',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
}) => {
   try {
      if (/get|fetch/i.test(command)) {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'Send valid link'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const fetch = await axios.get(args[0], {
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Referer": args[0],
               "Referrer-Policy": "strict-origin-when-cross-origin",
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
         })
         const size = fetch.headers['content-length'] ? Func.formatSize(fetch.headers['content-length']) : '1 KB'
         const chSize = Func.sizeLimit(size, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `💀 File size (${size}) exceeds the maximum limit, we can't download the file.`, m)
         if (/json/i.test(fetch.headers['content-type'])) return m.reply(Func.jsonFormat(fetch.data))
         if (/text/i.test(fetch.headers['content-type'])) return m.reply(fetch.data)
         client.sendFile(m.chat, args[0], '', '', m)
      }
   } catch (e) {
      console.log(e)
      return client.reply(m.chat, e.message, m)
   }
},
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
