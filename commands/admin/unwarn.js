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
        name: "unwarn",
        description: "Permet d'enelver un avertissement un membre.",
        default_member_permissions: 8192,
        options: [{
           name: 'membre',
            description: 'Le membre a avertir.',
            type: "USER",
            required: true,
        },
    {
        name: 'id',
            description: 'L\'id du warn. Pour le connaître faites la commande /infraction.',
            type: "INTEGER",
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
    
    
  const warne = interaction.options.getMember("membre")
  

    let ID = interaction.options.getInteger("id");
   
db.query(`SELECT * FROM infraction WHERE userID = ${warne.id} AND guildID = ${interaction.guild.id}`, async(err, req) => {
    const NombreReq = req.length
        if(!req.length){
            let infractionEmbedNon = new Discord.MessageEmbed()
                   .setColor('#FF0000')
            infractionEmbedNon.setTitle(`Cette personne ne possède aucun avertissement`)
            interaction.reply({embeds: [infractionEmbedNon]})
         }else{
             
             req.forEach(element => {
               
             })
             
              if(req[0].id){
                     db.query(`DELETE FROM infraction WHERE id = ${ID}`)
            
                     
           db.query(`SELECT * FROM infraction WHERE userID = ${warne.id} AND guildID = ${interaction.guild.id}`, async(err, req) => {
            if(NombreReq > req.length){
                let warn2Embed1 = new Discord.MessageEmbed()
    .setColor('#00FF00')
    .setTitle(`${config.emoji.oui} Avertissement supprimé`)
    .setDescription(`${interaction.user.tag} vient d'enlever un avertissemet à ${warne}`)
        .setFooter({text:'Avertissement supprimé ', IconURL: interaction.user.displayAvatarURL()})
    .setTimestamp()
   return interaction.reply({embeds: [warn2Embed1]})
            }else{
               let warn2Embed2 = new Discord.MessageEmbed()
        .setTitle(`${config.non} Erreur Avertissement Non supprimé`)
        .setColor("#FF0000")
        .setDescription(`Je suis désolé je n'ai pas réussi a enlever le warn`)
        .setFooter({text:'Avertissement Non supprimé ', iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp()
        interaction.reply({embeds: [warn2Embed2]})
            }
           })
   
              
                 }
               }
         })
         }}
 