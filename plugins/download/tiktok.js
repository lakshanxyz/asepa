exports.run = {
   usage: ['tiktok', 'tikmp3', 'tikwm'],
   hidden: ['tt'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://vm.tiktok.com/ZSR7c5G6y/'), m)
         if (!args[0].match('tiktok.com')) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Api.tiktok(Func.ttFixed(args[0]))
         if (Object.keys(json).length < 1) return client.reply(m.chat, global.status.fail, m)
         let caption = `⦿ *Tiktok - Download*\n\n`
         caption += `	◦  *Sound* : ${json.title_audio}\n`
         caption += `	◦  *Fetching* : ${((new Date - old) * 1)} ms\n\n`
         caption += global.footer
         if (command == 'tiktok' || command == 'tt') return client.sendMessage(m.chat, { video: { url: json.video[0] }, caption: caption }, { quoted: m })
         //client.sendFile(m.chat, json.video[0], '', caption, m)
         if (command == 'tikmp3') return !json.audio ? client.reply(m.chat, global.status.fail, m) : client.sendFile(m.chat, `${json.audio[0]}`, 'audio.mp3', '', m)
          } catch (err) {
         console.log(err)
         return client.reply(m.chat, global.status.fail, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
