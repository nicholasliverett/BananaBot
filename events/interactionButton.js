const { previousSaturday } = require('date-fns');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isButton()) {
            const mysql = require('mysql');
            const db = mysql.createConnection({
                host: '192.168.1.44',
                user: 'pi',
                password: 'Gamingpassword7',
                database: 'masterhours',
                connectTimeout: 60000
            });
            db.connect(function(err) {
                if (err) throw err;
            });
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
                    .setLabel("Clock In Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 1:00')
                    .setRequired(true);

                const lspdclockoutinput = new TextInputBuilder()
                    .setCustomId('lspdclockoutinput')
                    .setLabel("Clock Out Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 17:59')
                    .setRequired(true);

                const lspdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('lspdpatroltypeinput')
                    .setLabel("Patrol Type: ______ Patrol")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setPlaceholder('Normal, Ride-Along, Evaluation, Subdivision, Certification, Field Training, Administrative')
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
                    .setLabel("Clock In Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 1:00')
                    .setRequired(true);

                const safdclockoutinput = new TextInputBuilder()
                    .setCustomId('safdclockoutinput')
                    .setLabel("Clock Out Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 17:59')
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
            } else if (interaction.customId === 'bcsoform') {
                const bcsomodal = new ModalBuilder()
                    .setCustomId('bcsomodal')
                    .setTitle('BCSO Clockin Modal');

                const bcsoemailinput = new TextInputBuilder()
                    .setCustomId('bcsoemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const bcsorankinput = new TextInputBuilder()
                    .setCustomId('bcsorankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Master Sergeant')
                    .setRequired(true);

                const bcsoclockininput = new TextInputBuilder()
                    .setCustomId('bcsoclockininput')
                    .setLabel("Clock In Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 1:00')
                    .setRequired(true);

                const bcsoclockoutinput = new TextInputBuilder()
                    .setCustomId('bcsoclockoutinput')
                    .setLabel("Clock Out Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 17:59')
                    .setRequired(true);

                const bcsopatroltypeinput = new TextInputBuilder()
                    .setCustomId('bcsopatroltypeinput')
                    .setLabel("Patrol Type: ______ Patrol")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setPlaceholder('Normal, Ride-Along, Evaluation, Subdivision, Certification, Field Training, Administrative')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(bcsoemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(bcsorankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(bcsoclockininput);
                const fourthActionRow = new ActionRowBuilder().addComponents(bcsoclockoutinput);
                const fifthActionRow = new ActionRowBuilder().addComponents(bcsopatroltypeinput);

                bcsomodal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

                await interaction.showModal(bcsomodal);
            } else if (interaction.customId === 'acdform') {
                const acdmodal = new ModalBuilder()
                    .setCustomId('acdmodal')
                    .setTitle('BCSO Clockin Modal');

                const acdemailinput = new TextInputBuilder()
                    .setCustomId('acdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const acdrankinput = new TextInputBuilder()
                    .setCustomId('acdrankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Senior Operator')
                    .setRequired(true);

                const acdclockininput = new TextInputBuilder()
                    .setCustomId('acdclockininput')
                    .setLabel("Clock In Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 1:00')
                    .setRequired(true);

                const acdclockoutinput = new TextInputBuilder()
                    .setCustomId('acdclockoutinput')
                    .setLabel("Clock Out Time: XX:XX")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time: 17:59')
                    .setRequired(true);

                const acdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('acdpatroltypeinput')
                    .setLabel("Type of Patrol: ")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Air-1, Marine-1, Training')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(acdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(acdrankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(acdclockininput);
                const fourthActionRow = new ActionRowBuilder().addComponents(acdclockoutinput);
                const fifthActionRow = new ActionRowBuilder().addComponents(acdpatroltypeinput);

                acdmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

                await interaction.showModal(acdmodal);
            } else if (interaction.customId === 'lspdclockin') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM lspdhours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] != undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock out in order to clock in.')
                        .setColor('#5865F2')
                    await interaction.reply({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
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
                var sql = `INSERT INTO lspdhours (discord_id, date, clockin) VALUES ('${interaction.user.id}', '${today}', '${clockin}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const previousembed = interaction.message.embeds[0];
                if (previousembed.fields[0] == undefined) {
                    const lspdqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [lspdqclockinembed]})
                    return;    
                } else {
                    const lspdqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: previousembed.fields[0].value + `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: previousembed.fields[1].value + `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [lspdqclockinembed]})
                    return;
                }
            } else if (interaction.customId === 'lspdclockout') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM lspdhours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] == undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock in in order to clock out.')
                        .setColor('#5865F2')
                    await interaction.reply({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
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
                    .setLabel("Patrol Type: ______ Patrol")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setPlaceholder('Normal, Ride-Along, Evaluation, Subdivision, Certification, Field Training, Administrative')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(lspdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(lspdrankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(lspdpatroltypeinput);

                lspdqmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

                await interaction.showModal(lspdqmodal);
            } else if (interaction.customId === 'safdclockin') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM safdhours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();;
                if (await qresult[0] != undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock out in order to clock in.')
                        .setColor('#ED4245')
                    await interaction.reply({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
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

                
                var sql = `INSERT INTO safdhours (discord_id, date, clockin) VALUES ('${interaction.user.id}', '${today}', '${clockin}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const previousembed = interaction.message.embeds[0];
                if (previousembed.fields[0] == undefined) {
                    const safdqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [safdqclockinembed]})
                    return;    
                } else {
                    const safdqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: previousembed.fields[0].value + `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: previousembed.fields[1].value + `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [safdqclockinembed]})
                    return;
                }
            } else if (interaction.customId === 'safdclockout') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM safdhours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] == undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock in in order to clock out.')
                        .setColor('#ED4245')
                    await interaction.followUp({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
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

            } else if (interaction.customId === 'bcsoclockin') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM bcsohours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] != undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock out in order to clock in.')
                        .setColor('#5865F2')
                    await interaction.reply({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
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
                var sql = `INSERT INTO bcsohours (discord_id, date, clockin) VALUES ('${interaction.user.id}', '${today}', '${clockin}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const previousembed = interaction.message.embeds[0];
                if (previousembed.fields[0] == undefined) {
                    const bcsoqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [bcsoqclockinembed]})
                    return;    
                } else {
                    const bcsoqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: previousembed.fields[0].value + `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: previousembed.fields[1].value + `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [bcsoqclockinembed]})
                    return;
                }
            } else if (interaction.customId === 'bcsoclockout') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM bcsohours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] == undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock in in order to clock out.')
                        .setColor('#5865F2')
                    await interaction.reply({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
                const bcsoqmodal = new ModalBuilder()
                    .setCustomId('bcsoqmodal')
                    .setTitle('BCSO Quick Clockin Modal');

                const bcsoemailinput = new TextInputBuilder()
                    .setCustomId('bcsoemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const bcsorankinput = new TextInputBuilder()
                    .setCustomId('bcsorankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Master Sergeant')
                    .setRequired(true);

                const bcsopatroltypeinput = new TextInputBuilder()
                    .setCustomId('bcsopatroltypeinput')
                    .setLabel("Patrol Type: ______ Patrol")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setPlaceholder('Normal, Ride-Along, Evaluation, Subdivision, Certification, Field Training, Administrative')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(bcsoemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(bcsorankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(bcsopatroltypeinput);

                bcsoqmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

                await interaction.showModal(bcsoqmodal);
            } else if (interaction.customId === 'acdclockin') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM acdhours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] != undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock out in order to clock in.')
                        .setColor('#4e5058')
                    await interaction.reply({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
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
                var sql = `INSERT INTO acdhours (discord_id, date, clockin) VALUES ('${interaction.user.id}', '${today}', '${clockin}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const previousembed = interaction.message.embeds[0];
                if (previousembed.fields[0] == undefined) {
                    const acdqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [acdqclockinembed]})
                    return;    
                } else {
                    const acdqclockinembed = EmbedBuilder.from(previousembed)
                        .setFields(
                            {name: 'Active Users', value: previousembed.fields[0].value + `<@${interaction.user.id}>\n`, inline: true},
                            {name: 'Clock In', value: previousembed.fields[1].value + `<t:${Math.floor(Date.now()/1000)}:t>\n`, inline: true}
                            )
                    await interaction.update({embeds: [acdqclockinembed]})
                    return;
                }
            } else if (interaction.customId === 'acdclockout') {
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query(`SELECT * FROM acdhours WHERE clockout IS NULL AND discord_id='${interaction.user.id}';`, (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                const qresult = await queryresult();
                if (await qresult[0] == undefined) {
                    const noclockinembed = new EmbedBuilder()
                        .setTitle('You need to clock in in order to clock out.')
                        .setColor('#4e5058')
                    await interaction.reply({embeds: [noclockinembed], ephemeral: true });
                    return;
                };
                const acdqmodal = new ModalBuilder()
                    .setCustomId('acdqmodal')
                    .setTitle('ACD Quick Clockin Modal');

                const acdemailinput = new TextInputBuilder()
                    .setCustomId('acdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const acdrankinput = new TextInputBuilder()
                    .setCustomId('acdrankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Senior Operator')
                    .setRequired(true);

                const acdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('acdpatroltypeinput')
                    .setLabel("Patrol Type: ______ Patrol")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setPlaceholder('Normal, Ride-Along, Evaluation, Subdivision, Certification, Field Training, Administrative')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(acdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(acdrankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(acdpatroltypeinput);

                acdqmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

                await interaction.showModal(acdqmodal);
            }
        }
    }
    
};