const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')
const cron = require('node-cron');
const Enmap = require('enmap');



// enmap settings back-end
enmap = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep'
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
    fortMessage: '@everyone Guild fort in 15 minutes! Good luck!',
    fortChannel: 'general',
    checkInChannel: 'general',
    team1: {
        name: "Team 1",
        team: []
    },
    team2: {
        name: "Team 2",
        team: []
    },
    team3: {
        name: "Team 3",
        team: []
    } 
}


// when bot starts, banquet reminders are deployed with current banquetTime configs.
bot.on('ready', () => {
    console.log(`Serving ${bot.guilds.size} servers`);
    console.log('Ready boss!');

    bot.guilds.forEach(guild => {

        enmap.ensure(guild.id, defaultSettings);

        let banquetTime = enmap.get(guild.id, 'banquetTime');

       
            cron.schedule(`00 ${banquetTime} * * *`, () => {

                let banquetChannel = enmap.get(guild.id, 'banquetChannel');
                let banquetMessage = enmap.get(guild.id, 'banquetMessage');
    
                guild.channels
                    .find(channel => channel.name === banquetChannel)
                    .send(banquetMessage)
                    .catch(console.error);
            })
        
    })
})

// when bot is added to new guild
bot.on('guildCreate', guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);

    return guild.owner.send(`Hi! Thanks for adding Slime Bot. Please join my discord server to keep up with updates and ask questions! https://discord.gg/DVjQ39K`)

})

// delete settings when guild is deleted
bot.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
    enmap.delete(guild.id);
  }); 

// expedition reminders

cron.schedule('00 45 11,19 * * *', () => {

    bot.guilds.forEach((guild) => {

        enmap.ensure(guild.id, defaultSettings);

        let expoChannel = enmap.get(guild.id, "expoChannel");
            
        let expoMessage = enmap.get(guild.id, "expoMessage");

            
        guild.channels
            .find((channel) => {
                if (channel.name === expoChannel) {
                    channel
                        .send(expoMessage)
                        .catch(console.error);
                } else {
                    return;
                }
            })

    })
},
{
    scheduled: true,
    timeZone: "America/Los_Angeles"
});

// guild fort reminders
cron.schedule('00 45 20 * * *', () => {

    bot.guilds.forEach((guild) => {

        let fortChannel = enmap.get(guild.id, "fortChannel");
        
        let fortMessage = enmap.get(guild.id, "fortMessage");

            
        guild.channels
        .find((channel) => {
            if (channel.name === fortChannel) {
                channel
                    .send(fortMessage)
                    .catch(console.error);
            } else {
                return;
            }
        })
    })
       
         
},
{
    scheduled: true,
    timeZone: "America/Los_Angeles"
});

// auto clearing exped teams
cron.schedule('00 01 13,21 * * *', () => {

    bot.guilds.forEach((guild) => {

        enmap.ensure(guild.id, defaultSettings);

        enmap.set(guild.id, [], 'team1.team');
        enmap.set(guild.id, [], 'team2.team');
        enmap.set(guild.id, [], 'team3.team');
    })
},
{
    scheduled: true,
    timeZone: "America/Los_Angeles"
});


