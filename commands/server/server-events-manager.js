const Discord = require('discord.js');
const index = require('../../index.js');
const client = index.client

const prefix = index.prefix
const readJson = index.readJson
const writeJson = index.writeJson
const existsFile = index.existsFile
const makeDir = index.makeDir

client.on('guildMemberAdd', member => {
    var guild = member.guild
    if (existsFile("servers/" + guild.id + "/config/main.json")) {
        processWelcome(member)
    } else {
        if (!existsFile("servers/" + guild.id + "/")) {
            makeDir("servers/" + guild.id + "/")
            makeDir("servers/" + guild.id + "/config/")
            var customCommandsJson = {"channels":{"welcome":{},"leave":{},"system_messages":{}}}
            writeJson("servers/" + guild.id + "/config/main.json", customCommandsJson)
            processWelcome(member)
        } else {
            if (!existsFile("servers/" + guild.id + "/config/")) {
                makeDir("servers/" + guild.id + "/config/")
                var customCommandsJson = {"channels":{"welcome":{},"leave":{},"system":{}}}
                writeJson("servers/" + guild.id + "/config/main.json", customCommandsJson)
                processWelcome(member)
            };
        };
    };
});

function processWelcome(member) {
    var guild = member.guild
    var configFile = readJson("servers/" + guild.id + "/config/main.json")
    if (typeof(configFile.channels) != "undefined") {
        if (typeof(configFile.channels.welcome) != "undefined") {
            var welcomeChannelId = configFile.channels.welcome
            var welcomeChannel = guild.channels.cache.find(channel => channel.id === welcomeChannelId)
            welcomeChannel.send("Welcome to the server, " + "<@" + member + "> !")
        };
    };
};

client.on('guildMemberRemove', member => {
    var guild = member.guild
    if (existsFile("servers/" + guild.id + "/config/main.json")) {
        processLeave(member)
    } else {
        if (!existsFile("servers/" + guild.id + "/")) {
            makeDir("servers/" + guild.id + "/")
            makeDir("servers/" + guild.id + "/config/")
            var customCommandsJson = {"channels":{"welcome":{},"leave":{},"system_messages":{}}}
            writeJson("servers/" + guild.id + "/config/main.json", customCommandsJson)
            processLeave(member)
        } else {
            if (!existsFile("servers/" + guild.id + "/config/")) {
                makeDir("servers/" + guild.id + "/config/")
                var customCommandsJson = {"channels":{"welcome":{},"leave":{},"system":{}}}
                writeJson("servers/" + guild.id + "/config/main.json", customCommandsJson)
                processLeave(member)
            };
        };
    };
});

function processLeave(member) {
    var guild = member.guild
    var configFile = readJson("servers/" + guild.id + "/config/main.json")
    if (typeof(configFile.channels) != "undefined") {
        if (typeof(configFile.channels.leave) != "undefined") {
            var leaveChannelId = configFile.channels.leave
            var leaveChannel = guild.channels.cache.find(channel => channel.id === leaveChannelId)
            leaveChannel.send("Goodbye " + "<@" + member + ">...")
        };
    };
};