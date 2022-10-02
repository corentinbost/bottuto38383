const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    slash: {
        name:"lock",
        description: "Permet de vérouiller un salon",
        default_member_permissions: 16,
        options: [
           {
                name: 'salon',
                description: 'Mentionner le salon à lock',
                type: 'CHANNEL',
                channelTypes: ["GUILD_TEXT"],
                required: false,
        }
        
    ]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction, db, config) {
        let chan;
        if (interaction.options.getChannel("salon") != null) {
          chan = interaction.options.getChannel("salon");
        } else {
          chan = interaction.channel;
        }
        chan.permissionOverwrites.edit(interaction.channel.guild.roles.everyone, {
            SEND_MESSAGES: false,
            CONNECT: false
          }).catch(async (error) => {
            return console.log(error)})
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Ce salon a été vérouillé avec succès par ${interaction.user.tag}`)
            .setColor(config.color.succes)
            .setTimestamp()
             chan.send({embeds: [embed]})
            interaction.reply({content: 'Lock réussis !', ephemeral: true})

    }
}