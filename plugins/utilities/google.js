const googleIt = require("google-it")
exports.run = {
   usage: ['google', 'goimg'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Apa saja unsur-unsur proposal?'), m)
         client.sendReact(m.chat, '🕒', m.key)
         if (command == 'google') {
let json = await googleIt({ 'query': text })
let caption = `⦿  *G O O G L E - S E A R C H*\n\n`
				for (let i = 0; i < json.length; i++) {
caption += `	◦  *Title* : ${json[i].title}\n`
caption += `	◦  *Desc* : ${json[i].snippet}\n`
caption += `	◦  *Url* : ${json[i].link}\n`
caption +=  `\n════════════════════════════\n\n`
				}
client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/d7b761ea856b5ba7b0713.jpg')
         })
         } else if (command == 'goimg') {
            let json = await Api.google(text, true)
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            for (let i = 0; i < 5; i++) {
               var rand = Math.floor(json.data.length * Math.random())
               let caption = `乂  *G O O G L E - I M A G E*\n\n`
               caption += `	◦ *Title* : ${json.data[i].origin.title}\n`
               caption += `	◦ *Dimensions* : ${json.data[i].width} × ${json.data[i].height}\n\n`
               caption += global.footer
               client.sendFile(m.chat, json.data[rand].url, '', caption, m)
               await Func.delay(2500)
            }
         }
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   restrict: true
}