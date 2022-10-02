const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    slash: {
        name:"unlock",
        description: "Permet de dévérouiller un salon",
        default_member_permissions: 16,
        options: [
           {
                name: 'salon',
                description: 'Mentionner le salon à unlock',
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
            SEND_MESSAGES: true,
            CONNECT: true
          }).catch(async (error) => {
            return console.log(error)})
            const embed = new MessageEmbed()
            .setTitle(`${config.emoji.oui} SUCCÈS`)
            .setDescription(`Ce salon a été dévérouillé avec succès par ${interaction.user.tag}`)
            .setColor(config.color.succes)
            .setTimestamp()
             chan.send({embeds: [embed]})
            interaction.reply({content: 'Unlock réussis !', ephemeral: true})

    }
}