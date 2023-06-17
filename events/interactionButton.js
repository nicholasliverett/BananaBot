const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

// create connection/mysql database
const mysql = require('mysql');
const db = mysql.createConnection({
	host: '193.168.1.44',
	user: 'root',
	password: 'Gamingpassword7',
    database: 'masterhours'
});
db.connect(function(err) {
    if (err) throw err;
});

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'lspdform') {
                const lspdmodal = new ModalBuilder()
                    .setCustomId('lspdmodal')
                    .setTitle('LSPD Clockin Modal');

                const lspdemailinput = new TextInputBuilder()
                    .setCustomId('lspdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const lspdrankinput = new TextInputBuilder()
                    .setCustomId('lspdrankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Senior Police Officer')
                    .setRequired(true);

                const lspdclockininput = new TextInputBuilder()
                    .setCustomId('lspdclockininput')
                    .setLabel("Clock In Time:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const lspdclockoutinput = new TextInputBuilder()
                    .setCustomId('lspdclockoutinput')
                    .setLabel("Clock Out Time:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const lspdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('lspdpatroltypeinput')
                    .setLabel("Patrol Type:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(lspdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(lspdrankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(lspdclockininput);
                const fourthActionRow = new ActionRowBuilder().addComponents(lspdclockoutinput);
                const fifthActionRow = new ActionRowBuilder().addComponents(lspdpatroltypeinput);

                lspdmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

                await interaction.showModal(lspdmodal);
            } else if (interaction.customId === 'safdform') {
                const safdmodal = new ModalBuilder()
                    .setCustomId('safdmodal')
                    .setTitle('SAFD Clockin Modal');

                const safdemailinput = new TextInputBuilder()
                    .setCustomId('safdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const safdclockininput = new TextInputBuilder()
                    .setCustomId('safdclockininput')
                    .setLabel("Clock In Time:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const safdclockoutinput = new TextInputBuilder()
                    .setCustomId('safdclockoutinput')
                    .setLabel("Clock Out Time:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const safdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('safdnotes')
                    .setLabel("Notes:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input Notes')
                    .setRequired(false);

                const firstActionRow = new ActionRowBuilder().addComponents(safdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(safdclockininput);
                const thirdActionRow = new ActionRowBuilder().addComponents(safdclockoutinput);
                const fourthActionRow = new ActionRowBuilder().addComponents(safdpatroltypeinput);

                safdmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

                await interaction.showModal(safdmodal);
            } else if (interaction.customId === 'ccoform') {
                await interaction.followUp('CCO')
            } else if (interaction.customId === 'lspdclockin') {
                await interaction.deferReply({ephemeral: true})
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT * FROM lspdhours WHERE clockout IS NULL", (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] != undefined) {
                    await interaction.followUp('You must clock out before clocking in!');
                    return;
                };
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usertag = interactionUser.user.tag;
                var todate = new Date();
                var dd = todate.getDate();
                var MM = todate.getMonth()+1;
                var hh = todate.getHours();
                var mm = todate.getMinutes();
                const yyyy = todate.getFullYear();
                if(dd<10) {
                    dd=`0`+dd;
                } 
                if(MM<10) {
                    MM=`0`+MM;
                } 
                const today = yyyy+`-`+MM+`-`+dd;
                if(mm<10) {
                    mm=`0`+mm;
                } 
                if(hh<10) {
                    hh=`0`+hh;
                }
                const clockin = hh+`:`+mm+`:00`;

                
                var sql = `INSERT INTO lspdhours (discord_id, date, clockin) VALUES ('${usertag}', '${today}', '${clockin}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                });
                const lspdqclockinembed = new EmbedBuilder()
                    .setColor('#ebff2b')
                    .setTitle('Received Clock in')
                    .setFooter({ text: 'Work In Progress'})
                    .setTimestamp()
                await interaction.followUp({embeds: [lspdqclockinembed]})
            } else if (interaction.customId === 'lspdclockout') {
                const lspdqmodal = new ModalBuilder()
                    .setCustomId('lspdqmodal')
                    .setTitle('LSPD Quick Clockin Modal');

                const lspdemailinput = new TextInputBuilder()
                    .setCustomId('lspdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const lspdrankinput = new TextInputBuilder()
                    .setCustomId('lspdrankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Senior Police Officer')
                    .setRequired(true);

                const lspdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('lspdpatroltypeinput')
                    .setLabel("Patrol Type:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(lspdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(lspdrankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(lspdpatroltypeinput);

                lspdqmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

                await interaction.showModal(lspdqmodal);
            } else if (interaction.customId === 'safdclockin') {
                await interaction.deferReply({ephemeral: true})
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT * FROM safdhours WHERE clockout IS NULL", (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] != undefined) {
                    await interaction.followUp('You must clock out before clocking in again!');
                    return;
                };
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usertag = interactionUser.user.tag;
                var todate = new Date();
                var dd = todate.getDate();
                var MM = todate.getMonth()+1;
                var hh = todate.getHours();
                var mm = todate.getMinutes();
                const yyyy = todate.getFullYear();
                if(dd<10) {
                    dd=`0`+dd;
                } 
                if(MM<10) {
                    MM=`0`+MM;
                } 
                const today = yyyy+`-`+MM+`-`+dd;
                if(mm<10) {
                    mm=`0`+mm;
                } 
                if(hh<10) {
                    hh=`0`+hh;
                }
                const clockin = hh+`:`+mm+`:00`;

                
                var sql = `INSERT INTO safdhours (discord_id, date, clockin) VALUES ('${usertag}', '${today}', '${clockin}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                });
                const safdqclockinembed = new EmbedBuilder()
                    .setColor('#ebff2b')
                    .setTitle('Received Clock in')
                    .setFooter({ text: 'Work In Progress'})
                    .setTimestamp()
                await interaction.followUp({embeds: [safdqclockinembed]})
            } else if (interaction.customId === 'safdclockout') {
                const safdqmodal = new ModalBuilder()
                    .setCustomId('safdqmodal')
                    .setTitle('SAFD Quick Clockin Modal');

                const safdemailinput = new TextInputBuilder()
                    .setCustomId('safdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const safdnotesinput = new TextInputBuilder()
                    .setCustomId('safdnotesinput')
                    .setLabel("Notes:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input Notes')
                    .setRequired(false);

                const firstActionRow = new ActionRowBuilder().addComponents(safdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(safdnotesinput);

                safdqmodal.addComponents(firstActionRow, secondActionRow);

                await interaction.showModal(safdqmodal);
            }
        }
    }
    
};