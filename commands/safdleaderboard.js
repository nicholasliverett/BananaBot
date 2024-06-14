const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('safdleaderboard')
        .setDMPermission(false)
		.setDescription('Replies with auto-updating SAFD leaderboard'),
	async execute(message) {
        await message.deferReply();
        const mysql = require('mysql');
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
        const queryresult = () => {
            return new Promise((resolve, reject)=>{
                db.query("SELECT discord_id, SEC_TO_TIME(ROUND(sum(TIME_TO_SEC(total_time)))) AS total_total_time, RANK() OVER (ORDER BY SEC_TO_TIME(ROUND(sum(TIME_TO_SEC(total_time)))) DESC) AS rank_total FROM safdhours GROUP BY discord_id ORDER BY rank_total limit 10", (err, result) => {
                if (err) throw err;
                return resolve(result);
            });
        });
        };
        const qresult = await queryresult();
		const botpanelembed = new EmbedBuilder()
            .setColor(`#ED4245`)
            .setTitle(`SAFD Leaderboard: <t:${Math.floor(Date.now()/1000)}:d> at <t:${Math.floor(Date.now()/1000)}:T>`)
        var userNames = ''
        var userHours = ''
        for (let i = 0; i < qresult.length; i++) {
            userNames += `\`${i+1}\` <@${qresult[i].discord_id}>\n`
            userHours += `\`${qresult[i].total_total_time}\`\n`
        };
        botpanelembed.setFields(
            {name: `Top 10`, value: userNames, inline: true},
            {name: `Total Hours`, value: userHours, inline: true},
            )
        db.end()
        await message.followUp({embeds: [botpanelembed]}).then(message => {
                setInterval(async () => {
                    const mysql = require('mysql');
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
                    const queryresult = () => {
                        return new Promise((resolve, reject)=>{
                            db.query("SELECT discord_id, SEC_TO_TIME(ROUND(sum(TIME_TO_SEC(total_time)))) AS total_total_time, RANK() OVER (ORDER BY SEC_TO_TIME(ROUND(sum(TIME_TO_SEC(total_time)))) DESC) AS rank_total FROM safdhours GROUP BY discord_id ORDER BY rank_total limit 10", (err, result) => {
                            if (err) throw err;
                            return resolve(result);
                        });
                    });
                    };
                    const qresult = await queryresult();
                    const botpanelembed = new EmbedBuilder()
                        .setColor(`#ED4245`)
                        .setTitle(`SAFD Leaderboard: <t:${Math.floor(Date.now()/1000)}:d> at <t:${Math.floor(Date.now()/1000)}:T>`)
                    var userNames = ''
                    var userHours = ''
                    for (let i = 0; i < qresult.length; i++) {
                        userNames += `\`${i+1}\` <@${qresult[i].discord_id}>\n`
                        userHours += `\`${qresult[i].total_total_time.floor()}\`\n`
                    };
                    botpanelembed.setFields(
                        {name: `Top 10`, value: userNames, inline: true},
                        {name: `Total Hours`, value: userHours, inline: true},
                        )
                    message.edit({embeds: [botpanelembed]});
                    db.end();
                }, 60000);

            });
	},
};