const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')
const CronJob = require('cron').CronJob;


const dayExpo = new CronJob({
        cronTime: '00 45 12 * * 1-7',
        onTick: function() {
            bot.guilds.forEach((guild) => {
            let defaultChannel = "";
            
            guild.channels.forEach((channel) => {
               if(channel.type == "text" && defaultChannel == "") {
               if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                   defaultChannel = channel;
               }
               }
         })
            defaultChannel.send('@Everyone, expeditions are starting in 15 minutes!');
        })
        },
        start: true,
        timeZone: 'America/Los_Angeles'
})

const nightExpo = new CronJob({
    cronTime: '00 45 18 * * 1-7',
    onTick: function() {
        bot.guilds.forEach((guild) => {
        let defaultChannel = "";
        
        guild.channels.forEach((channel) => {
           if(channel.type == "text" && defaultChannel == "") {
           if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
               defaultChannel = channel;
           }
           }
     })
        defaultChannel.send('@Everyone, expeditions are starting in 15 minutes! Good luck!');
    })
    },
    start: true,
    timeZone: 'America/Los_Angeles'
})

bot.on('guildMemberAdd', member => {
    member.send(`Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Thank you!`); 
});

// message when bot is online
bot.on('ready', () => {
    console.log('I am ready!');
  });

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const fusing = (numberOfMaterials, materialCost, upgradeCost) => {
    return numberWithCommas(Math.round((numberOfMaterials * Number(materialCost))+ upgradeCost))
}

// bot commmands
bot.on('message', message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
 
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const botMessage = (typeOfMaterial, fuseMaterialCost, numberOfMaterials, materialCost, upgradeCost, fusingItem) => {
        message.reply(`Using ${typeOfMaterial} at ${numberWithCommas(fuseMaterialCost)} each, it will cost you ${fusing(numberOfMaterials, materialCost, upgradeCost)} mesos to max a ${fusingItem}!`)
    }
 

    // fusing cost calculator
    if(command === 'fuse') {

        let [ fuseItem, fuseMaterial, fuseMaterialCost, ] = args;

        // weapons

        if (fuseItem === 'mythicweapon' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 244.81, fuseMaterialCost, 134644684, 'mythic weapon')
        }
        else if (fuseItem === 'mythicweapon' && fuseMaterial === 'maxunique') {
            botMessage('max uniques', fuseMaterialCost, 37.30, fuseMaterialCost, 68778945, 'mythic weapon')
        }
        else if (fuseItem ==='mythicweapon' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 6459.60, fuseMaterialCost, 64595992, 'mythic weapon')
        }
        else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'maxunique') {
           botMessage('max uniques', fuseMaterialCost, 9.23, fuseMaterialCost, 17024896, 'legendary weapon')
           
        }
        else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 60.6, fuseMaterialCost, 33328685, 'legendary weapon' )
        }
        else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 1598.95, fuseMaterialCost, 15989488, 'legendary weapon')
        }
        else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'maxunique') {
            botMessage('max uniques', fuseMaterialCost, 3, fuseMaterialCost, 5529454, 'unique weapon' )
        }
        else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 19.68, fuseMaterialCost,  10824701, 'unique weapon')
        }
        else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 519.32, fuseMaterialCost, 5193167, 'unique weapon')
        }
        else if (fuseItem === 'epicweapon' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 2.98, fuseMaterialCost, 1637948, 'epic weapon'  )
        }
        else if (fuseItem === 'epicweapon' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 78.58, fuseMaterialCost, 785808, 'epic weapon' )
        }
        // 

        // armors 
        else if (fuseItem === 'mythicarmor' && fuseMaterial === 'maxunique') {
            botMessage('max uniques', fuseMaterialCost, 28.69, fuseMaterialCost, 52906880, 'mythic armor')
        }
        else if (fuseItem === 'mythicarmor' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 188.31, fuseMaterialCost, 103572834, 'mythic armor')
        }
        else if (fuseItem === 'mythicarmor' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 4968.92, fuseMaterialCost, 49689225, 'mythic armor')
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxunique') {
            botMessage('max uniques', fuseMaterialCost, 7.10, fuseMaterialCost, 13096074, 'legendary armor')
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 46.61, fuseMaterialCost, 25637450, 'legendaryarmor')
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 1229.96, fuseMaterialCost, 12299606, 'legendary armor')
        }
        else if (fuseItem === 'uniquearmor' && fuseMaterial === 'maxunique') {
            botMessage('max uniques', fuseMaterialCost, 2.31, fuseMaterialCost, 4253426, 'unique armor')
        }
        else if (fuseItem === 'uniquearmor' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 15.14, fuseMaterialCost, 8326693, 'unique armor')
        }
        else if (fuseItem === 'uniquearmor' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 399.47, fuseMaterialCost, 3994744, 'unique armor')
        }
        else if (fuseItem === 'epicarmor' && fuseMaterial === 'maxepic') {
            botMessage('max epics', fuseMaterialCost, 2.29, fuseMaterialCost, 1258426, 'epic armor')
        }
        else if (fuseItem === 'epicarmor' && fuseMaterial === 'level1epic') {
            botMessage('level 1 epics', fuseMaterialCost, 60.37, fuseMaterialCost, 603732, 'epic armor')
        }
        //

        // help
        else if (fuseItem === 'help') {
            message.reply({embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                fields: [{
                    name: "**__Let me help you with fusing calculations!__**",
                    value: "1. Please type in !fuse followed by what you want to max (mythicweapon, legendaryweapon, uniquearmor, etc) \n \n 2. Follow that with your fusing material (maxepic, level1epic, maxunique) \n \n 3. Follow that with the cost of that fusing material (IE: 15000000, 10000000, etc) \n \n 4. Press Enter to find out your fusing cost!"
                  },
                  {
                    name: "**__Examples__**",
                    value: "!fuse legendaryweapon maxepic 15000000 \n\n !fuse mythicarmor level1epic 500000"
                  },
                  {
                      name: "**__Current Fusing Item Options__**",
                      value: "mythicweapon, legendaryweapon, uniqueweapon, epicweapon \n\n mythicarmor, legendaryarmor, uniquearmor, epicarmor"
                  },
                  {
                      name: "**__Current Fusing Material Options__**",
                      value: "maxunique, maxepic, level1epic"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Slime Bot"
                }
              }
            });
        }

        // default
        else {
           message.reply(`Please enter !fuse help`);
        }
    }
})

bot.login(config.token);