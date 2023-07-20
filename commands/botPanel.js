const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botpanel')
		.setDescription('Posts Bot Button Panel'),
	async execute(interaction) {
        const botpanelembed = new EmbedBuilder()
            .setColor('#23272A')
            .setTitle('Banana Bot Panel')
            .setDescription('Use the buttons below to clock hours for each respective department.')
            .setFields(
                { name: '\u200B', value: ' '},
                 {name: '__Form Buttons__', value: 'Traditional clock in form. Input time you clocked in and clocked out and everything else will be done for you.'},
                { name: '\u200B', value: ' '},
                { name: 'Q-__Clock Buttons__', value: 'Simply click clock in an clock out when you clock in and clock out and everything else will be done for you.'},
                { name: '\u200B', value: ' '}
            )
            .setFooter({ text: 'Work In Progress'})
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/qm87jIy.png')
        const lspdquickembed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('LSPD Q-Clock Panel')
        const safdquickembed = new EmbedBuilder()
            .setColor('#ED4245')
            .setTitle('SAFD Q-Clock Panel')
            const formrow = new ActionRowBuilder()
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
            const lspdquickrow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('LSPD Q-Clockin')
                        .setCustomId('lspdclockin')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('1079545918736564374')
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('LSPD Q-Clockout')
                        .setCustomId('lspdclockout')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('1079545918736564374')
                )
            const safdquickrow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('SAFD Q-Clockin')
                        .setCustomId('safdclockin')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('1079545723026145352')
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('SAFD Q-Clockout')
                        .setCustomId('safdclockout')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('1079545723026145352')
                )
		await interaction.reply({embeds: [botpanelembed], components: [formrow]});
        await interaction.followUp({embeds: [lspdquickembed], components: [lspdquickrow]});
        await interaction.followUp({embeds: [safdquickembed], components: [safdquickrow]});
	},
};