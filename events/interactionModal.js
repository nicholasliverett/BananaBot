const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isModalSubmit()) {
            await interaction.deferReply({ephemeral: true})
            if (interaction.customId === 'lspdmodal') {
                const nameinput = interaction.fields.getTextInputValue('lspdnameinput');
                const rankinput = interaction.fields.getTextInputValue('lspdnrankinput');
                const clockininput = interaction.fields.getTextInputValue('lspdclockininput');
                const clockoutinput = interaction.fields.getTextInputValue('lspdclockoutinput');
                const patroltypeinput = interaction.fields.getTextInputValue('lspdpatroltypeinput');

                const botpanelembed = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('LSPD Clockin Form')
                    .setDescription('Use the buttons below to confirm the form below and submit.')
                    .setFields(
                        {name: '\u200B', value: ' ' },
                        {name: ':bust_in_silhouette: | Name:', value: nameinput},
                        {name: '\u200B', value: ' ' },
                        {name: ':man_police_officer: | Rank:', value: rankinput},
                        {name: '\u200B', value: ' ' },
                        {name: ':clock1: | Clock In:', value: clockininput},
                        {name: '\u200B', value: ' ' },
                        {name: ':clock2: | Clock Out:', value: clockoutinput},
                        {name: '\u200B', value: ' ' },
                        {name: ':police_car: | Patrol Type:', value: patroltypeinput},
                        {name: '\u200B', value: ' ' }
                    )
                    .setFooter({ text: 'Work In Progress'})
                    .setTimestamp(Date.now())
                    .setThumbnail('https://i.imgur.com/qm87jIy.png')
                const buttonrow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Confirm')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://bananaproject.tj/')
                    )
                
                await interaction.followUp({embeds: [botpanelembed], components: [buttonrow]});
            }
        }
    }




};