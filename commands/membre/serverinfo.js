const moment = require('moment');
const { utc } = require('moment');
const { version: djsversion } = require('discord.js');
const os = require('os')
const ms = require('ms')
const discord = require("discord.js");
const config = require("../../config.json")

const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
module.exports = {
    slash: {
        name:"serverinfo",
        description: "Affiche les informations du serveur",
        options: []
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction) {
               const { guild } = interaction;
 
        const boosts = guild.premiumSubscriptionCounts;
        if (boosts > 1) { s = `boosts` } else { s = `boost` }
 
        const members = guild.members.cache;
        const online = members.filter(m => m.presence?.status === 'online').size;
        const offline = members.filter(m => m.presence?.status === 'offline').size + members.filter(m => m.presence?.status === undefined).size;
  const emojis = guild.emojis.cache.sort((a, b) => b.position - a.position).map(e => e.toString())
  const emojisize = guild.emojis.cache.size
  var emojiList = 0
  if(emojisize > 20) { 
      emojiList = `${emojis.splice(0, 20).join(", ")} **+ ${emojisize - 20} autres**`
  } else {
      emojiList = `${emojis.join(", ")}`
  }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Informations de ${guild.name}`)
            .addField("Créateur du serveur :", `<@${guild.ownerId}>`, true)
            .addField("Membres :", `${guild.memberCount}`, true)
            .addField("Membres en ligne :", `${online}`, true)
            .addField("Membres hors-ligne :", `${offline}`, true)
            .addField("Nombre de bot :", `${guild.members.cache.filter(m => m.user.bot).size}`, true)
            .addField("Date de création du serveur :", `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, true)
            .addField("Nombre de rôle :", `${guild.roles.cache.size}`, true)
            .addField(`Nombre de ${s} :`, `${boosts ?? "0"}`, true)
            .addField("Nombre d'émoji :", `${guild.emojis.cache.size}`, true)
            .addField("liste des émojis :", `${emojiList}`, true)

            .setColor("RANDOM")
            .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
            .setTimestamp();
 
        interaction.reply({ embeds: [embed] })
    }}