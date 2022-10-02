const {Client} = require('discord.js')
const Discord = require('discord.js')
const {readdirSync} = require('fs')
const interactionCreate = require('../events/client/interactionCreate')
const config = require("../config.json")

exports.Bot = class Bot extends Client {
    constructor(...args) {
        super(...args)
        this.commands = new Map()
        this.events = new Map()
        this.aliases = new Map()
        this.config = require('../config.json')
        void this.init(this)
        this.function = {
            createID: require("../Fonctions/createID")
        }
    }
    

    init(client) {
        client.loadCmds()
        client.loadEvts()
        client.login(client.config.token)
        const { GiveawaysManager } = require('discord-giveaways');
        const manager = new GiveawaysManager(client, {
            storage: '../giveaways.json',
            default: {
                botsCanWin: false,
                embedColor: '#0dff00',
                embedColorEnd: '#000000',
                reaction: '🎉'
            }

        });
        // We now have a giveawaysManager property to access the manager everywhere!
        client.giveawaysManager = manager;
    }

    loadCmds() {
        const dirFirst = readdirSync('./commands')
        for (const dirSecond of dirFirst) {
            const FileCommand = readdirSync(`./commands/${dirSecond}`)
            for (const commandFile of FileCommand) {
                const command = require(`../commands/${dirSecond}/${commandFile}`)
                this.commands.set(command.slash.name, command)
            }
        }
    }

    loadEvts() {
        const dirFirst = readdirSync(`./events`)
        for (const dirSecond of dirFirst) {
            const FileEvent = readdirSync(`./events/${dirSecond}`)
            for (const eventFile of FileEvent) {
                const event = require(`../events/${dirSecond}/${eventFile}`)
                this.on(event.name,(...rest) => event.execute(this, ...rest))
            }
        }

    }
   
}
