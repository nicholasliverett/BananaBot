const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

var todate = new Date();

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isModalSubmit()) {
            await interaction.deferReply({ephemeral: true})
            if (interaction.customId === 'lspdmodal') {
                const emailinput = interaction.fields.getTextInputValue('lspdemailinput');
                const rankinput = interaction.fields.getTextInputValue('lspdrankinput');
                const clockininput = interaction.fields.getTextInputValue('lspdclockininput');
                const clockoutinput = interaction.fields.getTextInputValue('lspdclockoutinput');
                const patroltypeinput = interaction.fields.getTextInputValue('lspdpatroltypeinput');
                const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
                const usernickname = interactionUser.nickname.replace(/\[.+?]/g, "");
                const usertag = interactionUser.user.tag;
                const usercallsigns = interactionUser.nickname.match(/(?<=\[)[^\][]*(?=])/g);
                var dd = todate.getDate();
                var mm = todate.getMonth()+1;
                const yyyy = todate.getFullYear();
                if(dd<10) {
                    dd='0'+dd;
                } 
                if(mm<10) {
                    mm='0'+mm;
                } 
                const today = yyyy+'-'+mm+'-'+dd;



                const botpanelembed = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('LSPD Clockin Form')
                    .setDescription('Use the buttons below to confirm the form and submit.')
                    .setFields(
                        {name: '\u200B', value: ' ' },
                        {name: ':e_mail:  |  __Email:__', value: emailinput},
                        {name: '\u200B', value: ' ' },
                        {name: ':bust_in_silhouette:  |  __Name:__', value: usernickname},
                        {name: '\u200B', value: ' ' },
                        {name: ':pager:  |  __Callsign:__', value: usercallsigns.filter(s => !s.includes('FD'))[0]},
                        {name: '\u200B', value: ' ' },
                        {name: ':beginner:  |  __Rank:__', value: rankinput},
                        {name: '\u200B', value: ' ' },
                        {name: ':identification_card:  |  __Discord Username:__', value: usertag},
                        {name: '\u200B', value: ' ' },
                        {name: ':calendar:  |  __Date:__', value: today},
                        {name: '\u200B', value: ' ' },
                        {name: ':police_car:  |  __Patrol Type:__', value: patroltypeinput},
                        {name: '\u200B', value: ' ' },
                        {name: ':clock1:  |  __Clock In:__', value: clockininput},
                        {name: '\u200B', value: ' ' },
                        {name: ':clock2:  |  __Clock Out:__', value: clockoutinput},
                        {name: '\u200B', value: ' ' },
                        {name: ':hourglass:  |  __Total Time:__', value: 'PENISHOLDER'},
                        {name: '\u200B', value: ' ' },
                        
                        
                    )
                    .setFooter({ text: 'Work In Progress'})
                    .setTimestamp(Date.now())
                    .setThumbnail('https://i.imgur.com/qm87jIy.png')
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Confirm')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://docs.google.com/forms/d/e/1FAIpQLSfcc65OmXOdpoe-LMTHxhkqGnxKH3IAEw9dffmZjB-9MBHenQ/viewform?usp=pp_url' +
                            '&emailAddress=gamingthingemail@gmail.com' +
                            '&entry.1503124298=Jimmy+M.' +
                            '&entry.1563281728=410' +
                            '&entry.909843694=Banana_king_destoyer777%231526' +
                            '&entry.650105918=Police+Officer+II' +
                            '&entry.22974012=22:00' +
                            '&entry.289301560=23:15' +
                            '&entry.1474572841=01:15:00' +
                            '&entry.1799406772=2023-02-25' +
                            '&entry.386319268=Training+Patrol')
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
            }
        }
    }




};