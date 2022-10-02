const { Interaction } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')

module.exports = {
    slash: {
        name:"mute",
        description: "Permet de mute un membre",
        default_member_permissions: 268435456,
        options: [
            {
                name: 'membre',
                description: 'Le membre à mute',
                type: 'USER',
                required: true,
            },
{
            name: "temps",
            description: "Ajouter ou retirer un membre",
            type: "INTEGER",
            choices: [
              { name: "60 secondes", value: 60000 },
              { name: "5 minutes", value: 300000 },
              { name: "10 minutes", value: 600000 },
              { name: "30 minutes", value: 1800000 },
              { name: "1 heure", value: 3600000 },
              { name: "5 heures", value: 18000000 },
              { name: "10 heures", value: 36000000 },
              { name: "20 heures", value: 72000000 },
              { name: "1 jour", value: 86400000 },
              { name: "2 jours", value: 172800000 },
              { name: "5 jours", value: 432000000 },
              { name: "7 jours", value: 604800000 },
              { name: "10 jours", value: 864000000 },
              { name: "12 jours", value: 1036800000 },
              { name: "14 jours", value: 1209600000 },
              { name: "16 jours", value: 1209600000 },
              { name: "18 jours", value: 1555200000 },
              { name: "21 jours", value: 1814400000 },
              { name: "24 jours", value: 2073600000 },
              { name: "26 jours", value: 2246400000 },
              { name: "27 jours", value: 2332800000 }
            ],
            required: true
        },
            {
                name: 'raison',
                description: 'La raison du mute',
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
if(interaction.guild.members.cache.get(member.id).isCommunicationDisabled()) {
    const deja = new MessageEmbed()
    .setTitle(`**${config.emoji.non} ERREUR**`)
    .setDescription('Cette personne est déjà muette !')
    .setColor(config.color.err)
    return interaction.reply({embeds: [deja], ephemaral: true })
}

const guild = interaction.guild;
const muteRole = interaction.guild.roles.cache.find(role => role.name === "mute");
  
if (!muteRole) {
    guild.roles.create({
name: 'mute',
color: 'GREY',
reason: 'Rôle pour mute les gens',
permissions: ["VIEW_CHANNEL"]
}) 
.catch(console.error); 
}
member.roles.add(muteRole)
let ms = interaction.options.getInteger("temps")
member.timeout(ms, reason)
const embedsucces = new MessageEmbed()
.setTitle(`**${config.emoji.oui} SUCCÈS**`)
.setDescription(`Vous avez correctement mute ${member.user.tag} pendant ${module.exports.slash.options[1].choices.find((o) => o.value === ms).name}. Pour la raison ${reason}.`)
.setColor(config.color.succes)
 interaction.reply({embeds: [embedsucces]})        

 
    }
}