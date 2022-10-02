const { Interaction } = require('discord.js')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')
const { Permissions } = require('discord.js') 
module.exports = {
    slash: {
        name:"ban",
        description: "Permet de bannir un membre",
        default_member_permissions: 4,
        options: [
            {
                name: 'membre',
                description: 'Le membre à bannir',
                type: 'USER',
                required: true,
            },

            {
                name: 'raison',
                description: 'La raison du bannissement',
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
        
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
                    const noperm = new MessageEmbed()
            .setTitle(`**${config.emoji.non} ERREUR**`)
       .setDescription('Vous n\'avez pas les permissions requises pour effectuer cette commande ! Il vous fait les permissions **`BANNIR DES MEMBRES`**')
       .setColor(config.color.err)
          return interaction.reply({embeds: [noperm], ephemeral: true})

                    }
                    if(!member) {
                        const nomembre = new MessageEmbed()
                            .setTitle(`**${config.emoji.non} ERREUR**`)
                            .setDescription('Je ne trouve pas ce membre')
                            .setColor(config.color.err)
                            return interaction.reply({embeds: [nomembre], ephemeral: true})
                }
        if(member.user.id === interaction.user.id) {
            const youare = new MessageEmbed()
            	.setTitle(`**${config.emoji.non} ERREUR**`)
                .setDescription('Vous ne pouvez pas vous bannir !')
                .setColor(config.color.err)
                return interaction.reply({embeds: [youare], ephemeral: true})
    }
        
        
        if(member.user.id === interaction.guild.ownerId) {
            const isowner = new MessageEmbed()
        .setTitle(`**${config.emoji.non} ERREUR**`)
        .setDescription(`Tu ne peux pas bannir le propriétaire du serveur !`)
        .setColor(config.color.err)
        return interaction.reply({embeds: [isowner], ephemeral: true})
        }
        if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) { 
            const haut = new MessageEmbed()
	        .setTitle(`**${config.emoji.non} ERREUR**`)
            .setDescription('Vous ne pouvez pas bannir un membre qui à un rôle égal ou spérieur au votre !')
            .setColor(config.color.err)
            return interaction.reply({embeds: [haut], ephemaral: true })
        }

        if(member.bannable) {
        member?.ban({reason: reason})
         const embedsucces = new MessageEmbed()
	        .setTitle(`**${config.emoji.oui} SUCCÈS**`)
            .setDescription(`Vous avez banni ${member.user.tag} définitivement, il a reçus cet sanction pour la raison : ${reason}`)
            .setColor(config.color.succes)
             interaction.reply({embeds: [embedsucces]})
            
        } else {
             const nobannable = new MessageEmbed()
        .setTitle(`**${config.emoji.non} ERREUR**`)
        .setDescription(`Désolé, je ne peux pas bannir ce membre, verifiez que mon rôle soit au dessus de lui !`)
        .setColor(config.color.err)
        .setTimestamp()
        return interaction.reply({embeds: [nobannable], ephemaral: true})

       }}}