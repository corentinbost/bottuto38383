const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
module.exports = {
    slash: {
        name:"suggestion_salon",
        description: "Permet de configurer le salon de suggestion",
        default_member_permissions: 8,
        options: [{
            name: 'salon',
            description: 'Le salon où seront les suggestions.',
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
        db.query(`SELECT * FROM suggestion WHERE guildID = ${interaction.guild.id}`, (err, req) => {

       if (req.length < 1) {
            sql = `INSERT IGNORE INTO suggestion (guildID, suggestionchan) VALUES ('${interaction.guild.id}', '${channel.id}')`
            db.query(sql, function (err) {
                if (err) throw err;
            })
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Le salon suggestion a bien été défini c'est le salon ${channel}.`)
            .setColor(config.color.succes)
            .setTimestamp()
            return interaction.reply({embeds: [embed]})
        }else{
            const embed = new MessageEmbed()
            .setTitle(`❓ QUESTION`)
            .setDescription(`Le salon suggestion est déjà défini. C'est le salon <#${req[0].suggestionchan}>. Voulez vous le remplacer par le salon ${channel} ?`)
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
                    sql = `UPDATE suggestion SET suggestionchan = '${channel.id}' WHERE guildID = '${interaction.guild.id}'`
            db.query(sql, function (err) { 
                if (err) throw err;
            })
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Le salon suggestiona bien été défini c'est le salon ${channel}.`)
            .setColor(config.color.succes)
            .setTimestamp()
            return interaction.reply({embeds: [embed]})
                }else
                if(interaction.customId === "non") {
                    return interaction.message.delete()
                }
        }) });
        }
        })
    }
}