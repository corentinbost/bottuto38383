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
        name: "warn",
        description: "Permet d'avertir un membre.",
        options: [{
            name: 'membre',
            description: 'Le membre a avertir.',
            type: "USER",
            required: true,
        },
    {
        name: 'raison',
            description: 'La raison de l\'avertissement.',
            type: "STRING",
            required: false,
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
  const WarnReason = interaction.options.getString("raison") || "Aucune raison fourni."
    
    
try {
        db.query(`INSERT INTO infraction (userID, pseudo, staff, warnraison, guildID) VALUES ('${warne.id}', '${warne.user.username}', '${interaction.user.username}', '${WarnReason}', '${interaction.guild.id}')`);
    } catch (err) {
        console.log(err)
    }
     

    db.query(`SELECT * FROM infraction WHERE userID = ${warne.id} AND guildID = ${interaction.guild.id}`, async(err, req) => {

const embedfinal = new Discord.MessageEmbed()
		.setColor('#00FF00')
        .setAuthor(`${warne.user.tag} a été avertis par ${interaction.user.tag}`, warne.user.displayAvatarURL({dynamic: true}))
        .setDescription(`\n**__Raison :__** ${WarnReason}\n**__Nombre de warn actuel :__** ${req.length}`)
        .setTimestamp()
 interaction.reply({embeds: [embedfinal]})
   
         })
    }
}