const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
const moment = require('moment');
module.exports = {
    slash: {
        name:"userinfo",
        description: "Affiche les informations sur le compte de la personne",
        options: [{
                name: 'membre',
                description: 'Le membre à bannir',
                type: 'USER',
                required: false,
            },]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    
    async execute(client, interaction) {
                const member = interaction.options.getMember("membre") || interaction.member
        const activities = member.presence?.activities || []

        const focusActivity = activities.find(x => x.assets)
        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
        .setThumbnail(focusActivity ? `https://cdn.discordapp.com/app-assets/${focusActivity.applicationId}/${focusActivity.assets.largeImage}` : member.user.displayAvatarURL())
        .setDescription(activities.map((x, i) => `**${x.type}**: \`${x.name || "non"} : ${x.details || "non"} : ${x.state || "non"}\``).join("\n"))
        .addField("A rejoin le :", member.joinedAt.toLocaleString(), true)
        .addField("A crée son compte le :", member.user.createdAt.toLocaleString(), true)
        .addField("informations du membre sur le serveur :", [
            `nom d'utilisateur sur ce serveur: \`${member.displayName}\``,
            `Membre en attente: \`${member.pending ? 'oui' : 'non'}\``,
            `Boost : \`${member.premiumSince ? 'oui ' + member.premiumSince.toLocaleString() : 'non'}\``
        ].join("\n"))

        return interaction.reply({ embeds: [embed] })
            
        }};