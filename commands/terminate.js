const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('terminate')
		.setDescription('Terminate Bot Client'),
	async execute(interaction) {
        if (interaction.user.id == '624733100064112683') {
            console.log(`${interaction.user.tag} used /terminate`)
            await interaction.reply('Terminating...')
            process.exit();
        } else {
            await interaction.reply('You do not have adequate permission to terminate this bot.')
        }
	},
};