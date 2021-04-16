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
    if (command == "a") {
        if (args[0]) {
            if (args[0] == "leave-room") {
                if (msg.guild == null) {
                    leaveGameRoom(msg, args)
                } else {
                    msg.channel.send("Error : This command is not availale in servers.\nPlease send it to KB28.")
                };
            };
        } else {
            msg.channel.send("Command Syntax : !a <command>")
        };
    };
});

function leaveGameRoom(msg, args) {
    var playersFile = readJson("./games/among-chat/players.json")
    if (typeof(playersFile.players[msg.author.id].room_id) != "undefined" && playersFile.players[msg.author.id].room_id != "none") {
        var playerId = msg.author.id
        var playerRoomId = playersFile.players[playerId].room_id
        var playersFile = readJson("./games/among-chat/rooms.json")
        Object.keys(gamesRoomsFile.rooms[playerRoomId].players).forEach(currentPlayer => {
            if (typeof(currentPlayer) != "undefined") {
                if (currentPlayer.id == playerId) {
                    delete gamesRoomsFile.rooms[playerRoomId].players[currentPlayer]
                    writeJson("./games/among-chat/rooms.json", gamesRoomsFile)
                    playersFile.players[playerId].room_id = "none"
                    writeJson("./games/among-chat/players.json", playersFile)
                };
            };
        });
    };
};