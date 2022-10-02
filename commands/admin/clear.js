const { Interaction } = require('discord.js')
const Discord = require('discord.js')
const { Bot } = require('../../structure/index.js')
const config = require('../../config.json')
module.exports = {
    slash: {
        name:"clear",
        description: "Permet d'effacer un nombres de messages.",
        default_member_permissions: 8192,
        options: [
            {
                name: 'number',
                description: "Le nombre de message à supprimer",
      		    type: "INTEGER",
                required: true
            },
        ]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction) {
const NoPermEmbed = new Discord.MessageEmbed()
.setColor(config.color.err)
.setTitle(`${config.emoji.non} ERREUR`)
    .setDescription("Tu n'as pas la permission de faire cette commande. Il te faut la pemission : `GERER LES MESSAGES`");
    const number = interaction.options.getInteger('number')
    const centzero = new Discord.MessageEmbed()
    .setTitle(`${config.emoji.non} ERREUR`)
    .setColor(config.color.err)
    .setDescription('Le nombre de message à supprimer doit être entre **`0**` et `**100`**')
    .setFooter({text: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    if (number < 1 || number > 100) return interaction.reply({embeds: [centzero]})
    const { size } = await interaction.channel.bulkDelete(number, true).catch(async err => {
        if(err) return interaction.reply({content: "Les messages datent de plus de 14 jours !"})})
    const embed = new Discord.MessageEmbed()
    .setTitle(`${config.emoji.oui} SUCCÈS`)
    .setColor(config.color.succes)
    .setDescription('J\'ai supprimé ' + size + ' messages !')
    .setFooter({text: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    interaction.reply({embeds: [embed]})
    setTimeout(() => interaction.deleteReply().catch(), 5000)

}};
