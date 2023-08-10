const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`)

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isModalSubmit()) {
            await interaction.deferReply({ephemeral: true})
            if (interaction.customId == `lspdmodal`) {
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
                var todate = new Date();
                const emailinput = interaction.fields.getTextInputValue(`lspdemailinput`);
                const rankinput = interaction.fields.getTextInputValue(`lspdrankinput`);
                const clockininput = interaction.fields.getTextInputValue(`lspdclockininput`);
                const clockoutinput = interaction.fields.getTextInputValue(`lspdclockoutinput`);
                const patroltypeinput = interaction.fields.getTextInputValue(`lspdpatroltypeinput`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usertag = interactionUser.user.tag;
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var dd = todate.getDate();
                var mm = todate.getMonth()+1;
                const yyyy = todate.getFullYear();
                if(dd<10) {
                    dd=`0`+dd;
                } 
                if(mm<10) {
                    mm=`0`+mm;
                } 
                const today = yyyy+`-`+mm+`-`+dd;
                var clockinstart = new Date("01/01/2007 " + clockininput + ":00");
                var clockinstop = new Date("01/01/2007 " + clockoutinput + ":00");
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                
                hourDiff = hourDiff - minDiff/60
                var clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var lspdclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSfcc65OmXOdpoe-LMTHxhkqGnxKH3IAEw9dffmZjB-9MBHenQ/viewform?usp=pp_url` +
                `&emailAddress=${emailinput}` +
                `&entry.1503124298=${usernickname.trim().replaceAll(' ', '+')}` +
                `&entry.1563281728=${usercallsigns.filter(s => !s.includes(`FD`))[0]}` +
                `&entry.909843694=${usertag.replaceAll('#', '%23')}` +
                `&entry.650105918=${rankinput.replaceAll(' ', '+')}` +
                `&entry.22974012=${clockininput}` +
                `&entry.289301560=${clockoutinput}` +
                `&entry.1474572841=${clockinDiff}` +
                `&entry.1799406772=${today}` +
                `&entry.386319268=${patroltypeinput.replaceAll(' ', '+')}`)

                var sql = `INSERT INTO lspdhours (discord_id, date, clockin, clockout, total_time) VALUES ('${interaction.user.id}', '${today}', '${clockininput+`:00`}', '${clockoutinput+`:00`}', '${clockinDiff}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });

                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`LSPD Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => !s.includes(`FD`))[0]},
                        {name: `:beginner:  |  __Rank:__`, value: rankinput},
                        {name: `:identification_card:  |  __Discord Username:__`, value: usertag},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:police_car:  |  __Patrol Type:__`, value: patroltypeinput},
                        {name: `:clock1:  |  __Clock In:__`, value: clockininput},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockoutinput},
                        {name: `:hourglass:  |  __Total Time:__`, value: clockinDiff},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(lspdclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
            } else if (interaction.customId == `safdmodal`) {
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
                var todate = new Date();
                const emailinput = interaction.fields.getTextInputValue(`safdemailinput`);
                const clockininput = interaction.fields.getTextInputValue(`safdclockininput`);
                const clockoutinput = interaction.fields.getTextInputValue(`safdclockoutinput`);
                var notes = interaction.fields.getTextInputValue(`safdnotes`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                const usertag = interactionUser.user.tag;
                var dd = todate.getDate();
                var mm = todate.getMonth()+1;
                const yyyy = todate.getFullYear();
                if(dd<10) {
                    dd=`0`+dd;
                } 
                if(mm<10) {
                    mm=`0`+mm;
                } 
                const today = yyyy+`-`+mm+`-`+dd;
                var clockinstart = new Date("01/01/2007 " + clockininput + ":00");
                var clockinstop = new Date("01/01/2007 " + clockoutinput + ":00");
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                
                hourDiff = hourDiff - minDiff/60
                const clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var safdclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSd-G-oCDsHjdZX9l1DYoXl9GN5I7LJ2jTCuRg2KFG-lCxJ_PA/viewform?usp=pp_url` + 
                `&emailAddress=${emailinput}` +
                `&entry.924437591=${usernickname.trim().replaceAll(' ', '+')}` + 
                `&entry.1740414105=${usercallsigns.filter(s => s.includes(`FD`))[0]}` + 
                `&entry.1362587187=${today}` +
                `&entry.522182144=${clockininput}` + 
                `&entry.522100359=${clockoutinput}` + 
                `&entry.2145413509=${clockinDiff}`+ 
                `&entry.333732655=${notes.trim().replaceAll(' ', '+')}`)

                if (notes == '') notes = ' ';

                var sql = `INSERT INTO safdhours (discord_id, date, clockin, clockout, total_time) VALUES ('${interaction.user.id}', '${today}', '${clockininput+`:00`}', '${clockoutinput+`:00`}', '${clockinDiff}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });

                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`SAFD Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => s.includes(`FD`))[0]},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:clock1:  |  __Clock In:__`, value: clockininput},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockoutinput},
                        {name: `:hourglass:  |  __Total Time:__`, value: clockinDiff},
                        {name: `:police_car:  |  __Notes:__`, value: notes},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(safdclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
            } else if (interaction.customId == `acdmodal`) {
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
                var todate = new Date();
                const emailinput = interaction.fields.getTextInputValue(`acdemailinput`);
                const rankinput = interaction.fields.getTextInputValue(`acdrankinput`);
                const clockininput = interaction.fields.getTextInputValue(`acdclockininput`);
                const clockoutinput = interaction.fields.getTextInputValue(`acdclockoutinput`);
                const patroltypeinput = interaction.fields.getTextInputValue(`acdpatroltypeinput`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usertag = interactionUser.user.tag;
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var dd = todate.getDate();
                var mm = todate.getMonth()+1;
                const yyyy = todate.getFullYear();
                if(dd<10) {
                    dd=`0`+dd;
                } 
                if(mm<10) {
                    mm=`0`+mm;
                } 
                const today = yyyy+`-`+mm+`-`+dd;
                var clockinstart = new Date("01/01/2007 " + clockininput + ":00");
                var clockinstop = new Date("01/01/2007 " + clockoutinput + ":00");
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                
                hourDiff = hourDiff - minDiff/60
                var clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var bcsoclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSfcc65OmXOdpoe-LMTHxhkqGnxKH3IAEw9dffmZjB-9MBHenQ/viewform?usp=pp_url` +
                `&emailAddress=${emailinput}` +
                `&entry.1503124298=${usernickname.trim().replaceAll(' ', '+')}` +
                `&entry.1563281728=${usercallsigns.filter(s => !s.includes(`FD`))[0]}` +
                `&entry.909843694=${usertag.replaceAll('#', '%23')}` +
                `&entry.650105918=${rankinput.replaceAll(' ', '+')}` +
                `&entry.22974012=${clockininput}` +
                `&entry.289301560=${clockoutinput}` +
                `&entry.1474572841=${clockinDiff}` +
                `&entry.1799406772=${today}` +
                `&entry.386319268=${patroltypeinput.replaceAll(' ', '+')}`)

                var sql = `INSERT INTO bcsohours (discord_id, date, clockin, clockout, total_time) VALUES ('${interaction.user.id}', '${today}', '${clockininput+`:00`}', '${clockoutinput+`:00`}', '${clockinDiff}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });

                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`BCSO Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => !s.includes(`FD`))[0]},
                        {name: `:beginner:  |  __Rank:__`, value: rankinput},
                        {name: `:identification_card:  |  __Discord Username:__`, value: usertag},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:police_car:  |  __Patrol Type:__`, value: patroltypeinput},
                        {name: `:clock1:  |  __Clock In:__`, value: clockininput},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockoutinput},
                        {name: `:hourglass:  |  __Total Time:__`, value: clockinDiff},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(bcsoclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
            } else if (interaction.customId == `acdmodal`) {
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
                var todate = new Date();
                const emailinput = interaction.fields.getTextInputValue(`acdemailinput`);
                const rankinput = interaction.fields.getTextInputValue(`acdrankinput`);
                const clockininput = interaction.fields.getTextInputValue(`acdclockininput`);
                const clockoutinput = interaction.fields.getTextInputValue(`acdclockoutinput`);
                const patroltypeinput = interaction.fields.getTextInputValue(`acdpatroltypeinput`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usertag = interactionUser.user.tag;
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var dd = todate.getDate();
                var mm = todate.getMonth()+1;
                const yyyy = todate.getFullYear();
                if(dd<10) {
                    dd=`0`+dd;
                } 
                if(mm<10) {
                    mm=`0`+mm;
                } 
                const today = yyyy+`-`+mm+`-`+dd;
                var clockinstart = new Date("01/01/2007 " + clockininput + ":00");
                var clockinstop = new Date("01/01/2007 " + clockoutinput + ":00");
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                
                hourDiff = hourDiff - minDiff/60
                var clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var acdclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSeTGhMNre5Yire4LjygynRw6WnZf_0RGNyLwX4oDi1edJ6-_g/viewform?usp=pp_url` +
                `&emailAddress=${emailinput}` +
                `&entry.1503124298=${usernickname.trim().replaceAll(' ', '+')}` +
                `&entry.1563281728=${usercallsigns.filter(s => !s.includes(`FD`))[0]}` +
                `&entry.909843694=${usertag.replaceAll('#', '%23')}` +
                `&entry.650105918=${rankinput.replaceAll(' ', '+')}` +
                `&entry.22974012=${clockininput}` +
                `&entry.289301560=${clockoutinput}` +
                `&entry.1474572841=${clockinDiff}` +
                `&entry.1799406772=${today}` +
                `&entry.386319268=${patroltypeinput.replaceAll(' ', '+')}`)

                var sql = `INSERT INTO acdhours (discord_id, date, clockin, clockout, total_time) VALUES ('${interaction.user.id}', '${today}', '${clockininput+`:00`}', '${clockoutinput+`:00`}', '${clockinDiff}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });

                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`BCSO Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => !s.includes(`FD`))[0]},
                        {name: `:beginner:  |  __Rank:__`, value: rankinput},
                        {name: `:identification_card:  |  __Discord Username:__`, value: usertag},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:police_car:  |  __Patrol Type:__`, value: patroltypeinput},
                        {name: `:clock1:  |  __Clock In:__`, value: clockininput},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockoutinput},
                        {name: `:hourglass:  |  __Total Time:__`, value: clockinDiff},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(acdclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
            } else if (interaction.customId == 'lspdqmodal') {
                var todate = new Date();
                // create connection/mysql database
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
                const clockout = hh+`:`+mm+`:00`;
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT clockin FROM lspdhours WHERE clockout IS NULL", (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                var dbclockin = await queryresult();
                if (dbclockin[0] === undefined) {
                    await interaction.followUp('You no clock in you buffooon lspd');
                    return;
                };
                var clockinstart = new Date("01/01/2007 " + dbclockin[0].clockin);
                var clockinstop = new Date("01/01/2007 " + clockout);
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                hourDiff = hourDiff - minDiff/60
                const totaltime = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                const sql = `UPDATE lspdhours SET clockout='${clockout}', total_time='${totaltime}' WHERE clockout IS NULL`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const emailinput = interaction.fields.getTextInputValue(`lspdemailinput`);
                const rankinput = interaction.fields.getTextInputValue(`lspdrankinput`);
                const patroltypeinput = interaction.fields.getTextInputValue(`lspdpatroltypeinput`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usertag = interactionUser.user.tag;
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var lspdclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSfcc65OmXOdpoe-LMTHxhkqGnxKH3IAEw9dffmZjB-9MBHenQ/viewform?usp=pp_url` +
                `&emailAddress=${emailinput}` +
                `&entry.1503124298=${usernickname.trim().replaceAll(' ', '+')}` +
                `&entry.1563281728=${usercallsigns.filter(s => !s.includes(`FD`))[0]}` +
                `&entry.909843694=${usertag.replaceAll('#', '%23')}` +
                `&entry.650105918=${rankinput.replaceAll(' ', '+')}` +
                `&entry.22974012=${dbclockin[0].clockin}` +
                `&entry.289301560=${clockout}` +
                `&entry.1474572841=${totaltime}` +
                `&entry.1799406772=${today}` +
                `&entry.386319268=${patroltypeinput.replaceAll(' ', '+')}`)


                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`LSPD Quick Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => !s.includes(`FD`))[0]},
                        {name: `:beginner:  |  __Rank:__`, value: rankinput},
                        {name: `:identification_card:  |  __Discord Username:__`, value: usertag},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:police_car:  |  __Patrol Type:__`, value: patroltypeinput},
                        {name: `:clock1:  |  __Clock In:__`, value: dbclockin[0].clockin},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockout},
                        {name: `:hourglass:  |  __Total Time:__`, value: totaltime},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(lspdclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
                const previousembed = interaction.message.embeds[0];

                const activeusers = previousembed.fields[0].value
                const clockin = previousembed.fields[1].value

                const intuserindex = activeusers.indexOf(interaction.user.id) - 2
                const clockinindex = intuserindex-(5*intuserindex/22)

                const endresultusers = activeusers.replace(activeusers.substr(intuserindex, 22), "")
                const endresultclockin = clockin.replace(clockin.substr(clockinindex, 17), "")

                if (endresultusers == "") {
                    const safdclockoutembed = new EmbedBuilder()
                        .setColor('#5865F2')
                        .setTitle('LSPD Q-Clock Panel')
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                } else {
                    const safdclockoutembed = EmbedBuilder.from(previousembed)
                    .setFields(
                        {name: 'Active Users', value: endresultusers, inline: true},
                        {name: 'Clock In', value: endresultclockin, inline: true}
                    )
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                }
            } else if (interaction.customId == 'safdqmodal') {
                var todate = new Date();
                // create connection/mysql database
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
                const clockout = hh+`:`+mm+`:00`;
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT clockin FROM safdhours WHERE clockout IS NULL", (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                var dbclockin = await queryresult();
                if (dbclockin[0] === undefined) {
                    await interaction.followUp('You no clock in you buffooon safd');
                    return;
                };
                var clockinstart = new Date("01/01/2007 " + dbclockin[0].clockin);
                var clockinstop = new Date("01/01/2007 " + clockout);
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                hourDiff = hourDiff - minDiff/60
                const totaltime = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                const sql = `UPDATE safdhours SET clockout='${clockout}', total_time='${totaltime}' WHERE clockout IS NULL`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const emailinput = interaction.fields.getTextInputValue(`safdemailinput`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                var notes = interaction.fields.getTextInputValue(`safdnotesinput`);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var safdclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSd-G-oCDsHjdZX9l1DYoXl9GN5I7LJ2jTCuRg2KFG-lCxJ_PA/viewform?usp=pp_url` + 
                `&emailAddress=${emailinput}` +
                `&entry.924437591=${usernickname.trim().replaceAll(' ', '+')}` + 
                `&entry.1740414105=${usercallsigns.filter(s => s.includes(`FD`))[0]}` + 
                `&entry.1362587187=${today}` +
                `&entry.522182144=${dbclockin[0].clockin}` + 
                `&entry.522100359=${clockout}` + 
                `&entry.2145413509=${totaltime}`+ 
                `&entry.333732655=${notes.trim().replaceAll(' ', '+')}`)

                if (notes == '') notes = ' ';

                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`SAFD Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => s.includes(`FD`))[0]},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:clock1:  |  __Clock In:__`, value: dbclockin[0].clockin},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockout},
                        {name: `:hourglass:  |  __Total Time:__`, value: totaltime},
                        {name: `:police_car:  |  __Notes:__`, value: notes},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(safdclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
                const previousembed = interaction.message.embeds[0];

                const activeusers = previousembed.fields[0].value
                const clockin = previousembed.fields[1].value

                const intuserindex = activeusers.indexOf(interaction.user.id) - 2
                const clockinindex = intuserindex-(5*intuserindex/22)

                const endresultusers = activeusers.replace(activeusers.substr(intuserindex, 22), "")
                const endresultclockin = clockin.replace(clockin.substr(clockinindex, 17), "")

                if (endresultusers == "") {
                    const safdclockoutembed = new EmbedBuilder()
                        .setColor('#ED4245')
                        .setTitle('SAFD Q-Clock Panel')
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                } else {
                    const safdclockoutembed = EmbedBuilder.from(previousembed)
                    .setFields(
                        {name: 'Active Users', value: endresultusers, inline: true},
                        {name: 'Clock In', value: endresultclockin, inline: true}
                    )
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                }
            } else if (interaction.customId == 'bcsoqmodal') {
                var todate = new Date();
                // create connection/mysql database
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
                const clockout = hh+`:`+mm+`:00`;
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT clockin FROM bcsohours WHERE clockout IS NULL", (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                var dbclockin = await queryresult();
                if (dbclockin[0] === undefined) {
                    await interaction.followUp('You no clock in you buffooon bcso');
                    return;
                };
                var clockinstart = new Date("01/01/2007 " + dbclockin[0].clockin);
                var clockinstop = new Date("01/01/2007 " + clockout);
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                hourDiff = hourDiff - minDiff/60
                const totaltime = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                const sql = `UPDATE bcsohours SET clockout='${clockout}', total_time='${totaltime}' WHERE clockout IS NULL`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const emailinput = interaction.fields.getTextInputValue(`bcsoemailinput`);
                const rankinput = interaction.fields.getTextInputValue(`bcsorankinput`);
                const patroltypeinput = interaction.fields.getTextInputValue(`bcsopatroltypeinput`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usertag = interactionUser.user.tag;
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var bcsoclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSfcc65OmXOdpoe-LMTHxhkqGnxKH3IAEw9dffmZjB-9MBHenQ/viewform?usp=pp_url` +
                `&emailAddress=${emailinput}` +
                `&entry.1503124298=${usernickname.trim().replaceAll(' ', '+')}` +
                `&entry.1563281728=${usercallsigns.filter(s => !s.includes(`FD`))[0]}` +
                `&entry.909843694=${usertag.replaceAll('#', '%23')}` +
                `&entry.650105918=${rankinput.replaceAll(' ', '+')}` +
                `&entry.22974012=${dbclockin[0].clockin}` +
                `&entry.289301560=${clockout}` +
                `&entry.1474572841=${totaltime}` +
                `&entry.1799406772=${today}` +
                `&entry.386319268=${patroltypeinput.replaceAll(' ', '+')}`)


                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`LSPD Quick Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => !s.includes(`FD`))[0]},
                        {name: `:beginner:  |  __Rank:__`, value: rankinput},
                        {name: `:identification_card:  |  __Discord Username:__`, value: usertag},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:police_car:  |  __Patrol Type:__`, value: patroltypeinput},
                        {name: `:clock1:  |  __Clock In:__`, value: dbclockin[0].clockin},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockout},
                        {name: `:hourglass:  |  __Total Time:__`, value: totaltime},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(bcsoclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
                const previousembed = interaction.message.embeds[0];

                const activeusers = previousembed.fields[0].value
                const clockin = previousembed.fields[1].value

                const intuserindex = activeusers.indexOf(interaction.user.id) - 2
                const clockinindex = intuserindex-(5*intuserindex/22)

                const endresultusers = activeusers.replace(activeusers.substr(intuserindex, 22), "")
                const endresultclockin = clockin.replace(clockin.substr(clockinindex, 17), "")

                if (endresultusers == "") {
                    const safdclockoutembed = new EmbedBuilder()
                        .setColor('#5865F2')
                        .setTitle('BCSO Q-Clock Panel')
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                } else {
                    const safdclockoutembed = EmbedBuilder.from(previousembed)
                    .setFields(
                        {name: 'Active Users', value: endresultusers, inline: true},
                        {name: 'Clock In', value: endresultclockin, inline: true}
                    )
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                }
            } else if (interaction.customId == 'acdqmodal') {
                var todate = new Date();
                // create connection/mysql database
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
                const clockout = hh+`:`+mm+`:00`;
                const queryresult = () => {
                    return new Promise((resolve, reject)=>{
                        db.query("SELECT clockin FROM acdhours WHERE clockout IS NULL", (err, result) => {
                        if (err) throw err;
                        return resolve(result);
                    });
                });
                };
                var dbclockin = await queryresult();
                if (dbclockin[0] === undefined) {
                    await interaction.followUp('You no clock in you buffooon acd');
                    return;
                };
                var clockinstart = new Date("01/01/2007 " + dbclockin[0].clockin);
                var clockinstop = new Date("01/01/2007 " + clockout);
                var hourDiff = (clockinstop - clockinstart)/1000/60/60;
                if (hourDiff < 0) {
                    hourDiff = 24 + hourDiff;
                }
                var minDiff = (hourDiff % 1)*60
                if (minDiff < 0 ) {
                    minDiff = 1440 + minDiff;
                }
                hourDiff = hourDiff - minDiff/60
                const totaltime = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                const sql = `UPDATE acdhours SET clockout='${clockout}', total_time='${totaltime}' WHERE clockout IS NULL`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    
                });
                const emailinput = interaction.fields.getTextInputValue(`acdemailinput`);
                const rankinput = interaction.fields.getTextInputValue(`acdrankinput`);
                const patroltypeinput = interaction.fields.getTextInputValue(`acdpatroltypeinput`);
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usertag = interactionUser.user.tag;
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var clockinDiff = hourDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":" + minDiff.toLocaleString(`en-US`, {minimumIntegerDigits: 2}) + ":00"
                var acdclockinurl = (`https://docs.google.com/forms/d/e/1FAIpQLSeTGhMNre5Yire4LjygynRw6WnZf_0RGNyLwX4oDi1edJ6-_g/viewform?usp=pp_url` +
                `&emailAddress=${emailinput}` +
                `&entry.1503124298=${usernickname.trim().replaceAll(' ', '+')}` +
                `&entry.1563281728=${usercallsigns.filter(s => !s.includes(`FD`))[0]}` +
                `&entry.909843694=${usertag.replaceAll('#', '%23')}` +
                `&entry.650105918=${rankinput.replaceAll(' ', '+')}` +
                `&entry.22974012=${dbclockin[0].clockin}` +
                `&entry.289301560=${clockout}` +
                `&entry.1474572841=${totaltime}` +
                `&entry.1799406772=${today}` +
                `&entry.386319268=${patroltypeinput.replaceAll(' ', '+')}`)


                const botpanelembed = new EmbedBuilder()
                    .setColor(`#5865F2`)
                    .setTitle(`LSPD Quick Clockin Form`)
                    .setDescription(`Use the buttons below to confirm the form and submit.`)
                    .setFields(
                        {name: `:e_mail:  |  __Email:__`, value: emailinput},
                        {name: `:bust_in_silhouette:  |  __Name:__`, value: usernickname},
                        {name: `:pager:  |  __Callsign:__`, value: usercallsigns.filter(s => !s.includes(`FD`))[0]},
                        {name: `:beginner:  |  __Rank:__`, value: rankinput},
                        {name: `:identification_card:  |  __Discord Username:__`, value: usertag},
                        {name: `:calendar:  |  __Date:__`, value: today},
                        {name: `:police_car:  |  __Patrol Type:__`, value: patroltypeinput},
                        {name: `:clock1:  |  __Clock In:__`, value: dbclockin[0].clockin},
                        {name: `:clock2:  |  __Clock Out:__`, value: clockout},
                        {name: `:hourglass:  |  __Total Time:__`, value: totaltime},
                        
                        
                    )
                    .setFooter({ text: `Work In Progress`})
                    .setTimestamp()
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(acdclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
                const previousembed = interaction.message.embeds[0];

                const activeusers = previousembed.fields[0].value
                const clockin = previousembed.fields[1].value

                const intuserindex = activeusers.indexOf(interaction.user.id) - 2
                const clockinindex = intuserindex-(5*intuserindex/22)

                const endresultusers = activeusers.replace(activeusers.substr(intuserindex, 22), "")
                const endresultclockin = clockin.replace(clockin.substr(clockinindex, 17), "")

                if (endresultusers == "") {
                    const safdclockoutembed = new EmbedBuilder()
                        .setColor('#4e5058')
                        .setTitle('ACD Q-Clock Panel')
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                } else {
                    const safdclockoutembed = EmbedBuilder.from(previousembed)
                    .setFields(
                        {name: 'Active Users', value: endresultusers, inline: true},
                        {name: 'Clock In', value: endresultclockin, inline: true}
                    )
                    await interaction.message.edit({embeds: [safdclockoutembed]})
                }    
            }
        }
    }




};