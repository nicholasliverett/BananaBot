const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isButton()) {
            await interaction.deferReply({ephemeral: true})
            if (interaction.customId === 'lspdform') {
                await interaction.followUp('LSPD')
            } else if (interaction.customId === 'safdform') {
                await interaction.followUp('SAFD')
            } else if (interaction.customId === 'ccoform') {
                await interaction.followUp('CCO')
            }
    }

    }
};