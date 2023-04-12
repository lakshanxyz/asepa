exports.run = {
   usage: ['lyric'],
   hidden: ['lirik', 'lyrics'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'bad liar'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.lyric2(text.trim())
         let caption = `⦿  *LIRIK - SEARCH*\n\n`
         caption += `${json.result}\n\n`
         caption += global.footer
         /*client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.result.thumb)
         })*/
         client.reply(m.chat, caption, m)
         
         } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   restrict: true
}
