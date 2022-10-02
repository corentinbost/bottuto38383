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
        name: "antilink",
        description: "Permet de changer l'état de l'anti link.",
        default_member_permissions: 8,
        options: [{
            name: "etat",
            description: "Activer ou désactiver l'anti link",
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
                    if(req[0].antilink === "on"){
                    const embed = new MessageEmbed()
                    .setTitle(`${config.emoji.non} ERREUR`)
                    .setDescription("L'anti link est déjà allumé !")
                    .setColor(config.color.err)
                    .setTimestamp()
                    return interaction.reply({embeds: [embed], ephemeral: true})
                }else{

                        sql = `UPDATE antiraid SET antilink = 'on' WHERE guildID = '${interaction.guild.id}'`
                        db.query(sql, function (err) {
                            if (err) throw err;
                        })
                        const embed = new MessageEmbed()                        
                        .setTitle(`${config.emoji.oui} SUCCÈS`)
                        .setDescription("L'anti link est désormais allumé !")
                        .setColor(config.color.succes)
                        .setTimestamp()
                        return interaction.reply({embeds: [embed], ephemeral: true})
                    
                }
            }
            if(choix === "off") {
                if(req[0].antilink === "off"){
                    const embed = new MessageEmbed()
                    .setTitle(`${config.emoji.non} ERREUR`)
                    .setDescription("L'anti link est déjà éteint !")
                    .setColor(config.color.err)
                    .setTimestamp()
                    return interaction.reply({embeds: [embed], ephemeral: true})
                }else{
                        sql = `UPDATE antiraid SET antilink = 'off' WHERE guildID = '${interaction.guild.id}'`
                        db.query(sql, function (err) {
                            if (err) throw err;
                        })
                        const embed = new MessageEmbed()                        
                        .setTitle(`${config.emoji.oui} SUCCÈS`)
                        .setDescription("L'anti link est désormais éteint !")
                        .setColor(config.color.succes)
                        .setTimestamp()
                        return interaction.reply({embeds: [embed], ephemeral: true})
                    
                }
            }
        
        })
    }
}