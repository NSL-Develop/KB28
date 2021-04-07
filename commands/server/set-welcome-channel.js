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
        if (existsFile("servers/" + msg.guild.id + "/config/main.json")) {
            processCommand(msg, command)
        } else {
            if (!existsFile("servers/" + msg.guild.id + "/")) {
                makeDir("servers/" + msg.guild.id + "/")
                makeDir("servers/" + msg.guild.id + "/config/")
                var customCommandsJson = {"channels":{}}
                writeJson("servers/" + msg.guild.id + "/config/main.json", customCommandsJson)
                processCommand(msg, command)
            } else {
                if (!existsFile("servers/" + msg.guild.id + "/config/")) {
                    makeDir("servers/" + msg.guild.id + "/config/")
                    var customCommandsJson = {"channels":{}}
                    writeJson("servers/" + msg.guild.id + "/config/main.json", customCommandsJson)
                    processCommand(msg, command)
                };
            };
        };
    };
});

function processCommand(msg, command) {
    if (command == "set-welcome-channel") {
        var configFile = readJson("servers/" + msg.guild.id + "/config/main.json")
        if (typeof(configFile.channels) != "undefined") {
            configFile.channels.welcome = msg.channel.id
            writeJson("servers/" + msg.guild.id + "/config/main.json", configFile)
            const resultEmbed = new Discord.MessageEmbed()
                .setTitle(`New Welcome Channel`)
                .addFields(
                    {'name' : 'Channel','value' : msg.channel.name})
            msg.channel.send(resultEmbed)
        };
    };
};