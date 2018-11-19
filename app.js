const Discord = require('discord.js');
const bot = new Discord.Client({autoReconnect:true});
const config = require('./config.json')
const cron = require('node-cron');
const Enmap = require('enmap');
const util = require('util');

// enmap settings back-end
bot.settings = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
  });


// when bot starts, logs how many keys are loaded from database.
bot.settings.defer.then( () => {
    console.log(bot.settings.size + " keys loaded");
  });
 

// enmap settings front-end  
const defaultSettings = {		
    adminRole: "GM",	
    privateMessage: "Hi there, welcome to our discord! \n\n Please change your nickname to your in-game IGN. \n\n Type !help for my list of commands!",
    expoChannel: "general",
    expoMessage: "@everyone Expeditions are starting in 15 minutes! Good luck!",
    banquetTime: "00 18",
    banquetChannel: "general",
    banquetMessage: "@everyone Banquet is starting in 15 minutes!",
} 


// when bot starts, banquet reminders are deployed with current banquetTime configs.
bot.on('ready', () => {
    console.log(`Serving ${bot.guilds.size} servers`);
    console.log('Ready boss!');

    bot.guilds.forEach(guild => {
        
        let banquetTime = bot.settings.get(guild.id, 'banquetTime');

        cron.schedule(`00 ${banquetTime} * * *`, () => {

            let banquetChannel = bot.settings.get(guild.id, 'banquetChannel');
            let banquetMessage = bot.settings.get(guild.id, 'banquetMessage');

            guild.channels
                .find(channel => channel.name === banquetChannel)
                .send(banquetMessage)
                .catch(console.error);
        })
    })
})

bot.on('guildCreate', guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);

})

// delete settings when guild is deleted
bot.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
    bot.settings.delete(guild.id);
  });


// scheduled message for expeditions
cron.schedule('00 45 11,19 * * *', () => {

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

    let privateMessage = bot.settings.get(member.guild.id, "privateMessage");

    member
        .send(privateMessage)
        .catch(console.error);
});


// function that inserts commas into numbers
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

let chaosTeam = [];

let chaosTeam2 = [];

let players = [];

