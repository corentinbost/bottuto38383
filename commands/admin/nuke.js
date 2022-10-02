const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    slash: {
        name:"nuke",
        description: "Permet de nuke un salon",
        default_member_permissions: 16,
        options: [
           {
                name: 'salon',
                description: 'Mentionner le salon à nuke',
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
       
   let pos = interaction.channel.position;
   chan.clone().then(channel => {
   chan.delete();
   chan.setPosition(pos);
  if(chan.nsfw === true) {
   chan.setNSFW(true)
  } 
  
})
let succes_embed = new MessageEmbed()
   .setTitle(`${config.emoji.oui} SUCCÈS`)
   .setDescription("Channel Nuke Avec Succès")
   .setTimestamp()
   .setColor(config.color.succes)
  chan.send({embeds: [succes_embed]});
    }
}