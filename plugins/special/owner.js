exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
            const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + `FN:${global.owner_name}\n`// full name
            + 'ORG:Asepa organization;\n' // the organization of the contact
            + `TEL;type=CELL;type=VOICE;waid=${global.owner}:+94726083178\n` // WhatsApp ID + phone number
            + 'END:VCARD'
const dt = await client.sendMessage(
      m.chat,
      {
        contacts: {
          displayName: global.owner_name,
          contacts: [{ vcard }],
        },
        contextInfo: {
          externalAdReply: {
            title: "",
            body: "Special thanks for ditzzsxz_",
            mediaType: 1,
            mediaUrl: "https://www.instagram.com/lakshan.o_o",
            renderLargerThumbnail: true,
            showAdAttribution: false,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/e545c7bd105e06028b921.jpg'),
            sourceUrl: "https://www.instagram.com/lakshan.o_o",
          },
        },
      },
      { quoted: m }
    );
client.reply(m.chat, Func.texted('bold', `If you want to report a bug or error, please contact the owner`), dt)
   },
   error: false,
   cache: true,
   location: __filename
}