// bot commmands
bot.on('message', async (message) => {

    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();

    if (!message.guild || message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);

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
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxunique' && fuseMaterialCost !== undefined) {
            botMessage('max uniques', fuseMaterialCost, 7.10, fuseMaterialCost, 13096074, 'legendary armor')
            
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 46.61, fuseMaterialCost, 25637450, 'legendaryarmor')
            
        }
        else if (fuseItem === 'legendaryarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 1229.96, fuseMaterialCost, 12299606, 'legendary armor')
            
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
        else if (fuseItem === 'epicarmor' && fuseMaterial === 'maxepic' && fuseMaterialCost !== undefined) {
            botMessage('max epics', fuseMaterialCost, 2.29, fuseMaterialCost, 1258426, 'epic armor')
            
        }
        else if (fuseItem === 'epicarmor' && fuseMaterial === 'level1epic' && fuseMaterialCost !== undefined) {
            botMessage('level 1 epics', fuseMaterialCost, 60.37, fuseMaterialCost, 603732, 'epic armor')
            
        }
        //

        // fuse command help
        else if (fuseItem === 'help') {
            
            message.author.send({embed: {
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
                      value: "mythicweapon, legendaryweapon, uniqueweapon, epicweapon \n\n mythicarmor, legendaryarmor, uniquearmor, epicarmor \n\n"
                  },
                  {
                      name: "**__Current Fusing Material Options__**",
                      value: "maxunique, maxepic, level1epic, treasure (cost from treasure pulls)"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Slime Bot"
                }
              }
            })

            message.reply(`Check your DM!`)
        }
        
        // fuse data
        else if (fuseItem === 'data') {
            message.reply({embed: {
                color: 3447003,
                fields: [{
                    name: "**__Exp Required To Max__**",
                    value: "**Mythic Weapon**: 2,940,600 \n **Legendary Weapon**: 1,216,800 \n **Unique Weapon**: 395,200 \n **Epic Weapon**: 59,800 \n\n **Mythic Armor**: 2,262,000 \n **Legendary Armor**: 936,000 \n **Unique Armor**: 304,000 \n **Epic Armor**: 45,994"
                  },
                  {
                    name: "**__# of Max Uniques/Epics to Max__**",
                    value: "**Mythic Weapon**: 22.31 max uniques, 146.44 max epics \n **Legendary Weapon**: 9.23 max uniques, 60.6 max epics \n **Unique Weapon**: 3 max uniques, 19.68 max epics \n\n **Mythic Armor**: 17.16 max uniques, 112.65 max epics \n **Legendary Armor**: 7.1 max uniques, 46.61 max epics \n **Unique Armor**: 2.31 max uniques, 15.14 max epics"
                  },
                  {
                      name: "**__# of Epic Powders to Max__**",
                      value: "**Mythic Weapon**: 7,728.25 \n **Legendary Weapon**: 3197.90 \n **Unique Weapon**: 1038.63 \n **Epic Weapon**: 157.16 \n\n **Mythic Armor**: 5,944.81 \n **Legendary Armor**: 2459.92 \n **Unique Armor**: 798.95 \n **Epic Armor**: 120.88"
                  }
                ]
              }
            });
        }

        // fuse treasure data
        else if (fuseItem === 'treasure') {
            message.reply({embed: {
                color: 3447003,
                fields: [{
                    name: "**__Average Cost to max via treasure pulls__**",
                    value: "**Mythic Weapon**: 3.5b \n **Legendary Weapon**: 1.6b \n **Unique Weapon**: 520m \n **Epic Weapon**: 75m  \n\n **Mythic Armor**: 970m \n **Legendary Armor**: 400m \n **Unique Armor**: 130m \n **Epic Armor**: 18m"
                  },
                ]
              }
            });
        }

        // default
        else {
           message.reply(`Please enter !fuse help`)
           .catch(console.error);
        }
    }

    // jewel data
    if (command === 'jewel') {

        const [prop, value] = args;

        if (prop === 'red') {

            if (value === 'setbonus') {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Red Jewels Set Bonus__**")
                .addField("__SSS__", 
                "No Data")
                .addField("__SS__",
                "Phy ATK + 300 \n Mag ATK + 300 \n JMP + 10% \n Crit DMG RES + 4%")
                .addField("__S__", 
                "Phy ATK + 200 \n Mag ATK + 200 \n JMP + 5% \n Crit DMG RES + 2%")
                .addField("__A__", 
                "Phy ATK + 100 \n Mag ATK + 100 \n JMP + 2%")
                
            
            message.channel.send(embed);
            }

            else {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Red Jewels__**")
                .addField("__Phy/Mag ATK__", 
                "SSS: 80.00 \n SS: 60.00 \n S: 43.00 \n A: 30.00 \n B: 18.00 \n C: 10.00")
                .addField("__Jump %__",
                "SSS: 2.00 \n SS: 2.00 \n S: 1.50 \n A: 1.20 \n B: 0.90 \n C: 0.70")
                .addField("__Crit DMG RES %__", 
                "SSS: 1.00 \n SS: 0.80 \n S: 0.60 \n A: 0.40 \n B: 0.30 \n C: 0.20")
                
            
            message.channel.send(embed);
            }
        }
        
        else if (prop === "blue") {

            if (value === 'setbonus') {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Blue Jewels Set Bonus__**")
                .addField("__SSS__", 
                "No Data")
                .addField("__SS__",
                "Mag DEF + 500 \n Phy DMG + 5% \n SPD + 4% \n ACC + 3%")
                .addField("__S__", 
                "Mag DEF + 250 \n Phy DMG + 3% \n SPD + 2%")
                .addField("__A__", 
                "Mag DEF + 100 \n Phy DMG + 1% ")
                
            
            message.channel.send(embed);
            }
            else {

            
            const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTitle("**__Blue Jewels__**")
            .addField("__Phy DMG %__", 
            "SSS: 1.00 \n SS: 0.70 \n S: 0.50 \n A: 0.30 \n B: 0.20 \n C: 0.10")
            .addField("__ACC %__",
            "SSS: 2.10 \n SS: 1.60 \n S: 1.20 \n A: 0.90 \n B: 0.60 \n C: 0.40")
            .addField("__SPD %__", 
            "SSS: 2.50 \n SS: 2.00 \n S: 1.50 \n A: 1.20 \n B: 0.90 \n C: 0.70")
            .addField("__MAG DEF__", 
            "SSS: 200.00 \n SS: 143.00 \n S: 103.00 \n A: 73.00 \n B: 43.00 \n C: 23.00")
            
        
            message.channel.send(embed);
            }
        }

        else if (prop === "green") {

            if (value === 'setbonus') {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Green Jewels Set Bonus__**")
                .addField("__SSS__", 
                "No Data")
                .addField("__SS__",
                "Phy DEF + 500 \n Mag DMG + 5% \n SPD + 4% \n ACC + 3%")
                .addField("__S__", 
                "Phy DEF + 250 \n Mag DMG + 3% \n SPD + 2%")
                .addField("__A__", 
                "Phy DEF + 100 \n Mag DMG + 1% ")
                
            
            message.channel.send(embed);
            }

            else {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Green Jewels__**")
                .addField("__Mag DMG %__", 
                "SSS: 1.00 \n SS: 0.70 \n S: 0.50 \n A: 0.30 \n B: 0.20 \n C: 0.10")
                .addField("__Crit DMG %__",
                "SSS: 1.00 \n SS: 0.80 \n S: 0.50 \n A: 0.40 \n B: 0.30 \n C: 0.20")
                .addField("__EVD %__", 
                "SSS: 2.10 \n SS: 1.60 \n S: 1.20 \n A: 0.90 \n B: 0.60 \n C: 0.40")
                .addField("__PHY DEF__", 
                "SSS: 200.00 \n SS: 143.00 \n S: 103.00 \n A: 73.00 \n B: 43.00 \n C: 23.00")
                
            
                message.channel.send(embed);
            }
            
           
        }

        else if (prop === "yellow") {

            if (value === 'setbonus') {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Yellow Jewels Set Bonus__**")
                .addField("__SSS__", 
                "No Data")
                .addField("__SS__",
                "Drop + 3% \n EXP + 3% \n KBK RES + 200")
                .addField("__S__", 
                "Drop + 2% \n EXP + 1.5% \n KBK RES + 100")
                .addField("__A__", 
                "Drop + 1% \n EXP + 1%")
                
            
            message.channel.send(embed);
            }
            
            else {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Yellow Jewels__**")
                .addField("__EXP %__", 
                "SSS: 3.10 \n SS: 2.40 \n S: 1.80 \n A: 1.40 \n B: 0.90 \n C: 0.70")
                .addField("__PEN %__",
                "SSS: 3.80 \n SS: 2.00 \n S: 1.40 \n A: 0.90 \n B: 0.50 \n C: 0.20")
                .addField("__KBK Res__", 
                "SSS: 8.00 \n SS: 6.00 \n S: 4.00 \n A: 3.00 \n B: 2.00 \n C: 1.00")
                .addField("__Drop Rate %__", 
                "SSS: 1.60 \n SS: 1.30 \n S: 1.00 \n A: 0.80 \n B: 0.60 \n C: 0.50")
                
            
                message.channel.send(embed);
            }
            
        }

        else if (prop === "purple") {

            if (value === 'setbonus') {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Purple Jewels Set Bonus__**")
                .addField("__SSS__", 
                "No Data")
                .addField("__SS__",
                "Crit DMG + 2% \n Boss ATK + 3% \n Boss DEF + 3% \n Crit Rate + 2%")
                .addField("__S__", 
                "Crit DMG + 2% \n Boss ATK + 2% \n Boss DEF + 2%")
                .addField("__A__", 
                "Block + 4% \n Boss ATK + 1%")
                
            
            message.channel.send(embed);
            }
            else {
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle("**__Purple Jewels__**")
                .addField("__Crit Rate__", 
                "SSS: 0.70 \n SS: 0.60 \n S: 0.50 \n A: 0.40 \n B: 0.30 \n C: 0.20")
                .addField("__Boss ATK__",
                "SSS: 1.30 \n SS: 1.00 \n S: 0.70 \n A: 0.50 \n B: 0.30 \n C: 0.20")
                .addField("__Boss DEF__", 
                "SSS: 1.00 \n SS: 0.80 \n S: 0.60 \n A: 0.50 \n B: 0.30 \n C: 0.20")
                .addField("__Block__", 
                "SSS: 2.10 \n SS: 1.60 \n S: 1.20 \n A: 0.90 \n B: 0.60 \n C: 0.40")
                
            
                message.channel.send(embed);
            }
           
        }

        else if (prop === "help") {
            message.channel.send(`Type "!jewel <jewel color>" to view jewels of that color. Type "!jewel <jewel color> setbonus" for their set bonuses.`)
        }

        else {
            message.channel.send(`Please type "!jewel help".`)
        }
    }
    
    // list available bot commands
    if (command === 'help') {
        message.author.send({embed: {
            color: 3447003,
            fields: [{
                name: "**__Public Commands__**",
                value: "**!fuse** : help with fusing costs \n **!fuse help** : how to use !fuse \n **!fuse data** : fusing data \n **!fuse treasure** : treasure pull fusing data \n **!jewel** : jewel data \n **!chaos checkin** : check-in for chaos exped team \n **!chaos checkout** : check-out from chaos exped team \n **!chaos view** : view current chaos exped team \n **!help** : list of commands"
              },
              {
                  name: "**__Admin Commands__**",
                  value: "**!showconf** : show current configurations \n**!setconf** : edit configurations \n **!resetconf** : resets configurations to default settings \n **!chaos remove [number]** : remove current numbered player from chaos exped team \n **!chaos add [user]** : add user to chaos exped team (must be exact same spelling) **!chaos clear** : clear chaos exped team "
              }
            ]
          }
        })

        message.reply(`Check your DM!`)
    }


    if (command === 'cohv') {
        message.channel.send('litty mctitty')
    }

    
    // chaos expedition check-ins
    if(command === "chaos") {

        const [prop, value, secondValue] = args;

        let member = message.member.displayName;

        // checking in
        if (prop === "checkin") {

            if (value === '2') {

                if (chaosTeam2.includes(undefined) === false && chaosTeam2.length === 10) {

                    message.reply(`Chaos Team 2 is full`);
    
                    message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: "**__Chaos Team 2__**",
                            value: `1. ${chaosTeam2[0]} \n 2. ${chaosTeam2[1]} \n 3. ${chaosTeam2[2]} \n 4. ${chaosTeam2[3]} \n 5. ${chaosTeam2[4]} \n 6.${chaosTeam2[5]} \n 7.  ${chaosTeam2[6]} \n 8. ${chaosTeam2[7]} \n 9. ${chaosTeam2[8]} \n 10. ${chaosTeam2[9]}`
                          },
                        ]
                      }
                    })
                }
                
                else if (chaosTeam.includes(member) || chaosTeam2.includes(member)) {
                    return message.reply(`You're already checked in!`)
                }
    
                else {
    
                chaosTeam2.push(member);
            
                message.reply(`you just checked in to chaos team 2.`)
    
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Chaos Team 2__**",
                        value: `1. ${chaosTeam2[0]} \n 2. ${chaosTeam2[1]} \n 3. ${chaosTeam2[2]} \n 4. ${chaosTeam2[3]} \n 5. ${chaosTeam2[4]} \n 6.${chaosTeam2[5]} \n 7.  ${chaosTeam2[6]} \n 8. ${chaosTeam2[7]} \n 9. ${chaosTeam2[8]} \n 10. ${chaosTeam2[9]}`
                      },
                    ]
                  }
                })
            } 
        }

        else {  
            if (chaosTeam.includes(undefined) === false && chaosTeam.length === 10) {

                if (chaosTeam2.includes(member)) {
                    message.reply(`You are already checked in`)
                }

                else {
                    chaosTeam2.push(member);
    
                    message.reply(`Chaos team 1 is full, you have been added to chaos team 2`);
    
                    message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: "**__Chaos Team 2__**",
                            value: `1. ${chaosTeam2[0]} \n 2. ${chaosTeam2[1]} \n 3. ${chaosTeam2[2]} \n 4. ${chaosTeam2[3]} \n 5. ${chaosTeam2[4]} \n 6.${chaosTeam2[5]} \n 7.  ${chaosTeam2[6]} \n 8. ${chaosTeam2[7]} \n 9. ${chaosTeam2[8]} \n 10. ${chaosTeam2[9]}`
                          },
                        ]
                      }
                    })
                }
                }
                
                
            else if (chaosTeam.includes(member) || chaosTeam2.includes(member)) {
                return message.reply(`You're already checked in!`)
            }
    
            else {
    
                chaosTeam.push(member);
            
                message.reply(`you just checked in to chaos team 1.`)
    
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Chaos Team 1__**",
                        value: `1. ${chaosTeam[0]} \n 2. ${chaosTeam[1]} \n 3. ${chaosTeam[2]} \n 4. ${chaosTeam[3]} \n 5. ${chaosTeam[4]} \n 6.${chaosTeam[5]} \n 7.  ${chaosTeam[6]} \n 8. ${chaosTeam[7]} \n 9. ${chaosTeam[8]} \n 10. ${chaosTeam[9]}`
                      },
                    ]
                  }
                })
            } 
        }
            
 
    }
        
        // checking out
        else if (prop === "checkout") {
        
            function remove(array, element) {
                const index = array.indexOf(element);
            
                if (index !== -1) {
                    array.splice(index, 1);
                }
            }

            if (chaosTeam.includes(member)) {
                remove(chaosTeam, member);

                message.reply(`you have been removed from chaos team 1.`);
    
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Chaos Team 1__**",
                        value: `1. ${chaosTeam[0]} \n 2. ${chaosTeam[1]} \n 3. ${chaosTeam[2]} \n 4. ${chaosTeam[3]} \n 5. ${chaosTeam[4]} \n 6.${chaosTeam[5]} \n 7.  ${chaosTeam[6]} \n 8. ${chaosTeam[7]} \n 9. ${chaosTeam[8]} \n 10. ${chaosTeam[9]}`
                      },
                    ]
                  }
                })
            }

            else if(chaosTeam2.includes(member)) {
                remove(chaosTeam2, member);

                message.reply(`you have been removed from chaos team 2`);

                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Chaos Team 2__**",
                        value: `1. ${chaosTeam2[0]} \n 2. ${chaosTeam2[1]} \n 3. ${chaosTeam2[2]} \n 4. ${chaosTeam2[3]} \n 5. ${chaosTeam2[4]} \n 6.${chaosTeam2[5]} \n 7.  ${chaosTeam2[6]} \n 8. ${chaosTeam2[7]} \n 9. ${chaosTeam2[8]} \n 10. ${chaosTeam2[9]}`
                      },
                    ]
                  }
                })
            }
            else {
                message.reply(`You aren't checked in.`)
            }

        }

        // removing member
        else if (prop === 'remove') {
            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("Hey, you're not the boss of me!");
            }

            if (value === 'chaos1') {

                if (secondValue) {
                
                    if (chaosTeam[secondValue-1] !== undefined) {
                       
                        message.channel.send(`${chaosTeam[secondValue-1]} has been removed from chaos team 1.`)

                        chaosTeam.splice(secondValue-1, 1)
    
                        message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Chaos Team 1__**",
                                value: `1. ${chaosTeam[0]} \n 2. ${chaosTeam[1]} \n 3. ${chaosTeam[2]} \n 4. ${chaosTeam[3]} \n 5. ${chaosTeam[4]} \n 6.${chaosTeam[5]} \n 7.  ${chaosTeam[6]} \n 8. ${chaosTeam[7]} \n 9. ${chaosTeam[8]} \n 10. ${chaosTeam[9]}`
                                },
                            ]
                        }})
                    }

                    else {
                        message.channel.send(`There is no one to remove here.`)

                        message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Chaos Team 1__**",
                                value: `1. ${chaosTeam[0]} \n 2. ${chaosTeam[1]} \n 3. ${chaosTeam[2]} \n 4. ${chaosTeam[3]} \n 5. ${chaosTeam[4]} \n 6.${chaosTeam[5]} \n 7.  ${chaosTeam[6]} \n 8. ${chaosTeam[7]} \n 9. ${chaosTeam[8]} \n 10. ${chaosTeam[9]}`
                                },
                            ]
                        }})
                    }
                }

                else {
                    message.reply(`Please enter '!chaos remove <chaos1 or chaos2> <number>'`);
                }
                
            }

            else if (value === 'chaos2') {
                if (secondValue) {

                    if (chaosTeam[secondValue-1] !== undefined) {
                        message.channel.send(`${chaosTeam[secondValue-1]} has been removed from chaos team 2.`)

                        chaosTeam2.splice(secondValue-1, 1)
        
                        message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Chaos Team 2__**",
                                value: `1. ${chaosTeam2[0]} \n 2. ${chaosTeam2[1]} \n 3. ${chaosTeam2[2]} \n 4. ${chaosTeam2[3]} \n 5. ${chaosTeam2[4]} \n 6.${chaosTeam2[5]} \n 7.  ${chaosTeam2[6]} \n 8. ${chaosTeam2[7]} \n 9. ${chaosTeam2[8]} \n 10. ${chaosTeam2[9]}`
                            },
                            ]
                        }})
                    }

                    else {
                        message.channel.send(`There is no one to remove here`);

                        message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Chaos Team 2__**",
                                value: `1. ${chaosTeam2[0]} \n 2. ${chaosTeam2[1]} \n 3. ${chaosTeam2[2]} \n 4. ${chaosTeam2[3]} \n 5. ${chaosTeam2[4]} \n 6.${chaosTeam2[5]} \n 7.  ${chaosTeam2[6]} \n 8. ${chaosTeam2[7]} \n 9. ${chaosTeam2[8]} \n 10. ${chaosTeam2[9]}`
                            },
                            ]
                        }})
                    }
                }

                else {
                    message.reply(`Please enter '!chaos remove <chaos1 or chaos2> <number>'`)
                }
            }

            else {
                message.reply(`Please enter '!chaos remove <chaos1 or chaos2> <number>'`)
            }
            
        }

        // adding member
        else if (prop === 'add') {
            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("Hey, you're not the boss of me!");
            }

            if (value === 'chaos1') {


                if (chaosTeam.includes(secondValue)) {
                    return message.reply(`${secondValue} is already checked in to chaos team 1`)
                }

                else if (chaosTeam.includes(undefined) === false && chaosTeam.length === 10) {
                    return message.reply(`Chaos team 1 is already full!`)
                }
    
                else {
                    message.channel.send(`${secondValue} has been added to chaos team 1`)
    
                    chaosTeam.push(secondValue);
        
                    message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: "**__Chaos Team 1__**",
                            value: `1. ${chaosTeam[0]} \n 2. ${chaosTeam[1]} \n 3. ${chaosTeam[2]} \n 4. ${chaosTeam[3]} \n 5. ${chaosTeam[4]} \n 6.${chaosTeam[5]} \n 7.  ${chaosTeam[6]} \n 8. ${chaosTeam[7]} \n 9. ${chaosTeam[8]} \n 10. ${chaosTeam[9]}`
                          },
                        ]
                      }
                    })
                }
            }

            else if (value === 'chaos2') {

                if (chaosTeam2.includes(secondValue)) {
                    return message.reply(`${secondValue} is already checked in to chaos team 2`)
                }

                else if (chaosTeam2.includes(undefined) === false && chaosTeam2.length === 10) {
                    return message.reply(`Chaos team 2 is already full!`)
                }
    
                else {
                    message.channel.send(`${secondValue} has been added to chaos team 2`)
    
                    chaosTeam2.push(secondValue);
        
                    message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: "**__Chaos Team 1__**",
                            value: `1. ${chaosTeam[0]} \n 2. ${chaosTeam[1]} \n 3. ${chaosTeam[2]} \n 4. ${chaosTeam[3]} \n 5. ${chaosTeam[4]} \n 6.${chaosTeam[5]} \n 7.  ${chaosTeam[6]} \n 8. ${chaosTeam[7]} \n 9. ${chaosTeam[8]} \n 10. ${chaosTeam[9]}`
                          },
                        ]
                      }
                    })
                }
            }

            else {
                message.reply(`Please enter '!chaos add <chaos1 or chaos2><display name>`)
            }

            

            
        }
        
        // clearing teams
        else if (prop === "clear") {
            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("You're not an admin, sorry!");
            }

            if (value === '1') {
                chaosTeam = [];

                message.channel.send(`Chaos team 1 has been cleared.`)
            }

            else if (value === '2') {
                chaosTeam2 = [];

                message.channel.send(`Chaos team 2 has been cleared`)
            }

            else {
                message.reply(`Please enter which team you'd like to clear (1 or 2)`)
            }

            
        }

        // viewing teams
        else if (prop === "view") {

            if (value === '1') {
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Chaos Team 1__**",
                        value: `1. ${chaosTeam[0]} \n 2. ${chaosTeam[1]} \n 3. ${chaosTeam[2]} \n 4. ${chaosTeam[3]} \n 5. ${chaosTeam[4]} \n 6.${chaosTeam[5]} \n 7.  ${chaosTeam[6]} \n 8. ${chaosTeam[7]} \n 9. ${chaosTeam[8]} \n 10. ${chaosTeam[9]}`
                      },
                    ]
                  }
                })
            }

            else if (value === '2') {
                message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Chaos Team 2__**",
                        value: `1. ${chaosTeam2[0]} \n 2. ${chaosTeam2[1]} \n 3. ${chaosTeam2[2]} \n 4. ${chaosTeam2[3]} \n 5. ${chaosTeam2[4]} \n 6.${chaosTeam2[5]} \n 7.  ${chaosTeam2[6]} \n 8. ${chaosTeam2[7]} \n 9. ${chaosTeam2[8]} \n 10. ${chaosTeam2[9]}`
                      },
                    ]
                  }
                })
            }

            else {
                message.reply(`Please enter which team you'd like to view (1 or 2)`)
            }
           
        }

        // chaos help
        else if (prop === 'help') {

            message.author.send({embed: {
                color: 3447003,
                fields: [{
                    name: "**__Public Commands__**",
                    value: `**!chaos checkin <1 or 2>** : check yourself into chaos team 1/2. If chaos team 1 is full, automatically checks you in chaos team 2. Checks you in chaos team 1 if no number is typed. \n **!chaos checkout** : remove yourself from chaos team \n **!chaos view <1 or 2>** : view chaos team 1 or 2`
                  },
                  {
                    name: `**__GM Commands__**`,
                    value: `**!chaos clear <1 or 2>** : clears entire chaos team 1 or 2\n **!chaos add <chaos1 or chaos2><user>** : adds user to chaos team 1 or 2 (**important**: user must be exact same spelling as their display name or else it will double register if user checks in themselves) \n **!chaos remove <chaos1 or chaos2><number>** : removes member of that number from chaos team 1 or 2`
                  }
                ]
              }
            })

            message.reply(`Check your DM!`)
        }

        else {
            message.reply(`Please enter !chaos help`)
        }

    }

    
    // setting configurations command
    if(command === "setconf") {

        // grabbing value of admin
        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        // exits if user is not admin
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("Hey, you're not the boss of me!");
        }
        
        const [prop, ...value] = args;

      
        if (prop === 'help') {
            message.author.send({embed: {
                color: 3447003,
                title: '**__Configuration Help__**',
                description: `Hey GM! I'm here to teach you how to set up your own guild-specific configurations.`,
                fields: [{
                    name: "**__Why do I need to set configurations?__**",
                    value: "Every guild discord is different - they have their own specific channels, banquet times, GMs want their own reminder messages, etc etc. \n\n By setting configs, you are able to edit all of these to your liking."
                  },
                  {
                      name: "**__Configuration Keys and Value__**",
                      value: "There are 2 parts to my configurations: **keys and values**. \n\n The **key** is the type of configuration. \n\n Some examples of **keys** include 'expoMessage', 'expoChannel' & 'banquetTime'. \n\n The **value** is the value of that particular **key**, and it is what you will be changing. \n\n For example, the default **value** of the **key** 'expoChannel' is set to 'general'. This means that my expedition reminders will be sent to the channel called 'general' by default. \n\n If you don't have a channel called 'general', or want me to send exped reminders to a different channel, let's say to a channel called 'expedition-reminders', you would change the **value** of expoChannel to 'expedition-reminders'."
                  },
                  {
                    name: "**__Changing values__**",
                    value: "To change the value of a key, type !setconf followed by the **key** and then the **value** you want. \n\n For the example above, simply type **!setconf expoChannel expedition-reminders**. This will set my expedition reminder messages to send only to the channel **expedition-reminders**. \n\n You can then type **!showconf** to view your changes. \n\n Simple enough, right? \n\n If you're not getting reminders from me, there is probably an error in your configs (check spelling and/or letter casing). \n\n Now go edit your configs! "
                  },
                  {
                    name: "**__Keys and their functions__**",
                    value: "**privateMessage**: I will send this private DM to new guild members. \n\n **expoChannel**: The channel I will send my expedition reminders to. \n\n **expoMessage**: This message will be sent to the expoChannel 15 minutes prior to expeditions. \n\n **banquetTime**: the time you want me to remind your guild about banquet. You must enter time in this format: [minute][hour] military time. IE: 30 18 = 6:30pm \n\n **banquetChannel**: the channel I will send the banquetMessage to. \n\n **banquetMessage**: the message I will send to banquetChannel."
                  }
                ]
              }
            })

            return message.reply(`Check your DM!`)
        }

        // if invalid key is entered
        if(!bot.settings.has(message.guild.id, prop)) {
            return message.reply("This key is not in the configuration. Type !showconf to see your current keys.")
            .catch(console.error);
        }


        if (prop !== 'banquetTime') {

        // if blank value is entered
        if (prop === undefined ) {
            return message.reply("You cannot enter a blank key. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.")
            .catch(console.error);
        }

        if (value === undefined) {
            return message.reply(`You cannot enter a blank value. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.`)
        }

        // configurations help
       

        bot.settings.set(message.guild.id, value.join(" "), prop);
        
        message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
        }
       
        //settings banquet configs
        if (prop === 'banquetTime') {

            let minute = Number(value[0]);
            let hour = Number(value[1]);

            if (isNaN(minute) || isNaN(hour)) {
                return message.channel.send(`Please enter a valid time.`);
            }

            if ( minute > 60 || hour > 24) {
                return message.channel.send(`Please enter a valid time, with minute first and hour second, in military time. \n For example: 30 18 = 6:30pm.`)
            }

            if (minute < 0 || hour < 0) {
                return message.channel.send(`Please enter a valid time, with minute first and hour second, in military time. \n For example: 30 18 = 6:30pm`)
            }

            else {

                bot.settings.set(message.guild.id, value.join(" "), 'banquetTime');

                message.channel
                .send(`Your banquet time has been changed to ${value.join(" ")}.`)
                .catch(err => console.log(err))
                .then(process.exit);
                

    
            } 
        }
    }
    

    // shows current configuration
    if(command === "showconf") {

        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("You're not an admin, sorry!");
        }
        let configProps = Object.keys(guildConf).map(prop => {
          return `▶ ${prop} ▶  :  ${guildConf[prop]}\n\n`;
        });
        let configPropsJoin = configProps.join(" ")
        
        message.channel.send(`The following are the server's current configuration:
        \`\`\`${configPropsJoin}\`\`\``).catch(console.error);
    }


    // resets configurations to default
    if(command === 'resetconf') {

        const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
        if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
        if(!message.member.roles.has(adminRole.id)) {
          return message.reply("You're not an admin, sorry!");
        }

        bot.settings.delete(message.guild.id);
        message.channel.send(`You're configurations have been reset to default settings`)

    }

});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
  })

bot.login(config.token);