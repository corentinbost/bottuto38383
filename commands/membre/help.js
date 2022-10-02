const { MessageEmbed, MessageButton,   MessageActionRow, MessageSelectMenu } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
module.exports = {
    slash: {
        name:"help",
        description: "Affiche les commandes du bot",
        options: []
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction, db) {
        const embed = new Discord.MessageEmbed()
        .setTitle('🌴Page d\'aide')
        .setDescription('**`📌Information :`**\n\n**`help`**, **`rank`**, **`ping`**, **`suggestion`**, **`userinfo`**, **`serverinfo`**\n\n**` 👮‍♂️ Modération`**\n**`ban`**, **`kick`**, **`mute`**, **`unmute`**,**`tempban`**, **`clear`**, **`warn`**, **`infraction`**, **`unwarn`**\n\n**`🛡️ Administration :`**\n**`antilink`**, **`antispam`**, **`salon_bienvenue`**, **`suggestion_salon`**, **`sondage_salon`**, **`nuke`**\n\n**`🎉 Giveaway :`**\n**`start`**, **`reroll`**, **`edit`**, **`pause`**,**`unpause`**, **`delete`**, **`end`**')
        .setColor('RANDOM')
        .setTimestamp()
        /*const selectun = new MessageActionRow().addComponents(
            new MessageSelectMenu()
             .setCustomId("Catégorie")
             .setPlaceholder("catégorie")
             .addOptions([
               {
                 label: "Information",
                 description: "dd",
                 value: "info",
               },
               {
                 label: "Utils",
                 description: "c",
                 value: "utils",
               },
               {
                 label: "Modération",
                 description: "v",
                 value: "mod",
               },
               {
                label: "Administration",
                description: "b",
                value: "admin",
              }
             ]),
             new Discord.MessageButton()
      .setURL(`https://discord.gg/X8swyCE2Fe`)
          .setStyle("LINK")
          .setLabel("Serveur Support")
          .setEmoji({ name: "❓" }),
          
             )*/
     
     
             const m = await interaction.reply({ embeds: [embed]}); 
    }}