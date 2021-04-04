const Discord = require('discord.js');
const index = require('../../index.js');
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
        if (command == 'display-avatar') {
            var member = msg.mentions.users.first()
            if(!member) member = msg.author;
            const avatarEmbed = new Discord.MessageEmbed()
                .setImage(member.avatarURL({dynamic: true}) + '?size=2048')
            msg.channel.send(avatarEmbed);
        };
    };
});