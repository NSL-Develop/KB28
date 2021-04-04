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
        if (command == 'ban' && msg.member.hasPermission('BAN_MEMBERS')) {
            if (msg.mentions.users.first()) {
                msg.guild.member(msg.mentions.users.first()).ban()
                const banEmbed = new Discord.MessageEmbed()
                .setTitle(`User Banned`)
                .addFields(
                    {'name' : 'Informations','value' : `${msg.mentions.users.first()} has been banned.`})
                msg.channel.send(banEmbed)
            };
        };
    };
});