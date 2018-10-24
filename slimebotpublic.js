const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')
const cron = require('node-cron');
const Enmap = require('enmap');

bot.settings = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
  });

  // Using async/await as an immediate function: 
(async function() {
    await bot.settings.defer;
    console.log(bot.settings.size + " keys loaded");
    // Ready to use!
  }());
 
const defaultSettings = {	
    prefix: "!",		
    adminRole: "Administrator",	
    welcomeChannel: "welcome",	
    welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
    privateMessage: "Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Type !help for my list of commands!",
    expoChannel: "general",
    expoMessage: "@everyone Expeditions are starting in 15 minutes! Good luck!",
    testChannel: "bot-testing",
    testMessage: "test"

} 

bot.on("guildDelete", guild => {
    // Removing an element uses `delete(key)`
    bot.settings.delete(guild.id);
  });
  



cron.schedule('00 45 12,20 * * *', () => {

    bot.guilds.forEach((guild) => {

        bot.settings.ensure(guild.id, defaultSettings);

        let expoChannel = bot.settings.get(guild.id, "expoChannel");
            
        let expoMessage = bot.settings.get(guild.id, "expoMessage");
            
        guild.channels 
            .find(channel => channel.name === expoChannel)
            .send(expoMessage)
            .catch(console.error);
  })
},

    // bot.guilds.forEach((guild) => {
    //     guild.channels.forEach((channel) => {

    //         if (channel.name === "general") {
    //             channel.send('@everyone Expeditions are starting in 15 minutes! Good luck!')
    //             return;
    //         } 
    //         else if (channel.name === "general-chat") {
    //             channel.send('@everyone Expeditions are starting in 15 minutes! Good luck!')
    //             return;
    //         }
    //         else if (channel.name === "main") {
    //             channel.send('@everyone Expeditions are starting in 15 minutes! Good luck!')
    //             return;
    //         }
    //     })
    // })
{
    scheduled: true,
    timeZone: "America/Los_Angeles"
}
);

    
bot.on('guildMemberAdd', member => {
    bot.settings.ensure(member.guild.id, defaultSettings);

    let welcomeMessage = bot.settings.get(member.guild.id, "welcomeMessage");
    let privateMessage = bot.settings.get(member.guild.id, "privateMessage");

    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

    member.guild.channels
        .find(channel => channel.name === bot.settings.get(member.guild.id, "welcomeChannel"))
        .send(welcomeMessage)
        .catch(console.error);
    
    member
        .send(privateMessage)
        .catch(console.error);
    
    // member.send(`Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Type !help for my list of commands! \n \n Thank you!`); 
});

// message when bot is online
bot.on('ready', () => {
    console.log('I am ready!');
  });

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


// bot commmands
bot.on('message', async (message) => {
    if (!message.guild || message.author.bot) return;

    const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);

    if (message.content.indexOf(guildConf.prefix) !== 0) return;

    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(guildConf.prefix.length).toLowerCase();
 
    // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    // const command = args.shift().toLowerCase();

    const fusing = (numberOfMaterials, materialCost, upgradeCost) => {
        return numberWithCommas(Math.round((numberOfMaterials * Number(materialCost))+ upgradeCost))
    }
    
    // fusing cost calculator
    if(command === 'fuse') {

        const botMessage = (typeOfMaterial, fuseMaterialCost, numberOfMaterials, materialCost, upgradeCost, fusingItem) => {
            message.reply(`Using ${typeOfMaterial} at ${numberWithCommas(fuseMaterialCost)} each, it will cost you ${fusing(numberOfMaterials, materialCost, upgradeCost)} mesos to max a ${fusingItem}!`)
        }
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
    
    // bot help
    if (command === 'help') {
        message.reply({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            fields: [{
                name: "**__Here are a list of my commands!__**",
                value: "**!fuse** : help with fusing costs \n\n **!showconf** : show current configurations \n\n **!setconf** : edit configurations"
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

    if(command === "setconf") {
        // Command is admin only, let's grab the admin value: 
        // const adminRole = message.guild.roles.find("name", guildConf.adminRole);
        // if(!adminRole) return message.reply("Administrator Role Not Found");
        
        // // Then we'll exit if the user is not admin
        // if(!message.member.roles.has(adminRole.id)) {
        //   return message.reply("You're not an admin, sorry!");
        // }
        
        // Let's get our key and value from the arguments. 
        // This is array destructuring, by the way. 
        const [prop, ...value] = args;
        if (prop === 'help') {
            return message.reply({embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                title: 'Configuration Help',
                description: 'This guide will teach you how to set up your own guild-specific configurations.',
                fields: [{
                    name: "**__Why do I need to set configs?__**",
                    value: "Setting configurations is very important. It is how you can make me 'unique' to your guild. \n\n Every guild is different - they each have their own specific channels, they have their own specific banquet times, GMs want their own welcome/reminder messages, etc. \n\n By setting my configs, you can set me up however you like! "
                  },
                  {
                      name: "**__Configuration Keys and Value__**",
                      value: "There are 2 parts to my configurations: **keys and values**. \n\n The **key** is the type of configuration. \n\n Some examples of **keys** include \n 'WELCOME_MESSAGE', 'WELCOME_CHANNEL', EXPO_MESSAGE, EXPO_CHANNEL'. \n\n The **Value** is the value of that **key**, and it is what you will be changing. \n\n For example, the default **value** of the **key** 'WELCOME_CHANNEL' is set to 'welcome'. That means when a new guild member joins, a welcome message will be sent to the channel named 'welcome'. \n\n If you don't have a channel named 'welcome' and wanted to send the welcome messages to a channel called 'new-members', then you would change the **value** of WELCOME_CHANNEL to 'new-members'.  \n\n **Keys** cannot be changed \n\n If you type !showconf, it will show you your current **keys** and **values**"
                  },{
                    name: "**__Changing values of keys__**",
                    value: "To start, type !setconf followed by the **key** and then the **value** you want. \n\n For example, if you wanted to change the value of **EXPO_CHANNEL** to **'Expedition-Reminders'**, simply type in **!setconf EXPO_CHANNEL Expedition-Reminders**. This will set my expedition reminder messages to send only to the channel **'Expedition-Reminders'**. \n\n "
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Slime Bot"
                }
              }
            })
        }
        if(!bot.settings.has(message.guild.id, prop)) {
          return message.reply("This key is not in the configuration. Type !showconf to see your current keys.");
        }
        
        if (prop === undefined ) {
            return message.reply("You cannot enter a blank key. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.");
        }
        
        bot.settings.set(message.guild.id, value.join(" "), prop);
        
        message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
      }

      if(command === "showconf") {
        let configProps = Object.keys(guildConf).map(prop => {
          return `${prop}  :  ${guildConf[prop]}\n`;
        });
        message.channel.send(`The following are the server's current configuration:
        \`\`\`${configProps}\`\`\``);
      }

      if (command === "test") {
        let testMessage = bot.settings.get(message.guild.id, "testMessage");
        message.guild.channels
        .find(channel => channel.name === bot.settings.get(message.guild.id, "testChannel"))
        .send(testMessage)
        .catch(console.error);
      } 
})

bot.login(config.token);