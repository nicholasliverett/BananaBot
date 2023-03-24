const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botpanel')
		.setDescription('Posts Bot Button Panel'),
	async execute(interaction) {
        const botpanelembed = new EmbedBuilder()
            .setColor('#ebff2b')
            .setTitle('Banana Bot Panel')
            .setDescription('Use the buttons below to complete tasks')
            .setFields(
                { name: '\u200B', value: ' ' },
                {name: '<:lspd:1079545918736564374>  |  __LSPD Form__', value: 'Clock in form for Los Santos Police Department'},
                { name: '\u200B', value: ' ' },
                {name: '<:safd:1079545723026145352>  |  __SAFD Form__', value: 'Clock in form for San Andreas Fire Department'},
                { name: '\u200B', value: ' ' },
                {name: '<:cco:1079546626634424321>  |  __CCO Form__', value: 'Clock in form for Certified Civilian Operations'}
            )
            .setFooter({ text: 'Work In Progress'})
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/qm87jIy.png')

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('LSPD Form')
                        .setCustomId('lspdform')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('1079545918736564374')
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('SAFD Form')
                        .setCustomId('safdform')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('1079545723026145352')
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('CCO Form')
                        .setCustomId('ccoform')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('1079546626634424321')
                )
		await interaction.reply({embeds: [botpanelembed], components: [row]});
	},
};