const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')
const cron = require('node-cron');
const Enmap = require('enmap');
const cronJobManager = require('cron-job-manager');

// enmap settings back-end
bot.settings = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
  });


// message when bot is online
bot.on('ready', () => {
    console.log('I am ready!');
});


// when bot starts, logs how many keys are loaded from database.
(async function() {
    await bot.settings.defer;
    console.log(bot.settings.size + " keys loaded")
    
  }());
 

// enmap settings front-end  
const defaultSettings = {		
    adminRole: "GM",	
    welcomeChannel: "welcome",	
    welcomeMessage: "Say hello to @{{user}}, everyone! We all need a warm welcome sometimes :D",
    privateMessage: "Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Type !help for my list of commands!",
    expoChannel: "general",
    expoMessage: "@everyone Expeditions are starting in 15 minutes! Good luck!",
    banquetTime: "00 18",
    banquetChannel: "bot-testing",
    banquetMessage: "test"
} 


// delete settings when guild is deleted
bot.on("guildDelete", guild => {
    bot.settings.delete(guild.id);
  });
  


// scheduled message for expeditions
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
{
    scheduled: true,
    timeZone: "America/Los_Angeles"
});

// welcome message to new guild member    
bot.on('guildMemberAdd', member => {

    bot.settings.ensure(member.guild.id, defaultSettings);

    let welcomeMessage = bot.settings.get(member.guild.id, "welcomeMessage");
    let privateMessage = bot.settings.get(member.guild.id, "privateMessage");

    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

    member.guild.channels
        .find(channel => channel.name == bot.settings.get(member.guild.id, "welcomeChannel"))
        .send(welcomeMessage)
        .catch(console.error);
    member
        .send(privateMessage)
        .catch(console.error);
});

// function that inserts commas into numbers
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


