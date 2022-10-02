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
        name: "crée_ton_vocal",
        description: "Permet de définir le salon vocal de crée ton vocal.",
        default_member_permissions: 8,
        options: [{
            name: 'salon',
                description: 'Mentionner le salon à lock',
                type: 'CHANNEL',
                channelTypes: ["GUILD_VOICE"],
                required: true,
            
        }]
    },
    /**
     * @param {Bot} client
     * @param {CommandInteraction} interaction
     */
        async execute(client, interaction, db) {
            const channel = interaction.options.getChannel('salon')
        db.query(`SELECT * FROM vocal WHERE guildID = ${interaction.guild.id}`, (err, req) => {

       if (req.length < 1) {
            sql = `INSERT IGNORE INTO vocal (guildID, vocalchan) VALUES ('${interaction.guild.id}', '${channel.id}')`
            db.query(sql, function (err) {
                if (err) throw err;
            })
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Le salon crée ton vocal bien été défini c'est le salon ${channel}.`)
            .setColor(config.color.succes)
            .setTimestamp()
            return interaction.reply({embeds: [embed]})
        }else{
            const embed = new MessageEmbed()
            .setTitle(`❓ QUESTION`)
            .setDescription(`Le salon crée ton vocal est déjà défini. C'est le salon <#${req[0].sondagechan}>. Voulez vous le remplacer par le salon ${channel} ?`)
            .setColor(config.color.succes)
            .setTimestamp()
            const Row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                  .setCustomId("oui")
                  .setLabel("Oui")
                  .setEmoji({ name: "✅" })
                  .setStyle("SUCCESS"),

                  new Discord.MessageButton()
                  .setCustomId("non")
                  .setLabel("Non")
                  .setEmoji({ name: "❌" })
                  .setStyle("DANGER")
              );
              
              const msg = interaction.reply({embeds: [embed], components: [Row]})
              db.query(`SELECT*FROM bans WHERE guildID = '${interaction.guild.id}'`, async (err, raq) => {
              const collector = await interaction.channel.createMessageComponentCollector({
                filter: (b) => {
                    if (b.user.id === interaction.user.id) return true;
                    else {
                        b.reply({
                            ephemeral: true,
                            content: `Seulement **${interaction.user.tag}** peux utilisé les boutons, je t'invite a utilisé la commande.`,
                        });
                        return false;
                    }
                },
                componentType: 'BUTTON',
                time: 200000000,
           
    })
            collector.on('collect', async (interaction) => {
                if(interaction.customId === "oui") {
                    sql = `UPDATE vocal SET vocalchan = '${channel.id}' WHERE guildID = '${interaction.guild.id}'`
            db.query(sql, function (err) { 
                if (err) throw err;
            })
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Le salon crée ton vocal bien été défini c'est le salon ${channel}.`)
            .setColor(config.color.succes)
            .setTimestamp()
            return interaction.reply({embeds: [embed]})
                }else
                if(interaction.customId === "non") {
                    const embed = new MessageEmbed()
                    .setTitle(`${config.emoji.oui} SUCCÈS`)
                    .setDescription(`Le salon de bienvenue n'a pas re été défini c'est toujours le salon ${req[0].vocalchan}.`)
                    .setColor(config.color.succes)
                    .setTimestamp()
                     interaction.reply({embeds: [embed]})
                    collector.on("end", collected => {

                    })
                }
        }) });
        }
        })
    }
}