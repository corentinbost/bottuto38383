const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
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
    slash: {
        name: "infractions",
        description: "Permet de voir la liste des avertissements d'un membre.",
        default_member_permissions: 8192,
        options: [{
            name: 'membre',
            description: 'Le membre a dont vous voulez voir les avertissement.',
            type: "USER",
            required: true,
        }]
    },
    /**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */// check discord
     async execute(client, interaction) {
if(!interaction.member.permissions.has('BAN_MEMBERS')) {
      const mop = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`**${config.non} ERREUR**`)
      .setDescription('Vous n\avez pas les permissions requises pour effectuer cette action !')
      return interaction.reply({embeds: [mop]})
  }
  
 
  const InfractionUser = interaction.options.getMember("membre")
   if(!InfractionUser) {
      const membre = new Discord.MessageEmbed()
      .setTitle(`**${config.non} ERREUR**`)
      .setDescription('Veuillez mentionner un membre !')
      .setColor("#FF0000")
      .setTimestamp()
      return interaction.reply({embeds: [membre]})
  }
	
   
    db.query(`SELECT * FROM infraction WHERE userID = ${InfractionUser.id} AND guildID = ${interaction.guild.id}`, async(err, req) => {

        if(!req.length){
		const pasdewarn = new Discord.MessageEmbed()
        .setTitle(`${config.non} **ERREUR**`)
        .setDescription('Cette personne n\'a aucune infraction')
        return interaction.reply({embeds: [pasdewarn]})
           
        }else{
let Nombrewarn = 0
        let infractionEmbed = new Discord.MessageEmbed()
        req.forEach(element => {
		Nombrewarn += 1

            infractionEmbed.addField(`Avertissement  ${Nombrewarn}/${req.length}:`, `**Id :** ${element.id}\n**Pseudo :** ${element.pseudo}\n**Staff :** ${element.staff}\n**Raison :** ${element.warnraison}`)
        
        });
   
    
        infractionEmbed.setColor(config.color.succes)
        infractionEmbed.setTitle(`Infractions de ${InfractionUser.user.tag}\nNombre de warn(s) : ${req.length}`)                   
        infractionEmbed.setTimestamp()
    interaction.reply({embeds: [infractionEmbed]})
}
    })
 
}}