// bot commmands
bot.on('message', async (message) => {
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();

    const fusing = (numberOfMaterials, materialCost, upgradeCost) => {
        return numberWithCommas(Math.round((numberOfMaterials * Number(materialCost))+ upgradeCost))
    }
    
    // fusing cost calculator
    if(command === 'fuse') {

        const botMessage = (typeOfMaterial, fuseMaterialCost, numberOfMaterials, materialCost, upgradeCost, fusingItem) => {
            message.reply(`Using ${typeOfMaterial} at ${numberWithCommas(fuseMaterialCost)} each, it will cost you ${fusing(numberOfMaterials, materialCost, upgradeCost)} mesos to max a ${fusingItem}!`)
            .catch(console.error);
        }
        let [ fuseItem, fuseMaterial, fuseMaterialCost, ] = args;

        // weapons

        if (fuseItem === 'mythicweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 146.44, fuseMaterialCost, 80542000, 'mythic weapon')
            
        }
        else if (fuseItem === 'mythicweapon' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
            botMessage('max uniques', fuseMaterialCost, 22.31, fuseMaterialCost, 41139640, 'mythic weapon')
            
        }
        else if (fuseItem ==='mythicweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 3864.13, fuseMaterialCost, 38641300, 'mythic weapon')
           
        }
        else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
           botMessage('max uniques', fuseMaterialCost, 9.23, fuseMaterialCost, 17024896, 'legendary weapon')
           
           
        }
        else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 60.6, fuseMaterialCost, 33328685, 'legendary weapon' )
            
        }
        else if (fuseItem === 'legendaryweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 1598.95, fuseMaterialCost, 15989488, 'legendary weapon')
            
        }
        else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
            botMessage('max uniques', fuseMaterialCost, 3, fuseMaterialCost, 5529454, 'unique weapon' )
            
        }
        else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 19.68, fuseMaterialCost,  10824701, 'unique weapon')
            
        }
        else if (fuseItem === 'uniqueweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 519.32, fuseMaterialCost, 5193167, 'unique weapon')
           
        }
        else if (fuseItem === 'epicweapon' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 2.98, fuseMaterialCost, 1637948, 'epic weapon')
           
        }
        else if (fuseItem === 'epicweapon' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 78.58, fuseMaterialCost, 785808, 'epic weapon')
            
        }
        // 

        // armors 
        else if (fuseItem === 'mythicarmor' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
            botMessage('max uniques', fuseMaterialCost, 17.16, fuseMaterialCost, 31643040, 'mythic armor')
            
        }
        else if (fuseItem === 'mythicarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 112.65, fuseMaterialCost, 61957500, 'mythic armor')
            
        }
        else if (fuseItem === 'mythicarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 2972.40, fuseMaterialCost, 29724000, 'mythic armor')
            
        }
        else if (fuseItem === 'mythicarmor' && fuseMaterial === 'treasure') {
            message.reply(`Using treasure pulls, it will cost you about 970m to max a mythic armor!`)
            
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
            botMessage('max uniques', fuseMaterialCost, 7.10, fuseMaterialCost, 13096074, 'legendary armor')
            
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 46.61, fuseMaterialCost, 25637450, 'legendaryarmor')
            
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 1229.96, fuseMaterialCost, 12299606, 'legendary armor')
            
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'treasure') {
            message.reply(`Using treasure pulls, it will cost you about 400m to max a legendary armor!`)
           
        }
        else if (fuseItem === 'uniquearmor' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
            botMessage('max uniques', fuseMaterialCost, 2.31, fuseMaterialCost, 4253426, 'unique armor')
            
        }
        else if (fuseItem === 'uniquearmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 15.14, fuseMaterialCost, 8326693, 'unique armor')
            
        }
        else if (fuseItem === 'uniquearmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 399.47, fuseMaterialCost, 3994744, 'unique armor')
          
        }
        else if (fuseItem === 'uniquearmor' && fuseMaterial === 'treasure') {
            message.reply(`Using treasure pulls, it will cost you about 130m to max a unique armor!`)
            
        }
        else if (fuseItem === 'epicarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 2.29, fuseMaterialCost, 1258426, 'epic armor')
            
        }
        else if (fuseItem === 'epicarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 60.37, fuseMaterialCost, 603732, 'epic armor')
            
        }
        else if (fuseItem === 'epicarmor' && fuseMaterial === 'treasure') {
            message.reply(`Using treasure pulls, it will cost you about 20m to max a epic armor!`)
            
        }
        //

        // fuse command help
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
            }).catch(console.error);
        }

        else if (fuseItem === 'data') {
            message.reply({embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                fields: [{
                    name: "**__Exp Required To Max__**",
                    value: "**Mythic Weapon**: 2,940,600 \n **Legendary Weapon**: 1,216,800 \n **Unique Weapon**: 395,200 \n **Epic Weapon**: 59,800 \n\n **Mythic Armor**: 2,262,000 \n **Legendary Armor**: 936,000 \n **Unique Armor**: 304,000 \n **Epic Armor**: 45,994"
                  },
                  {
                    name: "**__# of Max Uniques/Epics to Max__**",
                    value: "**Mythic Weapon**: 22.31 max uniques, 146.44 max epics \n **Legendary Weapon**: 9.23 max uniques, 60.6 max epics \n **Unique Weapon**: 3 max uniques, 19.68 max epics \n\n **Mythic Armor**: 17.16 max uniques, 112.65 max epics \n **Legendary Armor**: 7.1 max uniques, 46.61 max epics \n **Unique Armor**: 2.31 max uniques, 15.14 max epics"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Slime Bot"
                }
              }
            }).catch(console.error);
        }

        // default
        else {
           message.reply(`Please enter !fuse help`)
           .catch(console.error);
        }
    }
    
    // list bot commands
    if (command === 'help') {
        message.reply({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            fields: [{
                name: "**__Public Commands__**",
                value: "**!fuse** : help with fusing costs \n **!fuse help** : how to use !fuse \n **!fuse data** : fusing data \n **!help** : list of commands"
              },
              {
                  name: "**__Admin Commands__**",
                  value: "**!showconf** : show current configurations \n**!setconf** : edit configurations"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "Slime Bot"
            }
          }
        }).catch(console.error);
    }

    if (!message.guild || message.author.bot) return;

    const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);

    if (message.content.indexOf(config.prefix) !== 0) return;

    // setting configurations command
    if(command === "setconf") {
        // Command is admin only, let's grab the admin value: 
        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        // Then we'll exit if the user is not admin
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("You're not an admin, sorry!");
        }
        
        // Let's get our key and value from the arguments. 
        // This is array destructuring, by the way. 
        const [prop, ...value] = args;

        // configurations help
        if (prop === 'help') {
            return message.reply({embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                title: '**__Configuration Help__**',
                description: `Hey GM! I'm here to teach you how to set up your own guild-specific configurations.`,
                fields: [{
                    name: "**__Why do I need to set configs?__**",
                    value: "Every guild discord is different - they have their own specific channels, banquet times, GMs want their own welcome/reminder messages, etc etc. \n\n By setting configs, you are able to edit all of these to your liking."
                  },
                  {
                      name: "**__Configuration Keys and Value__**",
                      value: "There are 2 parts to my configurations: **keys and values**. \n\n The **key** is the type of configuration. \n\n Some examples of **keys** include \n 'welcomeMessage', 'welcomeChannel', 'expoMessage', & 'banquetTime'. \n\n The **value** is the value of that particular **key**, and it is what you will be changing. \n\n For example, the default **value** of the **key** 'expoChannel' is set to 'general'. This means that my expedition reminders will be sent to the channel called 'general' by default. \n\n If you don't have a channel called 'general', or want me to send exped reminders to a different channel, let's say, 'expedition-reminders', you would change the **value** of expoChannel to 'expedition-reminders'."
                  },
                  {
                    name: "**__Changing values of keys__**",
                    value: "To change the value of keys, type !setconf followed by the **key** and then the **value** you want. \n\n For the example above, simply type **!setconf expoChannel expedition-reminders**. This will set my expedition reminder messages to send only to the channel **expedition-reminders**. \n\n You can then type **!showconf** to view your changes. \n\n Simple enough, right? \n\n If you're not getting reminders from me, there is probably an error in your configs (check spelling and/or letter casing). \n\n Now go edit your configs! "
                  },
                  {
                    name: "**__Keys and their functionalities__**",
                    value: "**prefix**: The prefix you want to put before every command. \n\n **welcomeChannel**: My welcome message will be sent to this channel. \n\n **welcomeMessage**: This message will be sent to the welcomeChannel when a new guild member joins the discord. Note that {{user}} will be replaced by the new guild member's username. \n\n **privateMessage**: I will send this private DM to new guild members. \n\n **expoChannel**: The channel I will send my expedition reminders to. \n\n **expoMessage**: This message will be sent to the expoChannel 15 minutes prior to expeditions. \n\n **banquetTime**: the time you want me to remind your guild about banquet. \n\n **banquetChannel**: the channel I will send the banquetMessage to. \n\n **banquetMessage**: the message I will send to banquetChannel."
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Slime Bot"
                }
              }
            }).catch(console.error)
        }

        if(!bot.settings.has(message.guild.id, prop)) {
            return message.reply("This key is not in the configuration. Type !showconf to see your current keys.")
            .catch(console.error);
        }
        
        if (prop === undefined ) {
            return message.reply("You cannot enter a blank key. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.")
            .catch(console.error);
        }

        //settings banquet configs
        if (prop === 'banquetTime') {

            let banquetTime = bot.settings.get(message.guild.id, 'banquetTime');
            
            let banquetReminder = new cronJobManager(`banquet_reminder`, `00 ${banquetTime} * * *`, () => {
               
                bot.settings.ensure(message.guild.id, defaultSettings);
                
                let banquetChannel = bot.settings.get(message.guild.id, 'banquetChannel');
                let banquetMessage = bot.settings.get(message.guild.id, 'banquetMessage');
                
                message.guild.channels 
                    .find(channel => channel.name === banquetChannel)
                    .send(banquetMessage)
                    .catch(console.error);
            },
            {
                start:true,
                timeZone: 'Americas/Los_Angeles'
            }
            );

            if (value) {
                let newTime = value.join(" ");
                banquetReminder.update(`banquet_reminder`, `00 ${newTime} * * *`);
                let jobs = banquetReminder.listCrons();
                console.log(jobs);
            }
           
        }

        bot.settings.set(message.guild.id, value.join(" "), prop);
        
        message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
    }

    // shows current configuration
    if(command === "showconf") {
        const ayy = bot.emojis.find(emoji => emoji.name === "ayy")
        let configProps = Object.keys(guildConf).map(prop => {
          return `▶ ${prop} ▶  :  ${guildConf[prop]}\n\n`;
        });
        let configPropsJoin = configProps.join(" ")
        
        message.channel.send(`The following are the server's current configuration:
        \`\`\`${configPropsJoin}\`\`\``).catch(console.error);
    }

    // // bot testing command
    // if (command === "test") {
    //     let testMessage = bot.settings.get(message.guild.id, "testMessage");
    //     message.guild.channels
    //     .find(channel => channel.name === bot.settings.get(message.guild.id, "testChannel"))
    //     .send(testMessage)
    //     .catch(console.error);
    // } 
});

bot.login(config.token);