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
            if (args[0] == "join-room") {
                if (msg.guild == null) {
                    joinGameRoom(msg, args)
                } else {
                    msg.channel.send("Error : This command is not availale in servers.\nPlease send it to KB28.")
                };
            };
        } else {
            msg.channel.send("Command Syntax : !a <command>")
        };
    };
});

function joinGameRoom(msg, args) {
    var gamesRoomsFile = readJson("./games/among-chat/rooms.json")
    if (args[1]) {
        var joinRoomId = args[1]
        var playersFile = readJson("./games/among-chat/players.json")
        if (typeof(playersFile.players[msg.author.id].room_id) == "undefined" || playersFile.players[msg.author.id].room_id == "none") {
            if (typeof(gamesRoomsFile.rooms[joinRoomId]) != "undefined") {
                if (typeof(gamesRoomsFile.rooms[joinRoomId].players) != "undefined") {
                    var playersCount = 0
                    Object.keys(gamesRoomsFile.rooms[joinRoomId].players).forEach(currentPlayer => {
                        if (typeof(currentPlayer) != "undefined") {
                            if (msg.author.id != gamesRoomsFile.rooms[joinRoomId].players[playersCount].id) {
                                playersCount = playersCount + 1
                            } else {
                                msg.channel.send("Error : You are already in this game room.")
                            };
                        };
                    });
                    gamesRoomsFile.rooms[joinRoomId].players[playersCount] = {"id":msg.author.id,"tag":msg.author.tag,"impostor":"false","killed":"false","location":"lobby"}
                    writeJson("./games/among-chat/rooms.json", gamesRoomsFile)
                    msg.channel.send("Connected to game room : " + joinRoomId)
                    var playersFile = readJson("./games/among-chat/players.json")
                    playersFile.players[msg.author.id] = {"room_id":joinRoomId}
                    writeJson("./games/among-chat/players.json", playersFile)
                    Object.keys(gamesRoomsFile.rooms[joinRoomId].players).forEach(currentPlayer => {
                        if (typeof(currentPlayer) != "undefined") {
                            if (msg.author.id != gamesRoomsFile.rooms[joinRoomId].players[currentPlayer].id) {
                                client.users.fetch(gamesRoomsFile.rooms[joinRoomId].players[currentPlayer].id).then((user) => {
                                    user.send(msg.author.tag + " has joined the game.");
                                });
                            };
                        };
                    });
                };
            } else {
                msg.channel.send("Error : This game room is not created.\nSend !a create-room to create a new room.")
            };
        } else {
            msg.channel.send("Command Syntax : !a join-room <room_id>")
        };
    };
};