const commando = require('discord.js-commando');
const config = require('../../config.json');
const Discord = require('discord.js');

class jewel extends commando.Command{
    constructor(client){
        super(client, {
            name: 'jewel',
            group: 'forge',
            memberName: 'jewel',
            description: 'Jewel Data'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;
    
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
            
            
        
    }
}

module.exports = jewel;