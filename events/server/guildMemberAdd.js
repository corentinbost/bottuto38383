const mysql = require('mysql')
const config = require('../../config.json')
const Discord = require('discord.js')
let sql;

const db = mysql.createConnection({
    host: (config.host),
    password: (config.password),
    user: (config.user),
    database: (config.database)
});

module.exports = {
    
    name: "guildMemberAdd",
/**
 * @param {Bot} client
 * @param {Interaction} interaction

 */

    async execute(client, member) {
        db.query(`SELECT * FROM welcome WHERE guildID = '${member.guild.id}'`, async (err, req) => {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Nouveau membre !`)
            .setDescription(`Bienvenue à ${member} qui a rejoins le serveur ! Nous sommes désormais **${member.guild.memberCount}** !`)
            .setTimestamp()
            .setColor(config.color.succes)
            return await client.channels.cache.get(req[0].welcomechan).send({embeds: [embed]})
        })
    }
}