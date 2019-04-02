const commando = require('discord.js-commando');
const config = require('../../config.json');

class Party extends commando.Command{
    constructor(client){
        super(client, {
            name: 'party',
            group: 'party',
            memberName: 'party',
            description: 'Organizing Party Commands'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;

        const guildConf = enmap.ensure(message.guild.id, defaultSettings);

        let member = message.member.displayName;
        
        // expedition check-ins
    
        if (command === "party") {

            const [ prop ] = args;

    

                let party1 = enmap.get(message.guild.id, 'party.party1.team');
                let party2 = enmap.get(message.guild.id, 'party.party2.team');
                let party3 = enmap.get(message.guild.id, 'party.party3.team');

                let partyTeam1 = 'party.party1.team';
                let partyTeam2 = 'party.party2.team';
                let partyTeam3 = 'party.party3.team';
                
                let partyName1 = 'party.party1.name';
                let partyName2 = 'party.party2.name';
                let partyName3 = 'party.party3.name';

                const partyPush = (member, party) => {
                    return enmap.push(message.guild.id, member, party);
                }

                const partyRemove = (member, party) => {
                    return enmap.remove(message.guild.id, member, party);
                }

                const partySet = (value, party) => {
                    return enmap.set(message.guild.id, value, party);
                }

                const partyList = (index, partyNumber) => {
                    return partyNumber[index] === undefined ? " " : partyNumber[index];
                }

                const partyEmbed = (name, partyNumber) => {
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name}__**`,
                            value: `1. ${partyList(0, partyNumber)} \n 2. ${partyList(1, partyNumber)} \n 3. ${partyList(2, partyNumber)} \n 4. ${partyList(3, partyNumber)} \n 5. ${partyList(4, partyNumber)} \n 6. ${partyList(5, partyNumber)}`
                        },
                        ]
                    }
                    })
                }

                let fullparty1 = !party1.includes(undefined) && party1.length === 6;
                let fullparty2 = !party2.includes(undefined) && party2.length === 6;
                let fullparty3 = !party3.includes(undefined) && party3.length === 6;

                let includesMember1 = party1.includes(member);
                let includesMember2 = party2.includes(member);
                let includesMember3 = party3.includes(member);
               
                let name1 = enmap.get(message.guild.id, 'party.party1.name');
                let name2 = enmap.get(message.guild.id, 'party.party2.name');
                let name3 = enmap.get(message.guild.id, 'party.party3.name');
                
                // checking in
                if (prop === "checkin") {
                
                    const [ prop, value ] = args;

                    if (value === '3') {

                        if (fullparty3) {
                            message.reply(`${name3} is full`);
            
                            partyEmbed(name3, party3);
                        }

                        else if (party3.includes(member)) {
                            return message.reply(`You're already checked in!`)
                        }

                        else {
            
                            partyPush(member, partyTeam3)
                        
                            message.reply(`you just checked in to ${name3}.`)
                
                            partyEmbed(name3, party3);
                        } 
                    }


                    else if (value === '2') {

                        if (fullparty2) {

                            message.reply(`${name2} is full`);
            
                            partyEmbed(name2, party2);
                        }
                        
                        else if (party2.includes(member)) {
                            return message.reply(`You're already checked in!`)
                        }
            
                        else {
            
                            partyPush(member, partyTeam2)
                        
                            message.reply(`you just checked in to ${name2}.`)
                
                            partyEmbed(name2, party2);
                        }
                    }

                    else if (value === 'all') {
                        

                        if (fullparty1 && fullparty2 && fullparty3) {
                            return message.reply(`Sorry, all partys are full!`)
                        }

                        else if (fullparty1 && fullparty2) {
                            partyPush(mmeber, partyTeam3);

                            message.reply(`Sorry, ${name1} and ${name2} are full, you have checked in to only ${name3}`)

                            partyEmbed(name3, party3);
                        }

                        else if (fullparty1 && fullparty3) {
                            partyPush(member, partyTeam2);

                            message.reply(`${name1} and ${name3} are full, you have checked in to only ${name2}`)

                            partyEmbed(name2, party2);
                        }

                        else if (fullparty2 && fullparty3) {
                            partyPush(member, partyTeam1)

                            message.reply(`${name2} and ${name3} are full, you have checked in to only ${name1}`)

                            partyEmbed(name1, party1);
                        }

                        else if (fullparty1) {
                            partyPush(member, partyTeam2);
                            partyPush(member, partyTeam3);

                            message.reply(`${name1} is full, you have checked into ${name2} and ${name3}`)
                        }

                        else if (fullparty2) {
                            partyPush(member, partyTeam1);
                            partyPush(member, partyTeam3);

                            message.reply(`${name2} is full, you have checked into ${name1} and ${name3}`)
                        }

                        else if (fullparty3) {
                            partyPush(member, partyTeam1);
                            partyPush(member, partyTeam2);

                            message.reply(`${name3} is full, you have checked into ${name1} and ${name2}`)
                        }

                        else {
                            partyPush(member, partyTeam1);
                            partyPush(member, partyTeam2);
                            partyPush(member, partyTeam3)

                            message.reply(`You have checked into all partys`)
                        }
                    }

                    else {  
                        // if party 1 is full
                        if (fullparty1) {

                            if (party2.includes(member) || party3.includes(member)) {
                                return message.reply(`${name1} is full, and you are already in ${name2} and ${name3}`)
                            }

                            else if (fullparty2) {

                                if (fullparty3) {
                                    return message.reply(`All partys are full!`)
                                }

                                partyPush(member, partyTeam3);

                                message.reply(`${name1} & ${name2} are full, you have been added to ${name3}`)

                                partyEmbed(name3, party3);
                            }
                            
                            else {
                                partyPush(member, partyTeam2);
                
                                message.reply(`${name1} is full, you have been added to ${name2}`);
                
                                partyEmbed(name2, party2);
                            }
                            }
                            
                        // if party 2 is full
                        else if(fullparty2) {

                            if (party1.includes(member) || party3.includes(member)) {
                                return message.reply(`${name2} is full, and you are already checked in to ${name1} and ${name3}`)
                            }

                            else if (party1.includes(undefined) && party1.length !== 6) {
                                partyPush(member, partyTeam1);

                                message.reply(`${name2} is full, you have been added to ${name1}`);

                                partyEmbed(name1, party1);
                            }

                            else {

                                if (fullparty3) {
                                    return message.reply(`All partys are full!`)
                                }
                                partyPush(member, partyTeam3);
                
                                message.reply(`${name2} is full, you have been added to ${name3}`);
                
                                partyEmbed(name3, partyTeam3);
                            }
                        }    

                        else if (party1.includes(member)) {
                            return message.reply(`You're already checked in!`)
                        }
                
                        else {
                
                            partyPush(member, partyTeam1);
                        
                            message.reply(`you just checked in to ${name1}.`)
                    
                            partyEmbed(name1, party1);
                        } 
                    }
                }
                
                // checking out
                else if (prop === "checkout") {
                
                const [prop, value] = args;

                    if (includesMember1 && includesMember2 && includesMember3) {

                        if (value === '1') {
                            partyRemove(member, partyTeam1);
                        
                            message.reply(`you have been removed from ${name1}.`);
                
                            partyEmbed(name1, party1);
                        }

                        else if (value === '2') {
                            partyRemove(member, partyTeam2);

                            message.reply(`you have been removed from ${name2}`);

                            partyEmbed(name2, party2);
                        }

                        else if (value === '3') {
                            partyRemove(member, partyTeam3);

                            message.reply(`you have been removed from ${name3}`);

                            partyEmbed(name3, party3);
                        }

                        else if (value === 'all') {
                            partyRemove(member, partyTeam1);
                            partyRemove(member, partyTeam2);
                            partyRemove(member, partyTeam3);

                            message.reply(`you have been removed from all 3 partys.`)
                        }

                        else {
                            message.reply(`You are checked in to all 3 partys. Please specify which party you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember1 && includesMember2) {

                        if (value === '1') {
                            partyRemove(member, partyTeam1);
                        
                            message.reply(`you have been removed from ${name1}.`);
                
                            partyEmbed(name1, party1);
                        }

                        else if (value === '2') {
                            partyRemove(member, partyTeam2);

                            message.reply(`you have been removed from ${name2}`);

                            partyEmbed(name2, party2);
                        }
                        else if (value === 'all') {
                            partyRemove(member, partyTeam1);
                            partyRemove(member, partyTeam2);
                            

                            message.reply(`you have been removed from ${name1} & ${name2}.`)
                        }

                        else {
                            message.reply(`You are checked in to partys 1 & 2. Please specify which party you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember1 && includesMember3) {

                        if (value === '1') {
                            partyRemove(member, partyTeam1);
                        
                            message.reply(`you have been removed from ${name1}.`);
                
                            partyEmbed(name1, party1);
                        }

                        else if (value === '3') {
                            partyRemove(member, partyTeam3);

                            message.reply(`you have been removed from ${name3}`);

                            partyEmbed(name3, party3);
                        }

                        else if (value === 'all') {
                            partyRemove(member, partyTeam1);
                            partyRemove(member, partyTeam3);
                            

                            message.reply(`you have been removed from ${name1} & ${name3}.`)
                        }

                        else {
                            message.reply(`You are checked in to partys 1 & 3. Please specify which party you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember2 && includesMember3) {

                        if (value === '2') {
                            partyRemove(member, partyTeam2);

                            message.reply(`you have been removed from ${name2}`);

                            partyEmbed(name2, party2);
                        }

                        else if (value === '3') {
                            partyRemove(member, partyTeam3);

                            message.reply(`you have been removed from ${name3}`);

                            partyEmbed(name3, party3);
                        }

                        else if (value === 'all') {
                            partyRemove(member, partyTeam2);
                            partyRemove(member, partyTeam3);
                            

                            message.reply(`you have been removed from ${name2} & ${name3}.`)
                        }

                        else {
                            message.reply(`You are checked in to partys 2 & 3. Please specify which party you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember1) {

                        partyRemove(member, partyTeam1);
                        
                        message.reply(`you have been removed from ${name1}.`);
            
                        partyEmbed(name1, party1);
                    }

                    else if (includesMember2) {
                        partyRemove(member, partyTeam2);

                        message.reply(`you have been removed from ${name2}`);

                        partyEmbed(name2, party2);
                    }

                    else if (includesMember3) {

                        partyRemove(member, partyTeam3);

                        message.reply(`you have been removed from ${name3}`);

                        partyEmbed(name3, party3);
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

                    if (value === 'party1') {

                        if (secondValue.join(" ")) {

                            let value = party1[secondValue-1];
                        
                            if (value !== undefined) {
                            
                                message.channel.send(`${value} has been removed from ${name1}.`)

                                partyRemove(value, partyTeam1)
            
                                partyEmbed(name1, party1);
                            }

                            else {
                                message.channel.send(`There is no one to remove here.`)

                                partyEmbed(name1, party1);
                            }
                        }

                        else {
                            return message.reply(`Please enter '!party remove <party1 or party2 or party3> <number>'`);
                        }
                        
                    }

                    else if (value === 'party2') {

                        if (secondValue.join(" ")) {

                            let value2 = party2[secondValue-1];

                            if (value2 !== undefined) {
                                message.channel.send(`${value2} has been removed from ${name2}.`)

                                partyRemove(value, partyTeam2);
                
                                partyEmbed(name2, party2);
                            }

                            else {
                                message.channel.send(`There is no one to remove here`);

                                partyEmbed(name2, party2);
                            }
                        }

                        else {
                            return message.reply(`Please enter '!party remove <party1 or party2 or party3> <number>'`)
                        }
                    }

                    else if (value === 'party3') {

                        if (secondValue.join(" ")) {

                            let value3 = party3[secondValue-1];

                            if (value3 !== undefined) {
                                message.channel.send(`${value3} has been removed from ${name3}.`)

                                partyRemove(value, partyTeam3);
                
                                partyEmbed(name3, party3);
                            }

                            else {
                                message.channel.send(`There is no one to remove here`);

                                partyEmbed(name3, party3);
                            }
                        }

                        else {
                            return message.reply(`Please enter '!party remove <party1 or party2 or party3> <number>'`)
                        }
                    }

                    else {
                        return message.reply(`Please enter '!party remove <party1 or party2 or party3> <number>'`)
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

                    if (value === 'party1') {


                        if (party1.includes(secondValue.join(" "))) {
                            return message.reply(`${secondValue.join(" ")} is already checked in to ${name1}`)
                        }

                        else if (fullparty1) {
                            return message.reply(`${name1} is already full!`)
                        }
            
                        else {
                            message.channel.send(`${secondValue.join(" ")} has been added to ${name1}`)

                            partyPush(secondValue.join(" "), partyTeam1)
                
                            partyEmbed(name1, party1);
                        }
                    }

                    else if (value === 'party2') {

                        if (party2.includes(secondValue.join(" "))) {
                            return message.reply(`${secondValue.join(" ")} is already checked in to ${name2}`)
                        }

                        else if (fullparty2) {
                            return message.reply(`${name2} is already full!`)
                        }
            
                        else {
                            message.channel.send(`${secondValue.join(" ")} has been added to ${name2}`)
            
                            partyPush(secondValue.join(" "), partyTeam2)
                
                            partyEmbed(name2, party2);
                        }
                    }

                    else if (value === 'party3') {

                        if (party3.includes(secondValue.join(" "))) {
                            return message.reply(`${secondValue.join(" ")} is already checked in to ${name3}`)
                        }

                        else if (fullparty3) {
                            return message.reply(`${name3} is already full!`)
                        }
            
                        else {
                            message.channel.send(`${secondValue.join(" ")} has been added to ${name3}`)
            
                            partyPush(secondValue.join(" "), partyTeam3)
                
                            partyEmbed(name3, party3);
                        }
                    }

                    else {
                        return message.reply(`Please enter '!party add <party1 or party2 or party3> <display name>`)
                    }
                }
        
            
                // clearing partys
                else if (prop === "clear") {

                    const [prop, value] = args;

                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                    if(!message.member.roles.has(adminRole.id)) {
                        return message.reply("You're not an admin, sorry!");
                    }

                    if (value === '1') {
                        partySet([], partyTeam1);

                        return message.channel.send(`${name1} has been cleared.`)
                    }

                    else if (value === '2') {
                        partySet([], partyTeam2);

                        return message.channel.send(`${name2} has been cleared`)
                    }
                    
                    else if (value === '3') {
                        partySet([], partyTeam3);

                        return message.channel.send(`${name3} has been cleared`)
                    }

                    else if ( value === 'all') {
                        partySet([], partyTeam1);
                        partySet([], partyTeam2);
                        partySet([], partyTeam3);

                        return message.channel.send(`All partys have been cleared`)
                    }

                    else {
                        return message.reply(`Please enter which party you'd like to clear (1 or 2 or 3)`)
                    }

                    
                }

                // viewing partys
                else if (prop === "view") {
                
                const [prop, value] = args;

                    enmap.ensure(message.guild.id, defaultSettings);

                    if (value === '1') {
                        partyEmbed(name1, party1);
                    }

                    else if (value === '2') {
                        partyEmbed(name2, party2);
                    }

                    else if (value === '3') {
                        partyEmbed(name3, party3);
                    }

                    else if (value === 'all') {

                        const partyList = (index, party) => {
                            return party[index] === undefined ? " " : party[index];
                        }

                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [
                                {
                                name: `**__${name1}__**`,
                                value: `1. ${partyList(0, party1)} \n 2. ${partyList(1, party1)} \n 3. ${partyList(2, party1)} \n 4. ${partyList(3, party1)} \n 5. ${partyList(4, party1)} \n 6. ${partyList(5, party1)}`
                                },
                                {
                                name: `**__${name2}__**`,
                                value: `1. ${partyList(0, party2)} \n 2. ${partyList(1, party2)} \n 3. ${partyList(2, party2)} \n 4. ${partyList(3, party2)} \n 5. ${partyList(4, party2)} \n 6. ${partyList(5, party2)} `
                                },
                                {
                                name: `**__${name3}__**`,
                                value: `1. ${partyList(0, party3)} \n 2. ${partyList(1, party3)} \n 3. ${partyList(2, party3)} \n 4. ${partyList(3, party3)} \n 5. ${partyList(4, party3)} \n 6. ${partyList(5, party3)} `
                                },
                            ]
                        }
                        })
                    }

                    else {
                        return message.reply(`Please enter which party you'd like to view (1 or 2 or 3)`)
                }
                }
        
                // swapping members

                else if (prop === 'swap') {

                    const [prop, firstparty, firstNumber, secondparty, secondNumber] = args;

                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                
                    if(!message.member.roles.has(adminRole.id)) {
                        return message.reply("Hey, you're not the boss of me!");
                    }

                    if (firstparty === 'party1' && secondparty === 'party2') {
                        let member1 = party1[firstNumber-1];

                        let member2 = party2[secondNumber-1];

                        if (member1 === undefined && member2 !== undefined) {

                            message.reply(`${member2} has been moved to ${name1}`);

                            partyPush(member2, partyTeam1);

                            partyRemove(member2, partyTeam2);
            
                        }
            
                        else if (member2 === undefined && member1 !== undefined) {
            
                            message.reply(`${member1} has been moved to ${name2}`);
            
                            partyPush(member2, partyTeam2);

                            partyRemove(member2, partyTeam1);
            
                            
                        }
            
                        else if (member2 === undefined && member1 === undefined) {
                            return message.reply(`There are no one in these positions!`)
                        }
            
                        else {
                            message.reply (`${member1} and ${member2} have been swapped.`)
            
                            partyPush(member1, partyTeam2);

                            partyRemove(member1, partyTeam1);

                            partyPush(member2, partyTeam1);

                            partyRemove(member2, partyTeam2);
            
                            
                        }
                    }

                    else if (firstparty === 'party1' && secondparty === 'party3') {
                        let member1 = party1.party[firstNumber-1];

                        let member2 = party3.party[secondNumber-1];

                        if (member1 === undefined && member2 !== undefined) {

                            message.reply(`${member2} has been moved to ${name1}`);
            
                            partyPush(member2, partyTeam1);

                            partyRemove(member2, partyTeam3);
                        }
            
                        else if (member2 === undefined && member1 !== undefined) {
            
                            message.reply(`${member1} has been moved to ${name3}`);
            
                            partyPush(member1, partyTeam3);

                            partyRemove(member1, partyTeam1);
            
                            
                        }
            
                        else if (member2 === undefined && member1 === undefined) {
                            return message.reply(`There are no one in these positions!`)
                        }
            
                        else {
                            message.reply (`${member1} and ${member2} have been swapped.`)
                            
                            partyPush(member1, partyTeam3);

                            partyRemove(member1, partyTeam1);

                            partyPush(member2, partyTeam1);

                            partyRemove(member2, partyTeam3);
                            
                        }
                    }

                    else if (firstparty === 'party2' && secondparty === 'party3') {
                        let member1 = party2.party[firstNumber-1];

                        let member2 = party3.party[secondNumber-1];

                        if (member1 === undefined && member2 !== undefined) {

                            message.reply(`${member2} has been moved to ${name2}`);
            
                            partyPush(member2, partyTeam2);

                            partyRemove(member2, partyTeam3);
                        }
            
                        else if (member2 === undefined && member1 !== undefined) {
            
                            message.reply(`${member1} has been moved to ${name3}`);
            
                            partyPush(member1, partyTeam3);

                            partyRemove(member1, partyTeam2);
            
                            
                        }
            
                        else if (member2 === undefined && member1 === undefined) {
                            return message.reply(`There are no one in these positions!`)
                        }
            
                        else {
                            message.reply (`${member1} and ${member2} have been swapped.`)

                            partyPush(member1, partyTeam3);

                            partyRemove(member1, partyTeam2);

                            partyPush(member2, partyTeam2);

                            partyRemove(member2, partyTeam3);
            
                        }
                    }

                }

                // changing party title

                else if (prop === 'edit') {

                    const [ prop, value, ...secondValue ] = args;

                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                
                    if(!message.member.roles.has(adminRole.id)) {
                        return message.reply("Hey, you're not the boss of me!");
                    }

                    if (value === 'party3') {

                        partySet(secondValue.join(" "), partyName3);

                        return message.reply(`You have changed party 3's name to ${secondValue.join(" ")}`)
                    }

                    else if (value === 'party2') {

                        partySet(secondValue.join(" "), partyName2);

                        return message.reply(`You have changed party 2's name to ${secondValue.join(" ")}`)
                    }

                    else if (value === 'party1') {

                        partySet(secondValue.join(" "), partyName1);

                        return message.reply(`You have changed party 1's name to ${secondValue.join(" ")}`)
                    }
                }

                // mentioning checked-in members

                else if (prop === 'mention') {

                    const [ prop, value, ...secondValue ] = args;

                    const realUser = (user) => {
                        return user === null ? "" : user;
                    }

                    if (value === 'party1') {

                        let user1 = message.guild.members.find(member => member.displayName == party1[0]);

                        let user2 = message.guild.members.find(member => member.displayName == party1[1]);

                        let user3 = message.guild.members.find(member => member.displayName == party1[2]);

                        let user4 = message.guild.members.find(member => member.displayName == party1[3]);

                        let user5 = message.guild.members.find(member => member.displayName == party1[4]);

                        let user6 = message.guild.members.find(member => member.displayName == party1[5]);
                            
                        return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} : \n ${secondValue.join(" ")}`)
                    }

                    if (value === 'party2') {
                        let user1 = message.guild.members.find(member => member.displayName == party2[0]);

                        let user2 = message.guild.members.find(member => member.displayName == party2[1]);

                        let user3 = message.guild.members.find(member => member.displayName == party2[2]);

                        let user4 = message.guild.members.find(member => member.displayName == party2[3]);

                        let user5 = message.guild.members.find(member => member.displayName == party2[4]);

                        let user6 = message.guild.members.find(member => member.displayName == party2[5]);

                            
                        return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} : \n ${secondValue.join(" ")}`)
                    }

                    if (value === 'party3') {
                        
                        let user1 = message.guild.members.find(member => member.displayName == party3[0]);

                        let user2 = message.guild.members.find(member => member.displayName == party3[1]);

                        let user3 = message.guild.members.find(member => member.displayName == party3[2]);

                        let user4 = message.guild.members.find(member => member.displayName == party3[3]);

                        let user5 = message.guild.members.find(member => member.displayName == party3[4]);

                        let user6 = message.guild.members.find(member => member.displayName == party3[5]);

                                
                        return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} : \n ${secondValue.join(" ")}`)
                
                    }
                }
                
                // party help
                else if (prop === 'help') {
                
                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                
                    if(!message.member.roles.has(adminRole.id)) {

                        message.author.send({embed: {
                            color: 3447003,
                            fields: [{
                                name: "**__Public Commands__**",
                                value: `**!party checkin <1 or 2 or 3>** : check yourself into party 1/2/3. If party 1 is full, checks you in party 2. If party 2 is full, checks you in to party 3. Checks you in party 1 if no number is typed. \n **!party checkout <1 or 2 or 3>** : remove yourself from party 1/2/3 \n **!party checkout all** : remove yourself from all partys \n**!party view <1 or 2 or 3>** : view party 1/2/3 \n **!party view all** : view all partys`
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
                                value: `**!party checkin <1 or 2 or 3>** : check yourself into party 1/2/3. If party 1 is full, checks you in party 2. If party 2 is full, checks you in to party 3. Checks you in party 1 if no number is typed. \n **!party checkout <1 or 2 or 3>** : remove yourself from party 1/2/3 \n **!party checkout all** : remove yourself from all partys \n**!party view <1 or 2 or 3>** : view party 1/2/3 \n **!party view all** : view all partys`
                            },{
                                name: `**__GM Commands Part 1__**`,
                                value: `**!party clear <1 or 2 or 3>** : clears entire party 1/2/3 \n **!party clear all** : clear all partys \n **!party add <party1 or party2 or party3> <user>** : adds user to party 1/2/3 (**important**: user must be exact same spelling as their display name or else it will double register if user checks in themselves)`
                            },{
                                name: `**__GM Commands Part 2__**`,
                                value: `**!party remove <party1 or party2 or party3> <number>** : removes member of that number from party 1/2/3 \n **!party swap <partyNumber> <number> <partyNumber> <number>** : swaps numbered player from party number with numbered player from party number. If any positions are empty, just simply moves player over. \n **!party edit <partyNumber> <name>** : edits numbered party's name`
                            }
                            ]
                        }
                        })
                        
                        return message.reply(`Check your DM!`)
                    }
                }
        
                else {
                    return message.reply(`Please enter !party help`)
                }
        }

    }
}


module.exports = Party;