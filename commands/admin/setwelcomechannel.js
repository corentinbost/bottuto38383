const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
module.exports = {
    slash: {
        name:"salon_bienvenue",
        description: "Permet de configurer le salon de bienvenue",
        default_member_permissions: 8,
        options: [{
            name: 'salon',
            description: 'Le salon où seront les messages de bienvenues.',
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],                
            required: true,
        }]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction, db, config) {
        const channel = interaction.options.getChannel('salon')
        db.query(`SELECT * FROM welcome WHERE guildID = ${interaction.guild.id}`, (err, req) => {

       if (req.length < 1) {
            sql = `INSERT IGNORE INTO welcome (guildID, welcomechan) VALUES ('${interaction.guild.id}', '${channel.id}')`
            db.query(sql, function (err) {
                if (err) throw err;
            })
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Le salon de bienvenue bien été défini c'est le salon ${channel}.`)
            .setColor(config.color.succes)
            .setTimestamp()
            return interaction.reply({embeds: [embed]})
        }else{
            const embed = new MessageEmbed()
            .setTitle(`❓ QUESTION`)
            .setDescription(`Le salon de bienvenue est déjà défini. C'est le salon <#${req[0].sondagechan}>. Voulez vous le remplacer par le salon ${channel} ?`)
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
                    sql = `UPDATE welcome SET welcomechan = '${channel.id}' WHERE guildID = '${interaction.guild.id}'`
            db.query(sql, function (err) { 
                if (err) throw err;
            })
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Le salon de bienvenue bien été défini c'est le salon ${channel}.`)
            .setColor(config.color.succes)
            .setTimestamp()
            return interaction.reply({embeds: [embed]})
                }else
                if(interaction.customId === "non") {
                    const embed = new MessageEmbed()
                    .setTitle(`${config.emoji.oui} SUCCÈS`)
                    .setDescription(`Le salon de bienvenue n'a pas re été défini c'est toujours le salon ${req[0].sondagechan}.`)
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