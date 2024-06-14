const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const mysql = require('mysql');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-message-log')
		.setDescription('Logs Deleted Messages in Channel')
		.addSubcommand(command => command.setName('setup').setDescription('Setup the deleted message log system').addChannelOption(option => option.setName('channel').setDescription('Log Channel').addChannelTypes(ChannelType.GuildText).setRequired(true)))
		.addSubcommand(command => command.setName('disable').setDescription('Disable deleted message log system'))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {

		const db = mysql.createConnection({
            host: '192.168.1.5',
            user: 'pi',
            password: 'Gamingpassword7',
            database: 'masterhours',
            connectTimeout: 60000
        });
        db.connect(function(err) {
            if (err) throw err;
        });
		
		const { options } = interaction;
		const sub = options.getSubcommand();
        var data = () => {
            return new Promise((resolve, reject)=>{
                db.query(`SELECT * from deletemsglog where guild='${interaction.guild.id}'`, (err, result) => {
                if (err) throw err;
                return resolve(result);
            });
        });
        };
		data = await data();

		async function sendMessage (message) {
			const embed = new EmbedBuilder()
			.setColor("Blurple")
			.setDescription(message);

			await interaction.reply({ embeds: [embed], ephemeral: true })
		}

		switch (sub) {
			case 'setup':
				if (data[0]) {
					await sendMessage(`⚠️ You have already set this system up`);
				} else {
					var channel = options.getChannel('channel');
					db.query(`INSERT INTO deletemsglog (guild, channel) VALUES ('${interaction.guild.id}', '${channel.id}')`, function (err, result) {
						if (err) throw err;
					});
					await sendMessage(`✅ Deleted message logging system setup in ${channel}`)
				}
			break;
			case 'disable':
				if (!data[0]) {
					await sendMessage(`⚠️ Cannot disable an already disabled system`);
				} else {
					db.query(`DELETE FROM deletemsglog WHERE guild='${interaction.guild.id}'`, function (err, result) {
						if (err) throw err;
					});
					await sendMessage(`❌ Deleted message logging system disabled`)
				}
		}
		db.end();
	},
};
