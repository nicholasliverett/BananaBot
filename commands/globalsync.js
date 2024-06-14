const { SlashCommandBuilder } = require('discord.js');
const shell = require('shelljs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('globalsync')
		.setDescription('CAREFUL: Syncs all commands globally!'),
	async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
		var result = shell.exec('node ./delete-commands.js');
		//console.log(result);
        result = shell.exec('node ./deploy-commands-globally.js');
        //console.log(result);
		await interaction.followUp('Attempted to Sync Commands Globally');
	},
};