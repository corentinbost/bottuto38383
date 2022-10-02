const config = require('../../config.json')
const mysql = require("mysql2")
 let sql
         const db = mysql.createConnection({
      host: (config.host),
      password: (config.password),
      user: (config.user),
      database: (config.database)
});
module.exports = {
    name: "ready",
    /**
 * @param {Bot} client
 * @param {Interaction} interaction

 */

     async execute(client) {
        console.log(`Prêt sur ${client.user.username} !`)

        db.connect(function(error){
            if(error){
                console.log(error);
            } else{
                 console.log('SQL Database Connected !');
            }
        });
        client.commands.forEach(async command => {
            client.guilds.cache.forEach(async guild => {
                guild.commands.create(command.slash).catch(err => { console.log(err) })
            })
        
        })
       /*client.commands.forEach(async command => {
            client.guilds.cache.forEach(async guild => {
        guild.commands.set([])
            })
        })*/
        setInterval(async () => {

            db.query(`SELECT * FROM temp`, async (err, req) => {
    
                if(req.length < 1) return;
    
                for(let i = 0; i < req.length; i++) {
    
                    if(Date.now() < parseInt(req[i].time)) return;
    
                    if(req[i].sanctionID.startsWith("BAN")) {
    
                        try {
    
                            bot.guilds.cache.get(req[i].guildID).members.unban(req[i].userID)
                            db.query(`DELETE FROM temp WHERE sanctionID = '${req[i].sanctionID}'`)
    
                        } catch (err) {}
                    }
                }
            })
    
        }, 1000)
        client.guilds.cache.each((guild) => {
            db.query(`SELECT * FROM antiraid WHERE guildID = ${guild.id}`, async (err, req) => {
                if (req.length < 1) {
                    sql = `INSERT INTO antiraid (guildID, antilink) VALUES (${guild.id}, 'off')`
                    db.query(sql, function (err) {
                        if (err) throw err;
                    })
                } else {
                    return;
                }
            })
        })
            }
        }
