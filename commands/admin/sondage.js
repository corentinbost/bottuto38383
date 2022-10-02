const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
module.exports = {
    slash: {
        name:"sondage",
        description: "Permet de faire un sondage",
        default_member_permissions: 8,
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
        .setTitle("❓ Faire un sondage ❓")
        .addComponents(suggestion)

        await interaction.showModal(Modal)
            
     

            let response = await interaction.awaitModalSubmit({time: 300000}).then((response) => {

            let sondage = response.fields.getTextInputValue("suggestion")
             response.reply({content: "Le sondage a été envoyé avec succès dans le salon !", ephemeral: true})
            
            db.query(`SELECT*FROM sondage WHERE guildID = '${interaction.guild.id}'`, async (err, req) => {
                const salon = req[0].sondagechan;
                const embed = new Discord.MessageEmbed()
                .setTitle(`❓ NOUVEAU SONDAGE`)
                .setDescription(`Voici le sondage de ${interaction.user.tag} : \n${sondage}`)
                .setColor(config.color.succes)
                .setTimestamp()
                const msg = await client.channels.cache.get(salon).send({embeds: [embed]}).then(msg => {

    
                    msg.react("✅")
                    msg.react("❌")
                   
                       })   


            })
            })
    }}