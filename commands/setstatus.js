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
            { name: 'Custom', value: `${4}` }
        ).setRequired(true)),
	async execute(interaction) {

        const activitytypes = new Map([
            [0, 'Playing '],
            [1, 'Streaming '],
            [2, 'Listening to '],
            [3, 'Watching '],
            [4, ''],
            [5, 'Competing in ']
        ])

        const { options } = interaction;
		const status = options.getString('status');
        const type = parseInt(options.getString('type'));

        if (interaction.user.id != "624733100064112683") 
            return await interaction.reply({ content: 'You do not have access to this command.', emphemeral: true});

        interaction.client.user.setPresence({
			activities: [{ name: status, type: type, state: status }],
            status: 'online'
		});

        const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setDescription(`The bot now has the status \`${activitytypes.get(type)  + status}\``)

        await interaction.reply({ embeds: [embed], ephemeral: true })
	},
};
