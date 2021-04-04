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
        if (command == 'mute' && msg.member.hasPermission('MUTE_MEMBERS')) {
            if (msg.mentions.users.first() && typeof(msg.mentions.users.first()) != "undefined") {
                if (msg.guild.roles.cache.find(role => role.name == "muted")) {
                    var role = msg.guild.roles.cache.find(role => role.name == "muted")
                    msg.guild.member(msg.mentions.users.first()).roles.add(role)
                    const muteEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Muted`)
                    .addFields(
                        {'name' : 'Informations','value' : `${msg.mentions.users.first()} has been muted.`})
                    msg.channel.send(muteEmbed)
                } else {
                    const errorEmbed = new Discord.MessageEmbed()
                    .setTitle(`Error`)
                    .addFields(
                        {'name' : 'Informations','value' : `You must first create a role named "muted" and make it mute.`})
                    msg.channel.send(errorEmbed)
                };
            };
        };
    };
});