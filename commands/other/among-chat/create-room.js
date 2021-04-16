const Discord = require('discord.js');
const index = require('../../../index.js');
const client = index.client

const prefix = index.prefix
const readJson = index.readJson
const writeJson = index.writeJson
const existsFile = index.existsFile
const makeDir = index.makeDir

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

client.on('message', msg => {
    const prefix = index.prefix
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command == "a") {
        if (args[0]) {
            if (args[0] == "create-room") {
                createGameRoom(msg, args)
            };
        } else {
            msg.channel.send("Command Syntax : !a <command>")
        };
    };
});

function createGameRoom(msg, args) {
    var gamesRoomsFile = readJson("./games/among-chat/rooms.json")
    var newRoomId = getRandomInt(100000, 999999)
    while (typeof(gamesRoomsFile.rooms[newRoomId]) != "undefined") {
        newRoomId = getRandomInt(100000, 999999)
    };
    var playersFile = readJson("./games/among-chat/players.json")
    if (typeof(playersFile.players[msg.author.id].room_id) == "undefined" || playersFile.players[msg.author.id].room_id == "none") {
        var newRoomContent = {"players":{"0":{"id":msg.author.id,"tag":msg.author.tag,"impostor":"false","killed":"false","location":"lobby"}},"config":{"started":"false","min_players":"4","max_players":"10"}}
        gamesRoomsFile.rooms[newRoomId] = newRoomContent
        writeJson("./games/among-chat/rooms.json", gamesRoomsFile)
        var playersFile = readJson("./games/among-chat/players.json")
        playersFile.players[msg.author.id] = {"room_id":newRoomId}
        writeJson("./games/among-chat/players.json", playersFile)
        msg.channel.send("A new game room has been created. You can now use this chat to interact.\n\nGame ID : " + newRoomId)
    } else {
        msg.channel.send("You are already in a game room !\nSend !a leave-room to leave.")
    };
};