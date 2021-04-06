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
    if (msg.guild != null && msg.member.hasPermission('MANAGE_GUILD') && msg.author.tag != "KB28#1545") {
        if (command == 'create-command' && args[0]) {
            if (args[1] && args[2] && args[3]) {
                if (existsFile("servers/" + msg.guild.id + "/custom_commands/main.json")) {
                    createCommand(msg, args)
                } else {
                    if (!existsFile("servers/" + msg.guild.id + "/")) {
                        makeDir("servers/" + msg.guild.id + "/")
                        makeDir("servers/" + msg.guild.id + "/custom_commands/")
                        var customCommandsJson = {"admin":{},"moderator":{},"everyone":{}}
                        writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsJson)
                        createCommand(msg, args)
                    } else {
                        if (!existsFile("servers/" + msg.guild.id + "/custom_commands/")) {
                            makeDir("servers/" + msg.guild.id + "/custom_commands/")
                            var customCommandsJson = {"admin":{},"moderator":{},"everyone":{}}
                            writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsJson)
                            createCommand(msg, args)
                        };
                    };
                };
            } else {
                msg.channel.send("Command Syntax : !create-command <command> <access : admin/moderator/everyone> <role/none> <message>")
            };
        };
    };
});

function createCommand(msg, args) {
    var customCommandsFile = readJson("servers/" + msg.guild.id + "/custom_commands/main.json")
    var commandTrigger = args[0]
    if (args[1] == "admin") {
        var commandMode = "admin"
    } else if (args[1] == "moderator") {
        var commandMode = "moderator"
    } else if (args[1] == "everyone") {
        var commandMode = "everyone"
    };
    var commandRole = args[2]
    var commandMessage = args.slice(3).join(" ")
    if (args[2].toLowerCase != "none") {
        customCommandsFile[commandMode][commandTrigger] = {"message":commandMessage}
        const resultEmbed = new Discord.MessageEmbed()
            .setTitle(`Command Created`)
            .addFields(
                {'name' : 'New Command','value' : `${prefix}${commandTrigger}`},
                {'name' : 'Actions','value' : `Message : ${commandMessage}`})
            msg.channel.send(resultEmbed)
    } else {
        customCommandsFile[commandMode][commandTrigger] = {"role":commandRole,"message":commandMessage}
        const resultEmbed = new Discord.MessageEmbed()
            .setTitle(`Command Created`)
            .addFields(
                {'name' : 'New Command','value' : `${prefix}${commandTrigger}`},
                {'name' : 'Actions','value' : `Message : ${commandMessage}\nRole : ${commandRole}`})
            msg.channel.send(resultEmbed)
    }
    writeJson("servers/" + msg.guild.id + "/custom_commands/main.json", customCommandsFile)
};