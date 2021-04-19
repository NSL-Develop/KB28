const Discord = require('discord.js');
const index = require('../../../index.js');
const client = index.client

const prefix = index.prefix
const readJson = index.readJson
const writeJson = index.writeJson
const existsFile = index.existsFile
const makeDir = index.makeDir

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
};

client.on('message', msg => {
    const prefix = index.prefix
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command == "b") {
        if (msg.guild != null) {
            if (msg.member.hasPermission("MANAGE_GUILD")) {
                if (args[0]) {
                    if (args[0] == "create") {
                        if (args[1] && args[2] && args[1] < args[2]) {
                            var minNumber = args[1]
                            var maxNumber = args[2]
                            createProcess(msg, args, minNumber, maxNumber)
                        }  else {
                            msg.channel.send("Command Syntax : !b create <min> <max>")
                        };
                    };
                } else {
                    msg.channel.send("Command Syntax : !b <command>")
                };
            } else {
                msg.channel.send("You do not have permission to create a bingo !")
            };
        };
    };
});

function createProcess(msg, args, minNumber, maxNumber) {
    if (existsFile("servers/" + msg.guild.id + "/games/bingo/main.json")) {
        bingoCreate(msg, args, minNumber, maxNumber)
    } else {
        if (!existsFile("servers/" + msg.guild.id + "/")) {
            makeDir("servers/" + msg.guild.id + "/")
            makeDir("servers/" + msg.guild.id + "/games/")
            var bingoJson = {}
            writeJson("servers/" + msg.guild.id + "/games/bingo/main.json", bingoJson)
            bingoCreate(msg, args, minNumber, maxNumber)
        } else {
            if (!existsFile("servers/" + msg.guild.id + "/games/")) {
                makeDir("servers/" + msg.guild.id + "/games/")
                var bingoJson = {}
                writeJson("servers/" + msg.guild.id + "/games/bingo/main.json", bingoJson)
                bingoCreate(msg, args, minNumber, maxNumber)
            };
        };
    };
};

function bingoCreate(msg, args, minNumber, maxNumber) {
    var bingoFile = readJson("servers/" + msg.guild.id + "/games/bingo/main.json")
    var bingoNumber = getRandomInt(minNumber, maxNumber)
    bingoFile.main = {"creator":msg.author.tag,"number":bingoNumber,"min":minNumber,"max":maxNumber,"trying_count":"0"}
    writeJson("servers/" + msg.guild.id + "/games/bingo/main.json", bingoFile)
    const resultEmbed = new Discord.MessageEmbed()
        .setTitle(`Bingo Created`)
        .addFields(
            {'name' : 'Creator','value' : `<@${msg.author.id}>`},
            {'name' : 'Infos','value' : `Min Number : ${minNumber}\nMax Number : ${maxNumber}`})
    msg.channel.send(resultEmbed)
};