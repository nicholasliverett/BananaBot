const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`)

var todate = new Date();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isModalSubmit()) {
            await interaction.deferReply({ephemeral: true})
            if (interaction.customId === `lspdmodal`) {
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
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/qm87jIy.png`)
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(`Confirm`)
                            .setStyle(ButtonStyle.Link)
                            .setURL(lspdclockinurl)
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
            }
        }
    }




};