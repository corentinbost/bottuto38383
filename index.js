const config = require('./config.json')
const { Bot } = require('./structure/index.js')
const { Client, Collection, Intents } = require("discord.js");
const {readdirSync} = require('fs')


module.exports = Bot
new Bot({
    intents: 32767
})
