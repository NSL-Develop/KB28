const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.setMaxListeners(0);

client.on('ready', () => {
    console.log(`Login : ${client.user.tag}`);
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

client.login(readJson("config.json").token);