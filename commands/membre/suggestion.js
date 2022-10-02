const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
module.exports = {
    slash: {
        name:"suggestion",
        description: "Affiche le ping du bot",
        options: []
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction, db, config) {
        let suggestion = new Discord.MessageActionRow().addComponents(new Discord.TextInputComponent()
        .setCustomId("suggestion")
        .setLabel("Quelle est la suggestion à proposer ?")
        .setRequired(true)
        .setPlaceholder("La suggestion est...")
        .setStyle("PARAGRAPH"))    
           
                    let Modal = new Discord.Modal()
        .setCustomId("sugg")
        .setTitle("💡 Faire une suggestion 💡")
        .addComponents(suggestion)

        await interaction.showModal(Modal)
            
     

            let response = await interaction.awaitModalSubmit({time: 300000}).then((response) => {

            let suggestion = response.fields.getTextInputValue("suggestion")
             response.reply({content: "La suggestion a été envoyé avec succès dans le salon !", ephemeral: true})
            
            db.query(`SELECT*FROM suggestion WHERE guildID = '${interaction.guild.id}'`, async (err, req) => {
                const salon = req[0].suggestionchan;
                const embed = new Discord.MessageEmbed()
                .setTitle(`💡 NOUVELLE SUGGESTION`)
                .setDescription(`Voici la suggestion de ${interaction.user.tag} : \n${suggestion}`)
                .setColor(config.color.succes)
                .setTimestamp()
                const msg = await client.channels.cache.get(salon).send({embeds: [embed]}).then(msg => {

    
                    msg.react("✅")
                    msg.react("❌")
                })


            })
            })
    }}