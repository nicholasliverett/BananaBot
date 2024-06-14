const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('userinfo')
    .setType(ApplicationCommandType.User)
    .setDMPermission(false),
    async execute (interaction) {

        const user = interaction.targetUser
        const member = interaction.targetMember
        const icon = user.displayAvatarURL();
        const accentColor = user.hexAccentColor || 'Blurple';
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setColor(`${accentColor}`)
        .setAuthor({ name: tag, iconURL: icon })
        .setThumbnail(icon)
        .setFields(
            { name: 'Member', value: `${user}`, inline: false },
            { name: 'Roles', value: `${member.roles.cache.map( r => r).join(' ')}`, inline: false },
            { name: 'Joined Server', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
            { name: 'Joined Discord', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true}
        )
        .setTimestamp()
        
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}