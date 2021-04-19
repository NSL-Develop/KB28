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
        if (msg.guild != null) {
            if (args[0]) {
                if (!isNaN(parseInt(args[0]))) {
                    var tryNumber = parseInt(args[0])
                    if (existsFile("servers/" + msg.guild.id + "/games/bingo.json")) {
                        var bingoFile = readJson("servers/" + msg.guild.id + "/games/bingo.json")
                        if (typeof(bingoFile.main) != "undefined") {
                            var bingoNumber = parseInt(bingoFile.main.number)
                            if (tryNumber < bingoNumber) {
                                msg.channel.send("The mystery number is greater than " + tryNumber)
                            } else if (tryNumber > bingoNumber) {
                                msg.channel.send("The mystery number is less than " + tryNumber)
                            } else if (tryNumber == bingoNumber) {
                                delete bingoFile.main
                                writeJson("servers/" + msg.guild.id + "/games/bingo.json", bingoFile)
                                const winEmbed = new Discord.MessageEmbed()
                                    .setTitle(`You win !`)
                                    .addFields(
                                        {'name' : 'Winner','value' : `<@${msg.author.id}>`},
                                        {'name' : 'Infos','value' : `The mystery number was ${bingoNumber}`})
                                msg.channel.send(winEmbed)
                            };
                        } else {
                            msg.channel.send("No bingo has been created !")
                        };
                    } else {
                        msg.channel.send("No bingo has been created !")
                    };
                };
            };
        };
    };
});