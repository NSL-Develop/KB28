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
            if (args[0] && args[1]) {
                var presenceType = args[0]
                if (presenceType === "STREAMING") {
                    if (args[2]) {
                        var presenceURL = args[1]
                        var presenceGame = args.slice(2).join(" ")
                        client.user.setActivity(presenceGame, {type: presenceType, url: presenceURL})
                    } else {
                        msg.channel.send("Command Syntax : !update-presence <type> <url> <game>")
                    }
                }else {
                    var presenceGame = args.slice(1).join(" ")
                    client.user.setActivity(presenceGame, {type: presenceType})
                };
            } else {
                msg.channel.send("Command Syntax : !update-presence <type> <game/url> <game>")
            }
        };
    };
});