const { SlashCommandBuilder, ActivityType, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setstatus')
		.setDescription('Sets bot status')
        .addStringOption(option => option.setName('status').setDescription('Status to set bot status to').setMaxLength(128).setRequired(true))
        .addStringOption(option => option.setName('type').setDescription('Type to set bot status type to').addChoices(
            { name: 'Watching', value: `${3}` }, 
            { name: 'Playing', value: `${0}` }, 
            { name: 'Listening', value: `${2}` }, 
            { name: 'Competing', value: `${5}` }, 
            { name: 'Streaming', value: `${1}`},
            { name: 'None', value: `${4}` }
        ).setRequired(true)),
	async execute(interaction) {

        const { options } = interaction;
		const status = options.getString('status');
        const type = parseInt(options.getString('type'));

        if (interaction.user.id != "624733100064112683") 
            return await interaction.reply({ content: 'You do not have access to this command.', emphemeral: true});

        interaction.client.user.setPresence({
			activities: [{ name: status, type: type }],
            status: 'online'
		});

        const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription(`The bot now has the status \`${status}\`, with type \`${type}\``)

        await interaction.reply({ embeds: [embed], ephemeral: true })
	},
};
