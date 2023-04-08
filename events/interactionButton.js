const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'lspdform') {
                const lspdmodal = new ModalBuilder()
                    .setCustomId('lspdmodal')
                    .setTitle('LSPD Clockin Modal');

                const lspdemailinput = new TextInputBuilder()
                    .setCustomId('lspdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const lspdrankinput = new TextInputBuilder()
                    .setCustomId('lspdrankinput')
                    .setLabel("Rank:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('Police Officer II')
                    .setRequired(true);

                const lspdclockininput = new TextInputBuilder()
                    .setCustomId('lspdclockininput')
                    .setLabel("Clock In Time:")
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

                const firstActionRow = new ActionRowBuilder().addComponents(lspdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(lspdrankinput);
                const thirdActionRow = new ActionRowBuilder().addComponents(lspdclockininput);
                const fourthActionRow = new ActionRowBuilder().addComponents(lspdclockoutinput);
                const fifthActionRow = new ActionRowBuilder().addComponents(lspdpatroltypeinput);

                lspdmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

                await interaction.showModal(lspdmodal);
            } else if (interaction.customId === 'safdform') {
                const lspdmodal = new ModalBuilder()
                    .setCustomId('safdmodal')
                    .setTitle('SAFD Clockin Modal');

                const safdemailinput = new TextInputBuilder()
                    .setCustomId('safdemailinput')
                    .setLabel("Email:")
                    .setStyle(TextInputStyle.Short)
                    .setValue('gamingthingemail@gmail.com')
                    .setRequired(true);

                const safdclockininput = new TextInputBuilder()
                    .setCustomId('safdclockininput')
                    .setLabel("Clock In Time:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const safdclockoutinput = new TextInputBuilder()
                    .setCustomId('safdclockoutinput')
                    .setLabel("Clock Out Time:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input in Military Time')
                    .setRequired(true);

                const safdpatroltypeinput = new TextInputBuilder()
                    .setCustomId('safdnotes')
                    .setLabel("Notes:")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Input Notes')
                    .setRequired(false);

                const firstActionRow = new ActionRowBuilder().addComponents(safdemailinput);
                const secondActionRow = new ActionRowBuilder().addComponents(safdclockininput);
                const thirdActionRow = new ActionRowBuilder().addComponents(safdclockoutinput);
                const fourthActionRow = new ActionRowBuilder().addComponents(safdpatroltypeinput);

                lspdmodal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

                await interaction.showModal(lspdmodal);
            } else if (interaction.customId === 'ccoform') {
                await interaction.followUp('CCO')
            }
        }
    }
    
};