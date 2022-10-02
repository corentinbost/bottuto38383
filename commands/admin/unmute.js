const { Interaction } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')

module.exports = {
    slash: {
        name:"unmute",
        description: "Permet de mute un membre",
        default_member_permissions: 268435456,
        options: [
            {
                name: 'membre',
                description: 'Le membre à unmute',
                type: 'USER',
                required: true,
            },

        
        ]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction) {

        const member = interaction.options.getMember("membre")
        const reason = interaction.options.getString("raison") || "Aucune raison fourni."

        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            const noperm = new MessageEmbed()
    .setTitle(`**${config.emoji.non} ERREUR**`)
.setDescription('Vous n\'avez pas les permissions requises pour effectuer cette commande ! Il vous fait les permissions **`GÉRER LES RÔLES`**')
.setColor(config.color.err)
  return interaction.reply({embeds: [noperm], ephemeral: true})

            }
if(member.user.id === interaction.user.id) {
    const youare = new MessageEmbed()
        .setTitle(`**${config.emoji.non} ERREUR**`)
        .setDescription('Vous ne pouvez pas vous mute !')
        .setColor(config.color.err)
        return interaction.reply({embeds: [youare], ephemeral: true})
}


if(member.user.id === interaction.guild.ownerId) {
    const isowner = new MessageEmbed()
.setTitle(`**${config.emoji.non} ERREUR**`)
.setDescription(`Vous ne pouvez pas mute le propriétaire du serveur !`)
.setColor(config.color.err)
return interaction.reply({embeds: [isowner], ephemeral: true})
}
if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) { 
    const haut = new MessageEmbed()
    .setTitle(`**${config.emoji.non} ERREUR**`)
    .setDescription('Vous ne pouvez pas mute un membre qui à un rôle égal ou spérieur au votre !')
    .setColor(config.color.err)
    return interaction.reply({embeds: [haut], ephemaral: true })
}

const guild = interaction.guild;
const muteRole = interaction.guild.roles.cache.find(role => role.name === "mute");
const mut = interaction.guild.roles.cache.has(muteRole)
if(!interaction.guild.members.cache.get(member.id).isCommunicationDisabled()) {
    const embedpns = new MessageEmbed()
.setTitle(`**${config.emoji.non} ERREUR**`)
.setDescription(`${member.user.tag} n'est pas mute !`)
.setColor(config.color.err)
 return interaction.reply({embeds: [embedpns]}) 
}
member.timeout(null)
const embedsucces = new MessageEmbed()
.setTitle(`**${config.emoji.oui} SUCCÈS**`)
.setDescription(`${member.user.tag} a été unmute avec succès !`)
.setColor(config.color.succes)
 interaction.reply({embeds: [embedsucces]})        

 
    }
}