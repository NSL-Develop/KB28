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
    if (command == "add-role") {
        if (msg.author.hasPermission('MANAGE_ROLES')) {
            if (args[0] && args[1] && args[1] == msg.mentions.users.first()) {
                var role = msg.guild.roles.cache.find(role => role.name === args[0])
                var member = msg.mentions.users.first()
                member.roles.add(role)

            } else {
                msg.channel.send("Command Syntax : !add-role <role_name> <target_member>")
            };
        } else {
            msg.channel.send("You have no permission to execute this command")
        };
    };
});