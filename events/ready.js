const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		client.user.setActivity({
			type: ActivityType.Custom,
			name: 'counting bananas in my closet',
			state: 'counting bananas in my closet'
		});
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.users.send('624733100064112683', 'Logged On');
	},
};