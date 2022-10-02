const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
module.exports = {
    slash: {
        name:"ping",
        description: "Affiche le ping du bot",
        options: []
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction, db) {

        const startTimeDB = Date.now()

       

            const endTimeDB = Date.now()

            const startTime = Date.now()

            await interaction.reply(`En cours...`).then(async msg => {

                const endTime = Date.now()
                const endTimeDB = Date.now()

                const startTime = Date.now()
    
                const embed = new MessageEmbed()
                .setTitle("PING")
                .setDescription(`API : ${client.ws.ping}ms\nBot : ${endTime - startTime}ms\nLatence de la base de données : ${endTimeDB - startTimeDB}ms`)
                .setColor("RED")    
                try {
                    await interaction.edit({embeds: [embed]})
                } catch (err) {
                    await interaction.editReply({embeds: [embed]})
                }
            })
      
    }}