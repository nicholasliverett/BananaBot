const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports ={
    data: new SlashCommandBuilder()
    .setName('botstatus')
    .setDescription('Gives bot status'),
    async execute (interaction) {

        const name = `${interaction.client.user.username}`;
        const icon = `${interaction.client.user.avatarURL()}`;
        let servercount = await interaction.client.guilds.cache.reduce((a, b) => a+b.memberCount, 0);

        let totalSeconds = interaction.client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes & ${seconds} seconds`;

        await interaction.deferReply({ephemeral: true});

        const reply = await interaction.fetchReply();

        const ping = `${reply.createdTimestamp - interaction.createdTimestamp} ms`;

        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setAuthor({ name: name, iconURL: icon })
            .setThumbnail(`${icon}`)
            .setFooter({ text: `Bot ID: ${interaction.client.user.id}` })
            .setTimestamp()
            .setFields(
                { name: 'Server Numbers', value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: 'Total Server Members', value: `${servercount}`, inline: true },
                { name: 'Latency', value: `${ping}`, inline: true },
                { name: 'Uptime', value: `\`\`\`${uptime}\`\`\`` }
            )

            await interaction.editReply({ embeds: [embed], ephemeral: true })
    
    }
}