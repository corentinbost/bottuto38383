const { Interaction } = require('discord.js')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')
const ms = require("ms")
const { Permissions } = require('discord.js') 
module.exports = {
    slash: {
        name:"start",
        description: "Permet de lancer un giveaways",
        default_member_permissions: 8192,
        options: [
            {
                name: 'salon',
                description: 'Le salon où sera le giveaways.',
			    type: "CHANNEL",
                channelTypes: ["GUILD_TEXT"],                
                required: true,
            },
            {
                name: 'duration',
                description: 'La durée du giveaway.',
			    type: "STRING",
                required: true,
            },
            {
                name: 'winners',
                description: 'Le nombre de gagnant(e)(s)',
                type: 'INTEGER',
                required: true,
        },
            {
                name: 'prize',
                description: 'Le prix du giveaways',
                type: 'STRING',
                required: true,
        },
        
    ]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction, db) {
        const channel = interaction.options.getChannel('salon')
        const duration = interaction.options.getString('duration');
        const winnerCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');

        client.giveawaysManager
        .start(channel, {
                duration: ms(duration),
                winnerCount,
                prize,
                lastChance: {
                    enabled: true,
                    content: '⚠️ **DERNIÈRE CHANCE POUR PARTICIPER !** ⚠️',
                    threshold: 10_000,
                    embedColor: '#FF0000'
                },
                pauseOptions: {
                    isPaused: true,
                    content: '⚠️ **CE GIVEAWAY EST EN PAUSE !** ⚠️',
                    unpauseAfter: null,
                    embedColor: '#FFFF00',
                    infiniteDurationText: '`PAUSE`'
                }
            })
            .then((data) => {
            });
            const embed = new Discord.MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setColor(`${config.color.succes}`)
            .setDescription(`Le giveaway a été lancé avec succès dans le salon ${channel}`)
            .setTimestamp()
            return interaction.reply({embeds: [embed], ephemeral: true})
    
    }
}