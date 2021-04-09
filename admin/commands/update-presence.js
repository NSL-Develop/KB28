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
    if (msg.author.tag == "NSL-Develop#6879") {
        if (command == "update-presence") {
            if (args[0] && args[1] && args[2]) {
                var presenceType = args[0]
                var presenceUrl = args[1]
                var presenceGame = args.slice(2).join(" ")
                if (presenceUrl == "none") {
                    presenceUrl = {}
                };
                writeJson("admin/commands/presence.json", {"type":presenceType,"url":presenceUrl,"game":presenceGame})
                const resultEmbed = new Discord.MessageEmbed()
                    .setTitle(`New Presence`)
                    .addFields(
                        {'name' : 'Type','value' : presenceType},
                        {'name' : 'Url','value' : presenceUrl},
                        {'name' : 'Game','value' : presenceGame})
                msg.channel.send(resultEmbed)
            } else {
                msg.channel.send("Command Syntax : !update-presence <type> <game/url> <game>")
            }
        };
    };
});