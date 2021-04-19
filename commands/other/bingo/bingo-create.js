const Discord = require('discord.js');
const index = require('../../../index.js');
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
    if (command == "b") {
        if (msg.member.hasPermission("MANAGE_GUILD")) {
            if (args[0]) {
                if (args[0] == "create" && args[1]) {
                    
                };
            } else {
                msg.channel.send("Command Syntax : !b <command>")
            };
        } else {
            msg.channel.send("You do not have permission to create a bingo !")
        };
    };
});