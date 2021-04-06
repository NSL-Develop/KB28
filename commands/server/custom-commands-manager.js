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
        if (existsFile("servers/" + msg.guild.id + "/custom_commands/main.json")) {
            processCommand(msg, command)
        } else {
            if (!existsFile("servers/" + msg.guild.id + "/")) {
                makeDir("servers/" + msg.guild.id + "/")
                makeDir("servers/" + msg.guild.id + "/custom_commands/")
                var customCommandsJson = {"admin":{},"moderator":{},"everyone":{}}
                writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsJson)
                processCommand(msg, command)
            } else {
                if (!existsFile("servers/" + msg.guild.id + "/custom_commands/")) {
                    makeDir("servers/" + msg.guild.id + "/custom_commands/")
                    var customCommandsJson = {"admin":{},"moderator":{},"everyone":{}}
                    writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsJson)
                    processCommand(msg, command)
                };
            };
        };
    };
});

function processCommand(msg, command) {
    var customCommandsFile = readJson("servers/" + msg.guild.id + "/custom_commands/main.json")
    if (typeof(customCommandsFile.admin) != "undefined") {
        Object.keys(customCommandsFile.admin).forEach(currentCommand => {
            if (typeof(currentCommand) != "undefined") {
                if (command == currentCommand) {
                    if (typeof(customCommandsFile.admin[currentCommand].role != "undefined")) {
                        var commandRole = customCommandsFile.admin[currentCommand].role
                    } else {
                        var commandRole = null
                    };
                    var commandMessage = customCommandsFile.admin[currentCommand].message
                    if (msg.member.hasPermission('ADMINISTRATOR')) {
                        launchCommand(msg, commandRole, commandMessage)
                    } else {
                        msg.channel.send("You do not have permission to run this command.")
                    };
                };
            };
        });
    };
    if (typeof(customCommandsFile.moderator) != "undefined") {
        Object.keys(customCommandsFile.moderator).forEach(currentCommand => {
            if (typeof(currentCommand) != "undefined") {
                if (command == currentCommand) {
                    if (typeof(customCommandsFile.moderator[currentCommand].role != "undefined")) {
                        var commandRole = customCommandsFile.moderator[currentCommand].role
                    } else {
                        var commandRole = null
                    };
                    var commandMessage = customCommandsFile.moderator[currentCommand].message
                    if (msg.member.hasPermission('BAN_MEMBERS') || msg.member.hasPermission('KICK_MEMBERS')) {
                        launchCommand(msg, commandRole, commandMessage)
                    } else {
                        msg.channel.send("You do not have permission to run this command.")
                    };
                };
            };
        });
    };
    if (typeof(customCommandsFile.everyone) != "undefined") {
        Object.keys(customCommandsFile.everyone).forEach(currentCommand => {
            if (typeof(currentCommand) != "undefined") {
                if (command == currentCommand) {
                    if (typeof(customCommandsFile.everyone[currentCommand].role != "undefined")) {
                        var commandRole = customCommandsFile.everyone[currentCommand].role
                    } else {
                        var commandRole = null
                    };
                    var commandMessage = customCommandsFile.everyone[currentCommand].message
                    launchCommand(msg, commandRole, commandMessage)
                };
            };
        });
    };
};

function launchCommand(msg, commandRole, commandMessage) {
    if (commandRole != null) {
        var role = msg.guild.roles.cache.find(role => role.name == commandRole)
        msg.guild.member(msg.author).roles.add(role)
    };
    msg.channel.send(commandMessage)
};