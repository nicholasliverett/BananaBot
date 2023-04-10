const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botpanel')
		.setDescription('Posts Bot Button Panel'),
	async execute(interaction) {
        const botpanelembed = new EmbedBuilder()
            .setColor('#23272A')
            .setTitle('Banana Bot Panel')
            .setDescription('Use the buttons below to complete tasks')
            .setFields(
                { name: '\u200B', value: ' ' },
                {name: '<:lspd:1079545918736564374>  |  __LSPD Form__', value: 'Clock in form for Los Santos Police Department'},
                { name: '\u200B', value: ' ' },
                {name: '<:safd:1079545723026145352>  |  __SAFD Form__', value: 'Clock in form for San Andreas Fire Department'},
                { name: '\u200B', value: ' ' },
                {name: '<:cco:1079546626634424321>  |  __CCO Form__', value: 'Clock in form for Certified Civilian Operations'},
                { name: '\u200B', value: ' ' }
            )
            .setFooter({ text: 'Work In Progress'})
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/qm87jIy.png')
        const lspdquickembed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('LSPD Quick Clock-In Panel')
            .setDescription('Use the buttons below to quickly clock in/out')
            .setFooter({ text: 'Work In Progress'})
            .setTimestamp()
        const safdquickembed = new EmbedBuilder()
            .setColor('#ED4245')
            .setTitle('SAFD Quick Clock-In Panel')
            .setDescription('Use the buttons below to quickly clock in/out')
            .setFooter({ text: 'Work In Progress'})
            .setTimestamp()
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
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('CCO Form')
                        .setCustomId('ccoform')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('1079546626634424321')
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