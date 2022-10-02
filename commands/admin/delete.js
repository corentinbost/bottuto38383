const { Interaction } = require('discord.js')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')
const ms = require("ms")
const { Permissions } = require('discord.js') 
module.exports = {
    slash: {
        name:"delete",
        description: "Permet de retirer un giveaways",
        default_member_permissions: 8192,
        options: [
           {
                name: 'message_id',
                description: 'L\'id du message du giveaways',
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
        client.giveawaysManager
            .delete(messageId)
            .then(() => {
                const embed = new Discord.MessageEmbed()
                .setTitle(`${config.emoji.oui} SUCCÈS`)
                .setColor(`${config.color.succes}`)
                .setDescription(`Le giveaways a été effacé avec succès !`)
                .setTimestamp()
                return interaction.reply({embeds: [embed], ephemeral: true})
            })
            .catch((err) => {
                const errr = new Discord.MessageEmbed()
                .setTitle(`${config.emoji.non} ERREUR`)
                .setColor(`${config.color.err}`)
                .setDescription(`Une erreur est survenu, merci de réessayer \`${err}\` !`)
                .setTimestamp()
                return interaction.reply({embeds: [errr], ephemeral: true})
            });
    }}