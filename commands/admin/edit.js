const { Interaction } = require('discord.js')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')
const ms = require("ms")
const { Permissions } = require('discord.js') 
module.exports = {
    slash: {
        name:"edit",
        description: "Permet de modifier un giveaway",
        default_member_permissions: 8192,
        options: [
           {
                name: 'message_id',
                description: 'L\'id du message du giveaways',
                type: 'STRING',
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
        
const messageId = interaction.options.getString('message_id');
const duration = interaction.options.getString('duration');
        const winnerCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        client.giveawaysManager
            .edit(messageId, {
                addTime: duration,
                newWinnerCount: winnerCount,
                newPrize: prize
            })
            .then(() => {
                const embed = new Discord.MessageEmbed()
                .setTitle(`${config.emoji.oui} SUCCÈS`)
                .setColor(`${config.color.succes}`)
                .setDescription(`Le giveaways à bien été modifié !`)
                .setTimestamp()
                return interaction.reply({embeds: [embed], ephemeral: true})
            })
            .catch((err) => {
                const errr = new Discord.MessageEmbed()
                .setTitle(`${config.emoji.non} ERREUR`)
                .setColor(`${config.color.err}`)
                .setDescription(`Une erreur est survenu, merci de réessayer \`${err}\` !`)
                .setTimestamp()
                return interaction.reply({embeds: [errr], ephemeral: true})            });
        }
    }