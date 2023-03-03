const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'lspdform') {
                const lspdmodal = new ModalBuilder()
                    .setCustomId('lspdmodal')
                    .setTitle('LSPD Clockin Modal');

                const lspdnameinput = new TextInputBuilder()
                    .setCustomId('lspdnameinput')
                    .setLabel("Name:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Jimmy M.')
                    .setRequired(true);

                const lspdrankinput = new TextInputBuilder()
                    .setCustomId('lspdnrankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Police Officer II')
                    .setRequired(true);

                const lspdclockininput = new TextInputBuilder()
                    .setCustomId('lspdclockininput')
                    .setLabel("Clock InTime :")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const lspdclockoutinput = new TextInputBuilder()
                    .setCustomId('lspdclockoutinput')
                    .setLabel("Clock Out Time:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const lspdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('lspdpatroltypeinput')
                    .setLabel("Patrol Type:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Normal Patrol')
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(lspdnameinput);
                const secondActionRow = new ActionRowBuilder().addComponents(lspdrankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(lspdclockininput);
                const fourthActionRow = new ActionRowBuilder().addComponents(lspdclockoutinput);
                const fifthActionRow = new ActionRowBuilder().addComponents(lspdpatroltypeinput);

                lspdmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

                await interaction.showModal(lspdmodal);
            } else if (interaction.customId === 'safdform') {
                await interaction.followUp('SAFD')
            } else if (interaction.customId === 'ccoform') {
                await interaction.followUp('CCO')
            }
        }
    }
    
};