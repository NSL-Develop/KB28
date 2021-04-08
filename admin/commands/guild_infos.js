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
        if (command == "guild-infos") {
            if (args[0]) {
                var guildId = args[0]
                if (existsFile("servers/" + guildId + "/infos/main.json")) {
                    var guildInfosFile = readJson("servers/" + guildId + "/infos/main.json")
                    const resultEmbed = new Discord.MessageEmbed()
                        .setTitle(guildInfosFile.guild.name + ` Infos`)
                        .addFields(
                            {'name' : 'Members','value' : guildInfosFile.guild.members},
                            {'name' : 'Channels','value' : guildInfosFile.guild.channels},
                            {'name' : 'Roles','value' : guildInfosFile.guild.roles},
                            {'name' : 'Other','value' : "Deleted : " + guildInfosFile.guild.deleted + "\nID : " + guildInfosFile.guild.id + "\nShard ID : " + guildInfosFile.guild.shardID + "\nIcon : " + guildInfosFile.guild.icon + "\nSplash : " + guildInfosFile.guild.splash + "\nDiscovery Splash : " + guildInfosFile.guild.discoverySplash + "\nRegion : " + guildInfosFile.guild.region + "\nMember Count : " + guildInfosFile.guild.memberCount})
                    msg.channel.send(resultEmbed)
                } else {
                    msg.channel.send("Error : The bot has not joined this server.")
                };
            } else {
                msg.channel.send("Command Syntax : !guild-infos <id>")
            };
        };
    };
});