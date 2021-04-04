const Discord = require('discord.js');
const index = require('../index.js');
const client = index.client

const prefix = index.prefix
const readJson = index.readJson
const writeJson = index.writeJson
const existsFile = index.existsFile
const makeDir = index.makeDir

client.on('message', msg => {
    const prefix = index.prefix
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (msg.guild != null) {
        if (command == 'help') {
            const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`All Commands`)
            .addFields(
                {'name' : 'Informations','value' : `${prefix}help : Display All Commands Help.`})
			msg.channel.send(helpEmbed)
        };
    };
});