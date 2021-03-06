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
                {'name' : 'Setup','value' : `${prefix}create-command : Create A New Custom Command.\n${prefix}delete-command : Delete A Custom Command.\n${prefix}set-welcome-channel : Set welcome messages channel.\n${prefix}set-leave-channel : Set leave messages channel.`},
                {'name' : 'Informations','value' : `${prefix}help : Display All Commands Help.\n${prefix}display-avatar : Displays The Avatar Of The Mentioned Member.`},
                {'name' : 'Moderation','value' : `${prefix}ban : Ban The Mentioned Member.\n${prefix}kick : Kick The Mentioned Member.\n${prefix}mute : Mute The Mentioned Member.`},
                {'name' : 'Roles','value' : `${prefix}add-role : Give a role to a member.\n${prefix}remove-role : Remove a role from a member.`})
			msg.channel.send(helpEmbed)
        };
    };
});