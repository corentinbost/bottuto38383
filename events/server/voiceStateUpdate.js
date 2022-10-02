const mysql = require('mysql')
const config = require('../../config.json')
let sql;
const { Collection } = require('discord.js')
const db = mysql.createConnection({
    host: (config.host),
    password: (config.password),
    user: (config.user),
    database: (config.database)
});
const voiceCollection = new Collection()

module.exports = {
    
    name: "voiceStateUpdate",
/**
 * @param {Bot} client
 * @param {Interaction} interaction

 */

    async execute(client, oldState, newState) {
        db.query(`SELECT * FROM vocal WHERE guildID = '${newState.guild.id}'`, async (err, req) => {
        const user = await client.users.fetch(newState.id);
        const member = newState.guild.members.cache.get(user.id)


    
        if(!oldState.channel && newState.channel.id === `${req[0].vocalchan}`){
            console.log('1')
            const channel = await newState.guild.channels.create("🎤 Vocal " + user.username, {
                type: 'GUILD_VOICE',
                reason: 'Crée ton vocal',
                parent: newState.channel.parent,
                permissionOverwrites: [
                     {
                    id: user.id,
                    allow: 'MANAGE_CHANNELS',
                }
                ]
            });
            member.voice.setChannel(channel);
            voiceCollection.set(user.id, channel.id);

        } else if(!newState.channel) {

            if(oldState.channel.id === voiceCollection.get(oldState.id)) return oldState.channel.delete()
        }
            })
    }
}