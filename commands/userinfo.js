const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName('userinfo')
    .setType(ApplicationCommandType.User)
    .setDMPermission(false),
    async execute (interaction) {

        const activitytypes = new Map([
            [0, 'Playing '],
            [1, 'Streaming '],
            [2, 'Listening to '],
            [3, 'Watching '],
            [4, ''],
            [5, 'Competing in ']
        ])

        const user = interaction.targetUser;
        const member = interaction.targetMember;
        const icon = user.displayAvatarURL();
        const accentColor = user.hexAccentColor || 'Blurple';
        const tag = user.tag;
        // let activity = member.presence?.activities[0].name;
        // if (activity == 'Custom Status') {
        //     activity = member.presence?.activities[0].state
        // };
        // let activitytype = member.presence?.activities[0].type;
        // if (user.id == interaction.client.user.id) {
        //     activity = user.presence?.activities[0].name;
        //     activitytype = user.presence?.activities[0].type;
        // };

        const embed = new EmbedBuilder()
        .setColor(`${accentColor}`)
        .setAuthor({ name: tag, iconURL: icon })
        // .setDescription(`Status: ${activitytypes?.get(activitytype) + activity}`)
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