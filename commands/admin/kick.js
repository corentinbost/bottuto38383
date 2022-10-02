const { Interaction } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')

module.exports = {
    slash: {
        name:"kick",
        description: "Permet d'expulser un membre",
        default_member_permissions: 2,
        options: [
            {
                name: 'membre',
                description: 'Le membre à kick',
                type: 'USER',
                required: true,
            },

            {
                name: 'raison',
                description: 'La raison du kick',
                type: 'STRING',
                required: false,
        }
        ]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction) {

        const member = interaction.options.getMember("membre")
        const reason = interaction.options.getString("raison") || "Aucune raison fourni."
        
        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
                    const noperm = new MessageEmbed()
            .setTitle(`**${config.emoji.non} ERREUR**`)
       .setDescription('Vous n\'avez pas les permissions requises pour effectuer cette commande ! Il vous fait les permissions **`EXPULSER DES MEMBRES`**')
       .setColor(config.color.err)
          return interaction.reply({embeds: [noperm], ephemeral: true})

                    }
        if(member.user.id === interaction.user.id) {
            const youare = new MessageEmbed()
            	.setTitle(`**${config.emoji.non} ERREUR**`)
                .setDescription('Vous ne pouvez pas vous exclure !')
                .setColor(config.color.err)
                return interaction.reply({embeds: [youare], ephemeral: true})
    }
        
        
        if(member.user.id === interaction.guild.ownerId) {
            const isowner = new MessageEmbed()
        .setTitle(`**${config.emoji.non} ERREUR**`)
        .setDescription(`Tu ne peux pas expulser le propriétaire du serveur !`)
        .setColor(config.color.err)
        return interaction.reply({embeds: [isowner], ephemeral: true})
        }
        if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) { 
            const haut = new MessageEmbed()
	        .setTitle(`**${config.emoji.non} ERREUR**`)
            .setDescription('Vous ne pouvez pas expulser un membre qui à un rôle égal ou spérieur au votre !')
            .setColor(config.color.err)
            return interaction.reply({embeds: [haut], ephemaral: true })
        }

        if(member.kickable) {
        member?.kick(reason)
        const embedsucces = new MessageEmbed()
        .setTitle(`**${config.emoji.oui} SUCCÈS**`)
        .setDescription(`Vous avez kick ${member.user.tag}. Vous l'avez kick pour la raison > ${reason}`)
        .setColor(config.color.succes)
         interaction.reply({embeds: [embedsucces]})        
       
         } else {
             const nobannable = new MessageEmbed()
        .setTitle(`**${config.emoji.non} ERREUR**`)
        .setDescription(`Désolé, je ne peux pas expulser ce membre, verifiez que mon rôle soit au dessus de lui !`)
        .setColor(config.color.err)
        .setTimestamp()
        return interaction.reply({embeds: [nobannable], ephemaral: true})
        }
    }
}