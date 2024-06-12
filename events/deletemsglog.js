const { Events, EmbedBuilder } = require('discord.js');
const mysql = require('mysql');

module.exports = {
    name: Events.MessageDelete,
    async execute (message) {

        const db = mysql.createConnection({
            host: '192.168.1.5',
            user: 'pi',
            password: 'Gamingpassword7',
            database: 'masterhours',
            connectTimeout: 60000
        });
        db.connect(function(err) {
            if (err) throw err;
        });

        if (!message.guild || !message.author || message.author.bot || !message) return;

        var data = () => {
            return new Promise((resolve, reject)=>{
                db.query(`SELECT * from deletemsglog where guild='${message.guild.id}'`, (err, result) => {
                if (err) throw err;
                return resolve(result);
            });
        });
        };
		data = await data();
        if (!data) return;

        var sendChannel = await message.guild.channels.fetch(data[0].channel);
        var attachments = await message.attachments.map(attachment => attachment.url);
        var member = message.author;
        var deleteTime = `<t:${Math.floor(Date.now() / 1000)}:R>`;

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`⚠️ Deleted Message`)
        .setDescription(`Message deleted at ${deleteTime}`)
        .addFields({ name: "Message Content", value: `> ${message.content || "No message content"}`})
        .addFields({ name: "Message Author", value: `> \`${member.username}\` (${member.id})`})
        .addFields({ name: "Message Channel", value: `> ${message.channel} (${message.channel.id})`})
        .setFooter({ text: "Message Deleted Log System"})
        .setTimestamp();

        if (attachments.length > 0) {
            embed.addFields({ name: "Message Attachments", value: attachments.join(' , ')});
        }

        await sendChannel.send({ embeds: [embed] });


    }
}