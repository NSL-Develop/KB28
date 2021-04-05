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
    if (msg.guild != null && msg.member.hasPermission('MANAGE_GUILD')) {
        if (command == 'delete-command' && args[0]) {
            if (existsFile("servers/" + msg.guild.id + "/custom_commands/main.json")) {
                deleteCommand(msg, args)
            } else {
                if (!existsFile("servers/" + msg.guild.id + "/")) {
                    makeDir("servers/" + msg.guild.id + "/")
                    makeDir("servers/" + msg.guild.id + "/custom_commands/")
                    var customCommandsJson = {"admin":{},"moderator":{},"everyone":{}}
                    writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsJson)
                    deleteCommand(msg, args)
                } else {
                    if (!existsFile("servers/" + msg.guild.id + "/custom_commands/")) {
                        makeDir("servers/" + msg.guild.id + "/custom_commands/")
                        var customCommandsJson = {"admin":{},"moderator":{},"everyone":{}}
                        writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsJson)
                        deleteCommand(msg, args)
                    };
                };
            };
        };
    };
});

function deleteCommand(msg, args) {
    customCommandsFile = readJson("servers/" + msg.guild.id + "/custom_commands/main.json")
    if (typeof(customCommandsFile.admin[args[0]]) != "undefined") {
        delete customCommandsFile.admin[args[0]]
        const resultEmbed = new Discord.MessageEmbed()
            .setTitle(`Command Deleted`)
            .addFields(
                {'name' : 'Deleted Command','value' : `${prefix}${args[0]}`})
        msg.channel.send(resultEmbed)
    };
    if (typeof(customCommandsFile.moderator[args[0]]) != "undefined") {
        delete customCommandsFile.moderator[args[0]]
        const resultEmbed = new Discord.MessageEmbed()
            .setTitle(`Command Deleted`)
            .addFields(
                {'name' : 'Deleted Command','value' : `${prefix}${args[0]}`})
        msg.channel.send(resultEmbed)
    };
    if (typeof(customCommandsFile.everyone[args[0]]) != "undefined") {
        delete customCommandsFile.everyone[args[0]]
        const resultEmbed = new Discord.MessageEmbed()
            .setTitle(`Command Deleted`)
            .addFields(
                {'name' : 'Deleted Command','value' : `${prefix}${args[0]}`})
        msg.channel.send(resultEmbed)
    };
    writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsFile)
};