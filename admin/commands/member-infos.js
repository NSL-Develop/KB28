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
        if (command == "member-infos") {
            if (args[0] && args[1]) {
                var guildId = args[0]
                var memberId = args[1]
                var guild = client.guilds.cache.get(guildId);
                guild.members.cache.each(member => {
                    if (member.id == memberId) {
                        const resultEmbed = new Discord.MessageEmbed()
                            .setTitle(member.user.username + ` Infos`)
                            .addFields(
                                {'name' : 'User','value' : `ID : ` + member.user.username + `\nBot : ` + member.user.bot + `\nDiscriminator : ` + member.user.discriminator + `\nAvatar : ` + member.user.avatar + `\nBot : ` + member.user.bot})
                        msg.channel.send(resultEmbed)
                    };
                });
            } else {
                msg.channel.send("Command Syntax : !member-infos <guild_id> <member_id>")
            };
        };
    };
});