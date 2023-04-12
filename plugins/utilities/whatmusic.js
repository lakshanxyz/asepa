const fetch = require("node-fetch");
exports.run = {
   usage: ['whatmusic'],
   hidden: ['judulmusic'],
   use: 'Reply Audio/Video',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command
   }) => {
      try {
      const acrcloud = require('acrcloud');
let acr = new acrcloud({
	host: 'identify-ap-southeast-1.acrcloud.com',
	access_key: 'b1cc283b4fb72483ebb6ea9c53512331',
	access_secret: 'xyqJGTZRTrUotaraHEjji00WBClx7RpWozywdANq'
});
let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || '';
let buffer = await q.download()
if (!mime) return client.reply(m.chat, Func.texted('bold', `Reply audio/video!`), m)
if (/video|audio/.test(mime)) {
		client.sendReact(m.chat, '🕒', m.key)
		let { status, metadata } = await acr.identify(buffer)
		if (status.code !== 0) throw status.msg 
		let { title, artists, album, genres, release_date } = metadata.music[0]
let txt = `⦿  *Music Found*\n\n`
		txt += `◦  *Title* : ${title}${artists ? `\n◦  *Artists* : ${artists.map(v => v.name).join(', ')}` : ''}`
		txt += `${album ? `\n◦  *Album* : ${album.name}` : ''}${genres ? `\n◦  *Genres* : ${genres.map(v => v.name).join(', ')}` : ''}\n`
		txt += `◦  *Release Date* : ${release_date}\n\n${global.footer}`

    client.reply(m.chat, txt.trim(), m)
} else {
            client.reply(m.chat, Func.texted('bold', `Only for audio/video.`), m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
}
