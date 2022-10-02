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
        name: "antispam",
        description: "Permet de changer l'état de l'anti spam.",
        default_member_permissions: 8,
        options: [{
            name: "etat",
            description: "Activer ou désactiver l'anti spam",
            type: "STRING",
            choices: [
              { name: "on ", value: "on" },
              { name: "off", value: "off" },
            ]
        }]
    },
    /**
     * @param {Bot} client
     * @param {CommandInteraction} interaction
     */
        async execute(client, interaction, db) {
            const choix = interaction.options.getString("etat");
            db.query(`SELECT * FROM antiraid WHERE guildID = '${interaction.guild.id}'`, async (err, req) => {

            if(choix === "on") {
                    if(req[0].antispam === "on"){
                    const embed = new MessageEmbed()
                    .setTitle(`${config.emoji.non} ERREUR`)
                    .setDescription("L'anti spam est déjà allumé !")
                    .setColor(config.color.err)
                    .setTimestamp()
                    return interaction.reply({embeds: [embed], ephemeral: true})
                }else{

                        sql = `UPDATE antiraid SET antispam = 'on' WHERE guildID = '${interaction.guild.id}'`
                        db.query(sql, function (err) {
                            if (err) throw err;
                        })
                        const embed = new MessageEmbed()                        
                        .setTitle(`${config.emoji.oui} SUCCÈS`)
                        .setDescription("L'anti spam est désormais allumé !")
                        .setColor(config.color.succes)
                        .setTimestamp()
                        return interaction.reply({embeds: [embed], ephemeral: true})
                    
                }
            }
            if(choix === "off") {
                if(req[0].antispam === "off"){
                    const embed = new MessageEmbed()
                    .setTitle(`${config.emoji.non} ERREUR`)
                    .setDescription("L'anti spam est déjà éteint !")
                    .setColor(config.color.err)
                    .setTimestamp()
                    return interaction.reply({embeds: [embed], ephemeral: true})
                }else{
                        sql = `UPDATE antiraid SET antispam = 'off' WHERE guildID = '${interaction.guild.id}'`
                        db.query(sql, function (err) {
                            if (err) throw err;
                        })
                        const embed = new MessageEmbed()                        
                        .setTitle(`${config.emoji.oui} SUCCÈS`)
                        .setDescription("L'anti spam est désormais éteint !")
                        .setColor(config.color.succes)
                        .setTimestamp()
                        return interaction.reply({embeds: [embed], ephemeral: true})
                    
                }
            }
        
        })
    }
}