const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.setMaxListeners(0);

client.on('ready', () => {
    console.log(`Login : ${client.user.tag}`);
	setInterval(() => {
		var presenceFile = readJson("./admin/commands/presence.json")
		var presenceType = presenceFile.type
		if (presenceType === "STREAMING") {
			if (presenceFile.url != {}) {
				var presenceURL = presenceFile.url
				var presenceGame = presenceFile.game
				client.user.setActivity(presenceGame, {type: presenceType, url: presenceURL})
			};
		}else {
			var presenceGame = presenceFile.game
			client.user.setActivity(presenceGame, {type: presenceType})
		};
	}, 1000);
});

const readJson = (file) => {
	return JSON.parse(fs.readFileSync(__dirname + "/" + file));
};
const writeJson = (file, json) => {
	fs.writeFileSync(__dirname + "/" + file, JSON.stringify(json));
};
const existsFile = (file) => {
	return fs.existsSync(__dirname + "/" + file);
};
const makeDir = (path) => {
	return fs.mkdirSync(__dirname + "/" + path);
};

client.on('message', msg => {
	if (msg.guild != null) {
		if (!existsFile("servers/" + msg.guild.id + "/infos/main.json")) {
			if (!existsFile("servers/" + msg.guild.id + "/")) {
				makeDir("servers/" + msg.guild.id + "/")
				makeDir("servers/" + msg.guild.id + "/infos/")
				var guildInfosJson = {"guild":msg.guild}
				writeJson("servers/" + msg.guild.id + "/infos/main.json", guildInfosJson)
			} else {
				if (!existsFile("servers/" + msg.guild.id + "/infos/")) {
					makeDir("servers/" + msg.guild.id + "/infos/")
					var guildInfosJson = {"guild":msg.guild}
					writeJson("servers/" + msg.guild.id + "/infos/main.json", guildInfosJson)
				};
			};
		};
	};
});

exports.client = client
exports.prefix = "!"
exports.readJson = readJson
exports.writeJson = writeJson
exports.existsFile = existsFile
exports.makeDir = makeDir

const helpCmd = require("./commands/help.js");

const banCmd = require("./commands/moderation/ban.js");
const kickCmd = require("./commands/moderation/kick.js");
const muteCmd = require("./commands/moderation/mute.js");

const displayAvatarCmd = require("./commands/members/display-avatar.js");

const setWelcomeChannelCmd = require("./commands/server/set-welcome-channel.js");
const setLeaveChannelCmd = require("./commands/server/set-leave-channel.js");
const serverEventsManager = require("./commands/server/server-events-manager.js");

const customCommandsManager = require("./commands/server/custom-commands-manager.js");
const createCommandCmd = require("./commands/server/create-command.js");
const deleteCommandCmd = require("./commands/server/delete-command.js");

const guildInfosCmd = require("./admin/commands/guild_infos.js");
const memberInfosCmd = require("./admin/commands/member-infos.js");
const updatePresenceCmd = require("./admin/commands/update-presence.js");

const amongChatCreateRoomCmd = require("./commands/games/among-chat/create-room.js");

client.login(readJson("config.json").token);