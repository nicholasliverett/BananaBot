const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { ChartJSNodeCanvas, ChartCallback } = require('chartjs-node-canvas');
const { config } = require('shelljs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkhours')
		.setDescription('Gets hours in scatterplot form'),
	async execute(interaction) {
		// create connection/mysql database
		const mysql = require('mysql');
		const db = mysql.createConnection({
			host: '192.168.1.44',
			user: 'pi',
			password: 'Gamingpassword7',
			database: 'masterhours',
			connectTimeout: 60000
		});
		db.connect(function(err) {
			if (err) throw err;
		});
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
		const usertag = interactionUser.user.tag;

		var lspdqueryresult = () => {
			return new Promise((resolve, reject)=>{
				db.query(`SELECT date, total_time FROM lspdhours WHERE discord_id='${interaction.user.id}' AND NOT clockout IS NULL;`, (err, result) => {
				if (err) throw err;
				return resolve(result);
			});
		});
		};
		var lspdqresult = await lspdqueryresult();
		var safdqueryresult = () => {
			return new Promise((resolve, reject)=>{
				db.query(`SELECT date, total_time FROM safdhours WHERE discord_id='${interaction.user.id}' AND NOT clockout IS NULL;`, (err, result) => {
				if (err) throw err;
				return resolve(result);
				
			});
		});
		};
		var safdqresult = await safdqueryresult();

		const lspdhoursminutes = lspdqresult.map(a => a.total_time).map(function(x){ return x.split(/[.:]/) });
		for (let i = 0; i < lspdhoursminutes.length; i++) {
			var lspdhours = parseInt(lspdhoursminutes[i][0], 10);
			var lspdminutes = lspdhoursminutes[i][1] ? parseInt(lspdhoursminutes[i][1], 10) : 0;
			var lspdclocked = lspdhours + lspdminutes / 60;
			lspdqresult[i].total_time = lspdclocked;
		}

		const safdhoursminutes = safdqresult.map(a => a.total_time).map(function(x){ return x.split(/[.:]/) });
		for (let i = 0; i < safdhoursminutes.length; i++) {
			var safdhours = parseInt(safdhoursminutes[i][0], 10);
			var safdminutes = safdhoursminutes[i][1] ? parseInt(safdhoursminutes[i][1], 10) : 0;
			var safdclocked = safdhours + safdminutes / 60;
			safdqresult[i].total_time = safdclocked;
		}

		var lspdseen = {};
		lspdqresult = lspdqresult.filter(function(entry) {
			var previous;

			if (lspdseen.hasOwnProperty(entry.date)) {
				previous = lspdseen[entry.date];
				previous.total_time = previous.total_time + entry.total_time;
				return false;
			}

			lspdseen[entry.date] = entry;

			return true;
		});

		var safdseen = {};
		safdqresult = safdqresult.filter(function(entry) {
			var previous;

			if (safdseen.hasOwnProperty(entry.date)) {
				previous = safdseen[entry.date];
				previous.total_time = previous.total_time + entry.total_time;
				return false;
			}

			safdseen[entry.date] = entry;

			return true;
		});

		const lspdfirstDate = lspdqresult[0].date;
		const lspdlastDate = lspdqresult[lspdqresult.length - 1].date;

		const lspddates = [ ...Array(
				Date.parse(lspdlastDate)/86400000 - Date.parse(lspdfirstDate)/86400000 + 1).keys()    
			].map(k => new Date(
					86400000*k+Date.parse(lspdfirstDate)
				).toISOString().slice(0, 10).replace(/-0(\d)$/, '-$1').replace(/\d+/g, c => (c<10?'0':'') + +c));      
		let lspdres = []; 
		for(let i=0,j=0; i<lspddates.length; i++) { 
			lspdres[i] = {
				date: lspddates[i], 
				total_time: lspddates[i] === lspdqresult[j].date ? lspdqresult[j++].total_time : null
			}; 
		}

		const safdfirstDate = safdqresult[0].date;
		const safdlastDate = safdqresult[safdqresult.length - 1].date;

		const safddates = [ ...Array(
				Date.parse(safdlastDate)/86400000 - Date.parse(safdfirstDate)/86400000 + 1).keys()    
			].map(k => new Date(
					86400000*k+Date.parse(safdfirstDate)
				).toISOString().slice(0, 10).replace(/-0(\d)$/, '-$1').replace(/\d+/g, c => (c<10?'0':'') + +c));      
		let safdres = []; 
		for(let i=0,j=0; i<safddates.length; i++) { 
			safdres[i] = {
				date: safddates[i], 
				total_time: safddates[i] === safdqresult[j].date ? safdqresult[j++].total_time : null
			}; 
		}

		const width = 400
		const height = 200

		const canvas = new ChartJSNodeCanvas({
			width, 
			height, 
			plugins: {
				globalVariableLegacy: ['chartjs-adapter-date-fns']
			},
		});
		
		const configuration = {
			type: 'scatter',
			data: {
				datasets: [{
					label: 'LSPD Hours',
					data: lspdres,
					backgroundColor: 'rgba(19, 94, 216, 0.5)',
					borderColor: '#135dd8',
				}, {
					label: 'SAFD Hours',
					data: safdres,
					backgroundColor: 'rgba(237, 64, 67, 0.5)',
					borderColor: '#ed4245',
				}]
			},
			options: {scales: {x: {type: 'time', time: {unit: 'day'}}, y: {min: 0}}, parsing: {xAxisKey: 'date', yAxisKey: 'total_time'}}
		}

		// var dd = todate.getDate();
		// var mm = todate.getMonth()+1;
		// const yyyy = todate.getFullYear();
		// if(dd<10) {
		// 	dd=`0`+dd;
		// } 
		// if(mm<10) {
		// 	mm=`0`+mm;
		// } 
		// const today = yyyy+`-`+mm+`-`+dd;

		const image = await canvas.renderToBuffer(configuration)
		const hourschart = new AttachmentBuilder(image, {name: 'hourschart.png'})

		var lspdtotalhours = Math.floor(lspdqresult.map(item => item.total_time).reduce((prev, next) => prev + next));
		var lspdtotalmins = Math.round((lspdqresult.map(item => item.total_time).reduce((prev, next) => prev + next) - lspdtotalhours) * 60)

		var safdtotalhours = Math.floor(safdqresult.map(item => item.total_time).reduce((prev, next) => prev + next));
		var safdtotalmins = Math.round((safdqresult.map(item => item.total_time).reduce((prev, next) => prev + next) - safdtotalhours) * 60)

		var lspdtotal = lspdtotalhours + ':' + lspdtotalmins + ':00';
		var safdtotal = safdtotalhours + ':' + safdtotalmins + ':00';

		var d = new Date();

		d.setDate(1);
		d.setHours(1);

		while (d.getDay() !== 5) {
			d.setDate(d.getDate() + 1);
		}
		var d2 = new Date();
		d2.setHours(1);
		d2.setDate(d.getDate() + 14);
		var d0 = new Date();
		d0.setMonth(d0.getMonth() - 1);
		d0.setDate(1);
		d0.setHours(0);
		while (d0.getDay() !== 5) {
			d0.setDate(d0.getDate() + 1)
		}
		d0.setDate(d0.getDate() + 14)

		var fridays = [d0,d,d2]

		var temp = fridays.map(d => new Date() - new Date(d).getTime());
		var idx = temp.indexOf(Math.min(...temp.filter(x => x >= 0)));

		var lspdcycle = 0;
		var safdcycle = 0;
		try {
			for (let i = 0; new Date(lspdqresult[i].date) <= fridays[idx]; i++) {
				lspdcycle = lspdqresult.slice(i+1)
			}

			var lspdcyclehours = Math.floor(lspdcycle.map(item => item.total_time).reduce((prev, next) => prev + next));
			if(lspdcyclehours<10) {
				lspdcyclehours=`0`+lspdcyclehours;
			}
			var lspdcyclemins = Math.round((lspdcycle.map(item => item.total_time).reduce((prev, next) => prev + next) - lspdcyclehours) * 60)
			if(lspdcyclemins<10) {
				lspdcyclemins=`0`+lspdcyclemins;
			}
			var lspdcycletotal = lspdcyclehours + ':' + lspdcyclemins + ':00';
		} catch (error) {
			lspdcycletotal = '00:00:00'
		}
		try {
			for (let i = 0; new Date(safdqresult[i].date) <= fridays[idx]; i++) {
				safdcycle = safdqresult.slice(i+1)
			}
			var safdcyclehours = Math.floor(safdcycle.map(item => item.total_time).reduce((prev, next) => prev + next));
			if(safdcyclehours<10) {
				safdcyclehours=`0`+safdcyclehours;
			}
			var safdcyclemins = Math.round((safdcycle.map(item => item.total_time).reduce((prev, next) => prev + next) - safdcyclehours) * 60)
			if(safdcyclemins<10) {
				safdcyclemins=`0`+safdcyclemins;
			}
			var safdcycletotal = safdcyclehours + ':' + safdcyclemins + ':00';
		} catch (error) {
			safdcycletotal = '00:00:00'
		}

		const botpanelembed = new EmbedBuilder()
			.setColor(`#000000`)
			.setTitle(`LSPD and SAFD Hours`)
			.setFooter({ text: `Work In Progress`})
			.setTimestamp()
			.setFields(
				{ name: '\u200B', value: ' '},
				{ name: 'LSPD Hours', value: `Total: \`${lspdtotal}\`\nCycle: \`${lspdcycletotal}\``, inline: true},
				{ name: 'SAFD Hours', value: `Total: \`${safdtotal}\`\nCycle: \`${safdcycletotal}\``, inline: true},
			)
			.setImage('attachment://hourschart.png')

		await interaction.reply({embeds:[botpanelembed], files: [hourschart], ephemeral: true})
		db.end();
	},
};

// var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// var today = new Date();
// var d;
// var month;
// var last3months = [];

// for(var i = 2; i > 0; i -= 1) {
// 	d = new Date(today.getFullYear(), today.getMonth() - i, 1);
// 	month = monthNames[d.getMonth()];
// 	last3months.push(month)
// } 
// last3months.push(monthNames[today.getMonth()])