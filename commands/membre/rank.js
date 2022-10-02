const { CommandInteraction, MessageEmbed } = require('discord.js')
const { Bot } = require('../../structure/index.js')
const Discord = require('discord.js')
const {createCanvas, loadImage}= require("canvas")
module.exports = {
    slash: {
        name:"rank",
        description: "Permet de voir son niveau ou celui de quelqu'un.",
        options: [
            /*{
                name: 'membre',
                description: 'Le membre dont vous voulez voir le niveau.',
                type: 'USER',
                required: true,
            },*/

        ]
    },
/**
 * @param {Bot} client
 * @param {CommandInteraction} interaction
 */
    async execute(client, interaction, db, config) {
/*const membre = interaction.options.getMember('membre')
if (!membre) {   
    let colorBackgroundBar = "#000000";
    let opacityBackgroundBar = "0.4";
    let colorBar = "#62D3F5";
     db.query(`SELECT * FROM user WHERE userID = '${interaction.user.id}' AND guildID = ${interaction.guild.id}`, async (err, req) => {

      
                        console.log(req[0].niveau)
   
        const xpneed = (req[0].niveau + 1) * 100
        const niveaunow = req[0].niveau

        const xpnow = req[0].xp


const User = interaction.options.getMember("membre") || interaction.member

const canvas = createCanvas(1080, 270);
const ctx = canvas.getContext("2d")
const background = await loadImage("../../card.png");
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.lineWidth = 2;
ctx.globalAlpha = 0.4;
ctx.fillStyle = "000";

ctx.globalAlpha = 1;
ctx.font = "38px sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "#FFFFFF";
ctx.fillText(`${xpnow} / ${niveaunow * 100} XP`, 813, 160)

function pseudo() {
    if(User.tag.length >= 10){
        return User.username
    }else{
         return User.tag
    }

}
ctx.fillStyle = "#FFFFFF";
ctx.font = "43px sans-serif";
ctx.fillText(pseudo(), 380, 150) 

ctx.fillStyle = "#33caff";
ctx.font = "27px sans-serif";
ctx.fillText(`LEVEL`, 935, 83);

ctx.fillStyle = "#33caff";
ctx.font = "55px sans-serif";
ctx.fillText(`${niveaunow}`, 1015, 83);


  
  ctx.fillStyle = colorBackgroundBar;
  ctx.globalAlpha = opacityBackgroundBar;
  ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, 700, 50);
  ctx.fillStyle = colorBar;
  ctx.globalAlpha = 1;
  const percent = (100 * xpnow) / xpneed;
  const progress = (percent * 760) / 100;
  ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, progress, 50);
  ctx.restore();


	// Pick up the pen
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
	// Start the arc to form a circle
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
    ctx.clip();

const avatar = await loadImage(User.displayAvatarURL({ format: 'jpg' }));
ctx.drawImage(avatar, 20, 20, 210, 210);

const attachment = new MessageAttachment(canvas.toBuffer(), "exp.png")
interaction.reply({
    files: [attachment]
})
})
  }else {
const UserMention = interaction.options.getMember("membre") || interaction.member
let colorBackgroundBar = "#000000";
    let opacityBackgroundBar = "0.4";
    let colorBar = "#ffffff";
     db.query(`SELECT * FROM user WHERE userID = '${UserMention.id}' AND guildID = ${interaction.guild.id}`, async (err, req) => {

      
                console.log(req[0].niveau)
    
        const xpneed = (req[0].niveau + 1) * 100
        console.log(xpneed)
        const niveaunow = req[0].niveau
        const xpnow = req[0].xp



const canvas = createCanvas(1080, 270);
const ctx = canvas.getContext("2d")
const background = await loadImage("../../card.png");

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.lineWidth = 2;
ctx.globalAlpha = 0.4;
ctx.fillStyle = "000";

ctx.globalAlpha = 1;
ctx.font = "38px sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "#FFFFFF";
ctx.fillText(`${xpnow} / ${niveaunow * 100} XP`, 813, 160)

function pseudo() {
    if(UserMention.tag.length >= 10){
        return UserMention.username
    }else{
         return UserMention.tag
    }
}
ctx.fillStyle = "#FFFFFF";
ctx.font = "43px sans-serif";
ctx.fillText(pseudo(), 380, 150) 

ctx.fillStyle = "#33caff";
ctx.font = "27px sans-serif";
ctx.fillText(`LEVEL`, 940, 83);

ctx.fillStyle = "#33caff";
ctx.font = "55px sans-serif";
ctx.fillText(`${niveaunow}`, 1015, 83);


  
  ctx.fillStyle = colorBackgroundBar;
  ctx.globalAlpha = opacityBackgroundBar;
  ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, 700, 50);
  ctx.fillStyle = colorBar;
  ctx.globalAlpha = 1;
  const percent = (100 * xpnow) / xpneed;
  const progress = (percent * 760) / 100;
  ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, progress, 50);
  ctx.restore();


	// Pick up the pen
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000";
	// Start the arc to form a circle
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
    ctx.clip();
    
  

const avatar = await loadImage(UserMention.displayAvatarURL({ format: 'jpg' }));
ctx.drawImage(avatar, 20, 20, 210, 210);

const attachment = new MessageAttachment(canvas.toBuffer(), "exp.png")
interaction.reply({
    files: [attachment]
})})
  }*/
  const embed = new Discord.MessageEmbed()
  .setTitle(`${config.emoji.non} ERREUR`)
  .setDescription('Bonjour,\nnous sommes désolé mais en raison d\'un problème technique de source inconnue sur l\'ordinateur du développeur cette commande n\'a pas pu se fini (problème avec l\'image de fond de la carte d\'experience). La commande sera disponible à la fin du mois d\'Août ou au début du mois de Septembre.\nNous sommes désolé de la gêne occasioné.\nPour plus d\'information sur le problème merci de vous renseigner en ticket sur notre serveur support en ouvrant un ticket !')
  .setTimestamp()
  .setColor(config.color.err)
  const Row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setURL(`https://discord.gg/X8swyCE2Fe`)
          .setStyle("LINK")
          .setLabel("Serveur Support")
          .setEmoji({ name: "❓" }),

    
  );
        interaction.reply({embeds: [embed], components: [Row] })
}
}