// welcome message to new guild member    
bot.on('guildMemberAdd', member => {

    enmap.ensure(member.guild.id, defaultSettings);

    let privateMessage = enmap.get(member.guild.id, "privateMessage");

    return member
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
    if (!message.guild || message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const guildConf = enmap.ensure(message.guild.id, defaultSettings);

    const fusing = (numberOfMaterials, materialCost, upgradeCost) => {
        return numberWithCommas(Math.round((numberOfMaterials * Number(materialCost))+ upgradeCost))
    }


    
    // if (command === 'send') {
    // bot.guilds.forEach(guild => guild.owner.send(`Hi all! Thanks for adding Slime Bot! Please join my discord server to ask any questions and keep up with updates! https://discord.gg/DVjQ39K`))
    // }
    

    // adding config to all guilds
    if (command === 'addconf') {
        enmap.forEach( (val, key) => enmap.set(key, {
            name: "Party 6",
            team: []
        }, "party6") );
    }

    // deleting config from all guilds
    if (command === 'deleteconf') {
        enmap.forEach( (val, key) => enmap.delete(key, "party6") );
    }

    // forge stuff
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
                    value: "1. Please type in !fuse followed by what you want to max (mythicweapon, legendaryweapon, uniquearmor, etc) \n \n 2. Follow that with your fusing material (maxepic, level1epic, maxunique) \n \n 3. Follow that with the cost of that fusing material (IE: 15000000, 10000000, etc) \n \n 4. Press Enter to find out your fusing cost! \n \n"
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
                      value: "maxunique, maxepic, level1epic"
                  },
                  {
                      name: "**__Other Fusing Commands__**",
                      value: "**!fuse data** : fusing data \n **!fuse treasure** : treasure pull data \n **!fuse pba** : shows weapon pba ranges \n **!fuse potential** : shows equip potentials \n **!fuse exalt** : shows exalt stats" 
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

        // pba sheet

        else if (fuseItem === 'pba') {
           
            return message.reply(`https://imgur.com/a/1lotika`)

        }

        else if (fuseItem === 'potential') {
            return message.reply(`https://imgur.com/a/zWIgBp9?`)
        }

        else if (fuseItem === 'exalt') {

            return message.reply(`https://imgur.com/a/Qp1eu9B`)
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
                "Boss Def + 1% \n Boss ATK + 1%")
                
            
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
            message.reply(`Type "!jewel <jewel color>" to view jewels of that color. Type "!jewel <jewel color> setbonus" for their set bonuses.`)
        }

        else {
            message.reply(`Please type "!jewel help".`)
        }
    }

   
    
    // list available bot commands
    if (command === 'help') {
        message.author.send({embed: {
            color: 3447003,
            fields: [{
                name: "**__Public Commands__**",
                value: "**!fuse** : fusing calc, cost, and various data \n **!jewel** : jewel data \n **!team** : expedition check-ins (can only be used in checkInChannel config) \n **!help** : list of commands"
              },
              {
                  name: "**__Admin Commands__**",
                  value: "**!showconf** : show current configurations \n**!setconf** : edit configurations \n **!resetconf** : resets configurations to default settings"
              }
            ]
          }
        })

        message.reply(`Check your DM!`)
    }

    

    // expedition check-ins
    
    if(command === "team") {

        const [ prop ] = args;

        let member = message.member.displayName;

        let team1 = enmap.get(message.guild.id, 'team1');

        let team2 = enmap.get(message.guild.id, 'team2');

        let team3 = enmap.get(message.guild.id, 'team3');

        let checkInChannel = enmap.get(message.guild.id, 'checkInChannel');

        let name1 = enmap.get(message.guild.id, 'team1.name');

        let name2 = enmap.get(message.guild.id, 'team2.name');

        let name3 = enmap.get(message.guild.id, 'team3.name');

        if (message.channel.name === checkInChannel) {

             // checking in
        if (prop === "checkin") {
        
        const [ prop, value ] = args;

            if (value === '3') {
                if (team3.team.includes(undefined) === false && team3.team.length === 10) {
                    message.reply(`${name3} is full`);
    
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name3}__**`,
                            value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                          },
                        ]
                      }
                    })
                }

                else if (team3.team.includes(member)) {
                    return message.reply(`You're already checked in!`)
                }

                else {
    
                    enmap.push(message.guild.id, member, 'team3.team');
                
                    message.reply(`you just checked in to ${name3}.`)
        
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name3}__**`,
                            value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                          },
                        ]
                      }
                    })
                } 
            }


            if (value === '2') {

                if (team2.team.includes(undefined) === false && team2.team.length === 10) {

                    message.reply(`${name2} is full`);
    
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name2}__**`,
                            value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                          },
                        ]
                      }
                    })
                }
                
                else if (team2.team.includes(member)) {
                    return message.reply(`You're already checked in!`)
                }
    
                else {
    
                enmap.push(message.guild.id, member, 'team2.team');
            
                message.reply(`you just checked in to ${name2}.`)
    
                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__${name2}__**`,
                        value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                      },
                    ]
                  }})
                } 
            }

            else {  
                // if team 1 is full
                if (team1.team.includes(undefined) === false && team1.team.length === 10) {

                    if (team2.team.includes(member) || team3.team.includes(member)) {
                        return message.reply(`You are already checked in`)
                    }

                    else if (team2.team.length === 10) {
                        enmap.push(message.guild.id, member, 'team3.team')

                        message.reply(`${name1} & ${name2} are full, you have been added to ${name3}`)

                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name3}__**`,
                                value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                            },
                            ] 
                        }
                        }) 
                    }
                    
                    else {
                        enmap.push(message.guild.id, member, 'team2.team');
        
                        message.reply(`${name1} is full, you have been added to ${name2}`);
        
                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name2}__**`,
                                value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                            },
                            ]
                        }
                        })
                    }
                    }
                    
                // if team 2 is full
                else if(team2.team.includes(undefined) === false && team2.team.length === 10) {

                    if (team1.team.includes(member) || team3.team.includes(member)) {
                        return message.reply(`You are already checked in`)
                    }

                    else if (team1.team.includes(undefined) && team1.team.length !== 10) {
                        enmap.push(message.guild.id, member, 'team1.team');

                        message.reply(`${name2} is full, you have been added to ${name1}`);

                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name1}__**`,
                                value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                            },
                            ]
                        }
                        })
                    }

                    else {
                        enmap.push(message.guild.id, member, 'team3.team');
        
                        message.reply(`${name2} is full, you have been added to ${name3}`);
        
                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name3}__**`,
                                value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                            },
                            ]
                        }
                        })
                    }
                }    

                else if (team1.team.includes(member)) {
                    return message.reply(`You're already checked in!`)
                }
        
                else {
        
                    enmap.push(message.guild.id, member, 'team1.team');
                
                    message.reply(`you just checked in to ${name1}.`)
            

                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name1}__**`,
                            value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                        },
                        ]
                    }
                    })
                } 
            }
        }
        
        // checking out
        else if (prop === "checkout") {
        
        const [prop, value] = args;

            if (team1.team.includes(member) && team2.team.includes(member) && team3.team.includes(member)) {

                if (value === '1') {
                    enmap.remove(message.guild.id, member, 'team1.team');
                

                    message.reply(`you have been removed from ${name1}.`);
        
                    message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name1}__**`,
                            value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                          },
                        ]
                      }
                    }) 
                }

                else if (value === '2') {
                    enmap.remove(message.guild.id, member, 'team2.team');

                    message.reply(`you have been removed from ${name2}`);

                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name2}__**`,
                            value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                        },
                        ]
                    }
                    })
                }

                else if (value === '3') {
                    enmap.remove(message.guild.id, member, 'team3.team');

                    message.reply(`you have been removed from ${name3}`);

                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name3}__**`,
                            value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                        },
                        ]
                    }
                    })
                }

                else if (value === 'all') {
                    enmap.remove(message.guild.id, member, 'team1.team');
                    enmap.remove(message.guild.id, member, 'team2.team');
                    enmap.remove(message.guild.id, member, 'team3.team');

                    message.reply(`you have been removed from all 3 teams.`)
                }

                else {
                    message.reply(`You are checked in to all 3 teams. Please specify which team you'd like to be checked out of.`)
                }
            }

            else if (team1.team.includes(member) && team2.team.includes(member)) {
                if (value === '1') {
                    enmap.remove(message.guild.id, member, 'team1.team');
                

                    message.reply(`you have been removed from ${name1}.`);
        
                    message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name1}__**`,
                            value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                          },
                        ]
                      }
                    }) 
                }

                else if (value === '2') {
                    enmap.remove(message.guild.id, member, 'team2.team');

                    message.reply(`you have been removed from ${name2}`);

                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name2}__**`,
                            value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                        },
                        ]
                    }
                    })
                }
                else if (value === 'all') {
                    enmap.remove(message.guild.id, member, 'team1.team');
                    enmap.remove(message.guild.id, member, 'team2.team');
                    

                    message.reply(`you have been removed from ${name1} & ${name2}.`)
                }

                else {
                    message.reply(`You are checked in to teams 1 & 2. Please specify which team you'd like to be checked out of.`)
                }
            }

            else if (team1.team.includes(member) && team3.team.includes(member)) {
                if (value === '1') {
                    enmap.remove(message.guild.id, member, 'team1.team');
                

                    message.reply(`you have been removed from ${name1}.`);
        
                    message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name1}__**`,
                            value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                          },
                        ]
                      }
                    }) 
                }

                else if (value === '3') {
                    enmap.remove(message.guild.id, member, 'team3.team');

                    message.reply(`you have been removed from ${name3}`);

                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name3}__**`,
                            value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                        },
                        ]
                    }
                    })
                }

                else if (value === 'all') {
                    enmap.remove(message.guild.id, member, 'team1.team');
                    enmap.remove(message.guild.id, member, 'team3.team');
                    

                    message.reply(`you have been removed from ${name1} & ${name3}.`)
                }

                else {
                    message.reply(`You are checked in to teams 1 & 3. Please specify which team you'd like to be checked out of.`)
                }
            }

            else if (team2.team.includes(member) && team3.team.includes(member)) {
                if (value === '2') {
                    enmap.remove(message.guild.id, member, 'team2.team');

                    message.reply(`you have been removed from ${name2}`);

                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name2}__**`,
                            value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                        },
                        ]
                    }
                    })
                }

                else if (value === '3') {
                    enmap.remove(message.guild.id, member, 'team3.team');

                    message.reply(`you have been removed from ${name3}`);

                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name3}__**`,
                            value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                        },
                        ]
                    }
                    })
                }

                else if (value === 'all') {
                    enmap.remove(message.guild.id, member, 'team2.team');
                    enmap.remove(message.guild.id, member, 'team3.team');
                    

                    message.reply(`you have been removed from ${name2} & ${name3}.`)
                }

                else {
                    message.reply(`You are checked in to teams 2 & 3. Please specify which team you'd like to be checked out of.`)
                }
            }

            else if (team1.team.includes(member)) {


                enmap.remove(message.guild.id, member, 'team1.team');
                

                message.reply(`you have been removed from ${name1}.`);
    
                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__${name1}__**`,
                        value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                      },
                    ]
                  }
                })
            }

            else if (team3.team.includes(member)) {

                enmap.remove(message.guild.id, member, 'team3.team');

                message.reply(`you have been removed from ${name3}`);

                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__${name3}__**`,
                        value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                      },
                    ]
                  }
                })
            }

            else if (team2.team.includes(member)) {
                enmap.remove(message.guild.id, member, 'team2.team');

                message.reply(`you have been removed from ${name2}`);

                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__${name2}__**`,
                        value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                      },
                    ]
                  }
                })
            }
            
            else {
                return message.reply(`You aren't checked in.`)
            }

        }

        // removing member
        else if (prop === 'remove') {

            const [prop, value, ...secondValue] = args;

            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("Hey, you're not the boss of me!");
            }

            if (value === 'team1') {

                if (secondValue.join(" ")) {

                    let value = team1.team[secondValue-1];
                
                    if (value !== undefined) {
                       
                        message.channel.send(`${value} has been removed from ${name1}.`)

                        enmap.remove(message.guild.id, value, 'team1.team');
    
                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name1}__**`,
                                value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                                },
                            ]
                        }})
                    }

                    else {
                        message.channel.send(`There is no one to remove here.`)

                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name1}__**`,
                                value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                                },
                            ]
                        }})
                    }
                }

                else {
                    return message.reply(`Please enter '!team remove <team1 or team2 or team3> <number>'`);
                }
                
            }

            else if (value === 'team2') {
                if (secondValue.join(" ")) {

                    let value2 = team2.team[secondValue-1];

                    if (value2 !== undefined) {
                        message.channel.send(`${value2} has been removed from ${name2}.`)

                        enmap.remove(message.guild.id, value2, 'team2.team');
        
                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name2}__**`,
                                value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                            },
                            ]
                        }})
                    }

                    else {
                        message.channel.send(`There is no one to remove here`);

                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name2}__**`,
                                value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                            },
                            ]
                        }})
                    }
                }

                else {
                    return message.reply(`Please enter '!team remove <team1 or team2 or team3> <number>'`)
                }
            }

            else if (value === 'team3') {
                if (secondValue.join(" ")) {

                    let value3 = team3.team[secondValue-1];

                    if (value3 !== undefined) {
                        message.channel.send(`${value3} has been removed from ${name3}.`)

                        enmap.remove(message.guild.id, value3, 'team3.team');
        
                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name3}__**`,
                                value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                              },
                            ]
                          }
                        })
                    }

                    else {
                        message.channel.send(`There is no one to remove here`);

                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: `**__${name3}__**`,
                                value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                              },
                            ]
                          }
                        })
                    }
                }

                else {
                    return message.reply(`Please enter '!team remove <team1 or team2 or team3> <number>'`)
                }
            }

            else {
                return message.reply(`Please enter '!team remove <team1 or team2 or team3> <number>'`)
            }
            
        }

        // adding member
        else if (prop === 'add') {
            const [prop, value, ...secondValue] = args;

            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("Hey, you're not the boss of me!");
            }

            if (value === 'team1') {


                if (team1.team.includes(secondValue.join(" "))) {
                    return message.reply(`${secondValue.join(" ")} is already checked in to ${name1}`)
                }

                else if (team1.team.includes(undefined) === false && team1.team.length === 10) {
                    return message.reply(`${name1} is already full!`)
                }
    
                else {
                    message.channel.send(`${secondValue.join(" ")} has been added to ${name1}`)
    

                    enmap.push(message.guild.id, secondValue.join(" "), 'team1.team');
        
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name1}__**`,
                            value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                          },
                        ]
                      }
                    })
                }
            }

            else if (value === 'team2') {

                if (team2.team.includes(secondValue.join(" "))) {
                    return message.reply(`${secondValue.join(" ")} is already checked in to ${name2}`)
                }

                else if (team2.team.includes(undefined) === false && team2.team.length === 10) {
                    return message.reply(`${name2} is already full!`)
                }
    
                else {
                    message.channel.send(`${secondValue.join(" ")} has been added to ${name2}`)
    
                    enmap.push(message.guild.id, secondValue.join(" "), 'team2.team');
        
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name2}__**`,
                            value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                          },
                        ]
                      }
                    })
                }
            }

            else if (value === 'team3') {

                if (team3.team.includes(secondValue.join(" "))) {
                    return message.reply(`${secondValue.join(" ")} is already checked in to ${name3}`)
                }

                else if (team3.team.includes(undefined) === false && team3.team.length === 10) {
                    return message.reply(`${name3} is already full!`)
                }
    
                else {
                    message.channel.send(`${secondValue.join(" ")} has been added to ${name3}`)
    
                    enmap.push(message.guild.id, secondValue.join(" "), 'team3.team');
        
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name3}__**`,
                            value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                          },
                        ]
                      }
                    })
                }
            }

            else {
                return message.reply(`Please enter '!team add <team1 or team2 or team3> <display name>`)
            }
        }
    
        
        // clearing teams
        else if (prop === "clear") {
            const [prop, value] = args;

            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("You're not an admin, sorry!");
            }

            if (value === '1') {
                enmap.set(message.guild.id, [], 'team1.team');

                return message.channel.send(`${name1} has been cleared.`)
            }

            else if (value === '2') {
                enmap.set(message.guild.id, [], 'team2.team');

                return message.channel.send(`${name2} has been cleared`)
            }
            
            else if (value === '3') {
                enmap.set(message.guild.id, [], 'team3.team');

                return message.channel.send(`${name3} has been cleared`)
            }

            else if ( value === 'all') {
                enmap.set(message.guild.id, [], 'team1.team');
                enmap.set(message.guild.id, [], 'team2.team');
                enmap.set(message.guild.id, [], 'team3.team');

                return message.channel.send(`All teams have been cleared`)
            }

            else {
                return message.reply(`Please enter which team you'd like to clear (1 or 2 or 3)`)
            }

            
        }

        // viewing teams
        else if (prop === "view") {
        
        const [prop, value] = args;

            enmap.ensure(message.guild.id, defaultSettings);

            if (value === '1') {
                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__${name1}__**`,
                        value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                      },
                    ]
                  }
                })
            }

            else if (value === '2') {
                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__${name2}__**`,
                        value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                      },
                    ]
                  }
                })
            }
            else if (value === '3') {

            
                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `**__${name3}__**`,
                        value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                      },
                    ]
                  }
                })
        }
            
        

            else if (value === 'all') {
                return message.channel.send({embed: {
                    color: 3447003,
                    fields: [
                        {
                        name: `**__${name1}__**`,
                        value: `1. ${team1.team[0]} \n 2. ${team1.team[1]} \n 3. ${team1.team[2]} \n 4. ${team1.team[3]} \n 5. ${team1.team[4]} \n 6. ${team1.team[5]} \n 7.  ${team1.team[6]} \n 8. ${team1.team[7]} \n 9. ${team1.team[8]} \n 10. ${team1.team[9]}`
                        },
                        {
                        name: `**__${name2}__**`,
                        value: `1. ${team2.team[0]} \n 2. ${team2.team[1]} \n 3. ${team2.team[2]} \n 4. ${team2.team[3]} \n 5. ${team2.team[4]} \n 6. ${team2.team[5]} \n 7.  ${team2.team[6]} \n 8. ${team2.team[7]} \n 9. ${team2.team[8]} \n 10. ${team2.team[9]}`
                        },
                        {
                        name: `**__${name3}__**`,
                        value: `1. ${team3.team[0]} \n 2. ${team3.team[1]} \n 3. ${team3.team[2]} \n 4. ${team3.team[3]} \n 5. ${team3.team[4]} \n 6. ${team3.team[5]} \n 7.  ${team3.team[6]} \n 8. ${team3.team[7]} \n 9. ${team3.team[8]} \n 10. ${team3.team[9]}`
                        },
                    ]
                  }
                })
            }

            else {
                return message.reply(`Please enter which team you'd like to view (1 or 2 or 3)`)
        }
    }
    

        // swapping members

        else if (prop === 'swap') {

            const [prop, firstTeam, firstNumber, secondTeam, secondNumber] = args;

            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("Hey, you're not the boss of me!");
            }

            if (firstTeam === 'team1' && secondTeam === 'team2') {
                let member1 = team1.team[firstNumber-1];

                let member2 = team2.team[secondNumber-1];

                if (member1 === undefined && member2 !== undefined) {

                    message.reply(`${member2} has been moved to ${name1}`);
    
                    enmap.push(message.guild.id, member2, 'team1.team');
    
                    enmap.remove(message.guild.id, member2, 'team2.team');
                }
    
                else if (member2 === undefined && member1 !== undefined) {
    
                    message.reply(`${member1} has been moved to ${name2}`);
    
                    enmap.push(message.guild.id, member1, 'team2.team');
    
                    enmap.remove(message.guild.id, member1, 'team1.team');
    
                    
                }
    
                else if (member2 === undefined && member1 === undefined) {
                    return message.reply(`There are no one in these positions!`)
                }
    
                else {
                    message.reply (`${member1} and ${member2} have been swapped.`)
    
                    enmap.push(message.guild.id, member1, 'team2.team');
    
                    enmap.remove(message.guild.id, member1, 'team1.team');
    
                    enmap.push(message.guild.id, member2, 'team1.team');
    
                    enmap.remove(message.guild.id, member2, 'team2.team');
    
                    
                }
            }

            else if (firstTeam === 'team1' && secondTeam === 'team3') {
                let member1 = team1.team[firstNumber-1];

                let member2 = team3.team[secondNumber-1];

                if (member1 === undefined && member2 !== undefined) {

                    message.reply(`${member2} has been moved to ${name1}`);
    
                    enmap.push(message.guild.id, member2, 'team1.team');
    
                    enmap.remove(message.guild.id, member2, 'team3.team');
                }
    
                else if (member2 === undefined && member1 !== undefined) {
    
                    message.reply(`${member1} has been moved to ${name3}`);
    
                    enmap.push(message.guild.id, member1, 'team3.team');
    
                    enmap.remove(message.guild.id, member1, 'team1.team');
    
                    
                }
    
                else if (member2 === undefined && member1 === undefined) {
                    return message.reply(`There are no one in these positions!`)
                }
    
                else {
                    message.reply (`${member1} and ${member2} have been swapped.`)
    
                    enmap.push(message.guild.id, member1, 'team3.team');
    
                    enmap.remove(message.guild.id, member1, 'team1.team');
    
                    enmap.push(message.guild.id, member2, 'team1.team');
    
                    enmap.remove(message.guild.id, member2, 'team3.team');
    
                }
            }

            else if (firstTeam === 'team2' && secondTeam === 'team3') {
                let member1 = team2.team[firstNumber-1];

                let member2 = team3.team[secondNumber-1];

                if (member1 === undefined && member2 !== undefined) {

                    message.reply(`${member2} has been moved to ${name2}`);
    
                    enmap.push(message.guild.id, member2, 'team2.team');
    
                    enmap.remove(message.guild.id, member2, 'team3.team');
                }
    
                else if (member2 === undefined && member1 !== undefined) {
    
                    message.reply(`${member1} has been moved to ${name3}`);
    
                    enmap.push(message.guild.id, member1, 'team3.team');
    
                    enmap.remove(message.guild.id, member1, 'team2.team');
    
                    
                }
    
                else if (member2 === undefined && member1 === undefined) {
                    return message.reply(`There are no one in these positions!`)
                }
    
                else {
                    message.reply (`${member1} and ${member2} have been swapped.`)
    
                    enmap.push(message.guild.id, member1, 'team3.team');
    
                    enmap.remove(message.guild.id, member1, 'team2.team');
    
                    enmap.push(message.guild.id, member2, 'team2.team');
    
                    enmap.remove(message.guild.id, member2, 'team3.team');
    
                }
            }

        }

        // changing team title

        else if (prop === 'edit') {

            const [ prop, value, ...secondValue ] = args;

            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {
                return message.reply("Hey, you're not the boss of me!");
            }

            if (value === 'team3') {
                enmap.set(message.guild.id, secondValue.join(" "), 'team3.name');
                return message.reply(`You have changed Team 3's name to ${secondValue.join(" ")}`)
            }

            else if (value === 'team2') {
                enmap.set(message.guild.id, secondValue.join(" "), 'team2.name');
                return message.reply(`You have changed Team 2's name to ${secondValue.join(" ")}`)
            }

            else if (value === 'team1') {
                enmap.set(message.guild.id, secondValue.join(" "), 'team1.name');
                return message.reply(`You have changed Team 1's name to ${secondValue.join(" ")}`)
            }
        }

        else if (prop === 'mention') {
            const [ prop, value, ...secondValue ] = args;


            if (value === 'team1') {

                let user1 = message.guild.members.find(member => member.displayName == team1.team[0]);

                let user2 = message.guild.members.find(member => member.displayName == team1.team[1]);

                let user3 = message.guild.members.find(member => member.displayName == team1.team[2]);

                let user4 = message.guild.members.find(member => member.displayName == team1.team[3]);

                let user5 = message.guild.members.find(member => member.displayName == team1.team[4]);

                let user6 = message.guild.members.find(member => member.displayName == team1.team[5]);

                let user7 = message.guild.members.find(member => member.displayName == team1.team[6]);

                let user8 = message.guild.members.find(member => member.displayName == team1.team[7]);

                let user9 = message.guild.members.find(member => member.displayName == team1.team[8]);

                let user10 = message.guild.members.find(member => member.displayName == team1.team[9]);


                    
                return message.channel.send(`${user1} ${user2} ${user3} ${user4} ${user5} ${user6} ${user7} ${user8} ${user9} ${user10} ${secondValue.join(" ")}`)
            }

            if (value === 'team2') {
                let user1 = message.guild.members.find(member => member.displayName == team2.team[0]);

                let user2 = message.guild.members.find(member => member.displayName == team2.team[1]);

                let user3 = message.guild.members.find(member => member.displayName == team2.team[2]);

                let user4 = message.guild.members.find(member => member.displayName == team2.team[3]);

                let user5 = message.guild.members.find(member => member.displayName == team2.team[4]);

                let user6 = message.guild.members.find(member => member.displayName == team2.team[5]);

                let user7 = message.guild.members.find(member => member.displayName == team2.team[6]);

                let user8 = message.guild.members.find(member => member.displayName == team2.team[7]);

                let user9 = message.guild.members.find(member => member.displayName == team2.team[8]);

                let user10 = message.guild.members.find(member => member.displayName == team2.team[9]);

                    
                return message.channel.send(`${user1} ${user2} ${user3} ${user4} ${user5} ${user6} ${user7} ${user8} ${user9} ${user10} ${secondValue.join(" ")}`)
            }

            if (value === 'team3') {
                
                let user1 = message.guild.members.find(member => member.displayName == team3.team[0]);

                let user2 = message.guild.members.find(member => member.displayName == team3.team[1]);

                let user3 = message.guild.members.find(member => member.displayName == team3.team[2]);

                let user4 = message.guild.members.find(member => member.displayName == team3.team[3]);

                let user5 = message.guild.members.find(member => member.displayName == team3.team[4]);

                let user6 = message.guild.members.find(member => member.displayName == team3.team[5]);

                let user7 = message.guild.members.find(member => member.displayName == team3.team[6]);

                let user8 = message.guild.members.find(member => member.displayName == team3.team[7]);

                let user9 = message.guild.members.find(member => member.displayName == team3.team[8]);

                let user10 = message.guild.members.find(member => member.displayName == team3.team[9]);

                        
                return message.channel.send(`${user1} ${user2} ${user3} ${user4} ${user5} ${user6} ${user7} ${user8} ${user9} ${user10} ${secondValue.join(" ")}`)
        
            }
        }
        
        // team help
        else if (prop === 'help') {
        
            const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

            if(!adminRole) return message.reply("Administrator Role Not Found");
        
        
            if(!message.member.roles.has(adminRole.id)) {

                message.author.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Public Commands__**",
                        value: `**!team checkin <1 or 2 or 3>** : check yourself into team 1/2/3. If team 1 is full, checks you in team 2. If team 2 is full, checks you in to team 3. Checks you in team 1 if no number is typed. \n **!team checkout <1 or 2 or 3>** : remove yourself from team 1/2/3 \n **!team checkout all** : remove yourself from all teams \n**!team view <1 or 2 or 3>** : view team 1/2/3 \n **!team view all** : view all teams`
                      }]
                    }
                  })

                return message.reply(`Check your DM!`)
            }

            else {
                message.author.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "**__Public Commands__**",
                        value: `**!team checkin <1 or 2 or 3>** : check yourself into team 1/2/3. If team 1 is full, checks you in team 2. If team 2 is full, checks you in to team 3. Checks you in team 1 if no number is typed. \n **!team checkout <1 or 2 or 3>** : remove yourself from team 1/2/3 \n **!team checkout all** : remove yourself from all teams \n**!team view <1 or 2 or 3>** : view team 1/2/3 \n **!team view all** : view all teams`
                      },{
                        name: `**__GM Commands Part 1__**`,
                        value: `**!team clear <1 or 2 or 3>** : clears entire team 1/2/3 \n **!team clear all** : clear all teams \n **!team add <team1 or team2 or team3> <user>** : adds user to team 1/2/3 (**important**: user must be exact same spelling as their display name or else it will double register if user checks in themselves)`
                      },{
                        name: `**__GM Commands Part 2__**`,
                        value: `**!team remove <team1 or team2 or team3> <number>** : removes member of that number from team 1/2/3 \n **!team swap <teamNumber> <number> <teamNumber> <number>** : swaps numbered player from team number with numbered player from team number. If any positions are empty, just simply moves player over. \n **!team edit <teamNumber> <name>** : edits numbered team's name`
                      }
                    ]
                  }
                })
                
                return message.reply(`Check your DM!`)
            }
        }
    
        else {
            return message.reply(`Please enter !team help`)
        }
    }

    else {
        return message.reply(`This command is not available in this channel`)
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
        if(!enmap.has(message.guild.id, prop)) {
            return message.reply("This key is not in the configuration. Type !showconf to see your current keys.")
            .catch(console.error);
        }

        if (prop === 'team1' || prop === 'team2' || prop === 'team3') {
            return message.reply(`You cannot set these configurations. Use the '!team' command`)
        }

        

        if (prop !== 'banquetTime') {

            // if blank value is entered
            if (prop === undefined ) {
                return message.reply("You cannot enter a blank key. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.")
                .catch(console.error);
            }

            else if (value === undefined) {
                return message.reply(`You cannot enter a blank value. Type '!setconf help' for configuration help, or '!showconf' for your current configurations.`)
            }
                enmap.ensure(message.guild.id, defaultSettings)
            
                enmap.set(message.guild.id, value.join(" "), prop);
            
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

            if (value[2]) {
               return message.channel.send(`Please enter a valid time, with minute first and hour second, in military time. \n For example: 30 18 = 6:30pm.`)
            }

            else {

                enmap.set(message.guild.id, value.join(" "), 'banquetTime');

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

        enmap.delete(message.guild.id);
        message.channel.send(`You're configurations have been reset to default settings`)

    }

});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
  })

bot.on('error', err => {
    console.log(err);
});

bot.login(config.token);