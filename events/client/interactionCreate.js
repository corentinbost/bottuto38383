const { Interaction } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const config = require('../../config.json')
const mysql = require('mysql2')
 let sql
         const db = mysql.createConnection({
      host: (config.host),
      password: (config.password),
      user: (config.user),
      database: (config.database)
});
module.exports = {

    name: "interactionCreate",
/**
 * @param {Bot} client
 * @param {Interaction} interaction

 */

    async execute(client, interaction) {

        if(interaction.isCommand()) {
        
            const cmd = client.commands.get(interaction.commandName)

        if (cmd) {

        cmd.execute(client, interaction, db, config)

            }

        }
        if(interaction.customId === 'info') {
            const embed = new Discord.MessageEmbed()
        .setDescription('Voici la liste des commandes d\'information : \n`**help**`\nSert à voir la liste de des commandes.\n\n`**ping**`\nSert à voir la latence du bot.\n\n`**rank**`\nSert à voir son niveau ou son experience ou celle de quelqu\'un.\n\n`**suggestion**`\nSert à faire une suggestion.\n\n`**userinfo**`\nSert à voir ses informationd discord ou celle de quelqu\'un.\n\n`**serverinfo**`\nSert à voir les informations du serveur.')
        .setTitle('🌴Page d\'aide d\'information')
        .setColor('RANDOM')
        .setTimestamp()
        const selectun = new MessageActionRow().addComponents(
            new MessageSelectMenu()
             .setCustomId("🌴 Catégorie de commandes")
             .setPlaceholder("Selectionnez une catégorie")
             .addOptions([
               {
                 label: "Information",
                 description: "Voir la liste des commandes d'information",
                 value: "info",
               },
               {
                 label: "Utils",
                 description: "Voir la liste des commandes utils",
                 value: "utils",
               },
               {
                 label: "Modération",
                 description: "Voir la liste des commandes de modération",
                 value: "mod",
               },
               {
                label: "Administration",
                description: "Voir la liste des commandes d'administration",
                value: "admin",
              }
             ]),
             new Discord.MessageButton()
      .setURL(`https://discord.gg/X8swyCE2Fe`)
          .setStyle("LINK")
          .setLabel("Serveur Support")
          .setEmoji({ name: "❓" }),
          
             )
        interaction.update({embeds: [embed], components: [selectun]})
        }
    }
}