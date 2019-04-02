const commando = require('discord.js-commando');
const config = require('../../config.json');

class Team extends commando.Command{
    constructor(client){
        super(client, {
            name: 'team',
            group: 'team',
            memberName: 'team',
            description: 'Organizing Team Commands'
        });
    }

    async run(message) {

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (!message.guild || message.author.bot) return;
    
        if (message.content.indexOf(config.prefix) !== 0) return;

        const guildConf = enmap.ensure(message.guild.id, defaultSettings);

        let member = message.member.displayName;

        let teamChannel = enmap.get(message.guild.id, 'teamChannel');
         
        // expedition check-ins
    
        if (command === "team") {

            const [ prop ] = args;

            if (message.channel.name === teamChannel) {

                
                let team1 = enmap.get(message.guild.id, 'team.team1.team');
                let team2 = enmap.get(message.guild.id, 'team.team2.team');
                let team3 = enmap.get(message.guild.id, 'team.team3.team');

                let teamTeam1 = 'team.team1.team';
                let teamTeam2 = 'team.team2.team';
                let teamTeam3 = 'team.team3.team';
                
                let teamName1 = 'team.team1.name';
                let teamName2 = 'team.team2.name';
                let teamName3 = 'team.team3.name';

                const teamPush = (member, team) => {
                    return enmap.push(message.guild.id, member, team);
                }

                const teamRemove = (member, team) => {
                    return enmap.remove(message.guild.id, member, team);
                }

                const teamSet = (value, team) => {
                    return enmap.set(message.guild.id, value, team);
                }

                const teamList = (index, teamNumber) => {
                    return teamNumber[index] === undefined ? " " : teamNumber[index];
                }

                const teamEmbed = (name, teamNumber) => {
                    return message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: `**__${name}__**`,
                            value: `1. ${teamList(0, teamNumber)} \n 2. ${teamList(1, teamNumber)} \n 3. ${teamList(2, teamNumber)} \n 4. ${teamList(3, teamNumber)} \n 5. ${teamList(4, teamNumber)} \n 6. ${teamList(5, teamNumber)} \n 7. ${teamList(6, teamNumber)}\n 8. ${teamList(7, teamNumber)}\n 9. ${teamList(8, teamNumber)}\n 10. ${teamList(9, teamNumber)}`
                        },
                        ]
                    }
                    })
                }

                let fullteam1 = !team1.includes(undefined) && team1.length === 10;
                let fullteam2 = !team2.includes(undefined) && team2.length === 10;
                let fullteam3 = !team3.includes(undefined) && team3.length === 10;

                let includesMember1 = team1.includes(member);
                let includesMember2 = team2.includes(member);
                let includesMember3 = team3.includes(member);
               
                let name1 = enmap.get(message.guild.id, 'team.team1.name');
                let name2 = enmap.get(message.guild.id, 'team.team2.name');
                let name3 = enmap.get(message.guild.id, 'team.team3.name');
                
                // checking in
                if (prop === "checkin") {
                
                    const [ prop, value ] = args;

                    if (value === '3') {

                        if (fullteam3) {
                            message.reply(`${name3} is full`);
            
                            teamEmbed(name3, team3);
                        }

                        else if (team3.includes(member)) {
                            return message.reply(`You're already checked in!`)
                        }

                        else {
            
                            teamPush(member, teamTeam3)
                        
                            message.reply(`you just checked in to ${name3}.`)
                
                            teamEmbed(name3, team3);
                        } 
                    }


                    else if (value === '2') {

                        if (fullteam2) {

                            message.reply(`${name2} is full`);
            
                            teamEmbed(name2, team2);
                        }
                        
                        else if (team2.includes(member)) {
                            return message.reply(`You're already checked in!`)
                        }
            
                        else {
            
                            teamPush(member, teamTeam2)
                        
                            message.reply(`you just checked in to ${name2}.`)
                
                            teamEmbed(name2, team2);
                        }
                    }

                    else if (value === 'all') {
                        

                        if (fullteam1 && fullteam2 && fullteam3) {
                            return message.reply(`Sorry, all teams are full!`)
                        }

                        else if (fullteam1 && fullteam2) {
                            teamPush(mmeber, teamTeam3);

                            message.reply(`Sorry, ${name1} and ${name2} are full, you have checked in to only ${name3}`)

                            teamEmbed(name3, team3);
                        }

                        else if (fullteam1 && fullteam3) {
                            teamPush(member, teamTeam2);

                            message.reply(`${name1} and ${name3} are full, you have checked in to only ${name2}`)

                            teamEmbed(name2, team2);
                        }

                        else if (fullteam2 && fullteam3) {
                            teamPush(member, teamTeam1)

                            message.reply(`${name2} and ${name3} are full, you have checked in to only ${name1}`)

                            teamEmbed(name1, team1);
                        }

                        else if (fullteam1) {
                            teamPush(member, teamTeam2);
                            teamPush(member, teamTeam3);

                            message.reply(`${name1} is full, you have checked into ${name2} and ${name3}`)
                        }

                        else if (fullteam2) {
                            teamPush(member, teamTeam1);
                            teamPush(member, teamTeam3);

                            message.reply(`${name2} is full, you have checked into ${name1} and ${name3}`)
                        }

                        else if (fullteam3) {
                            teamPush(member, teamTeam1);
                            teamPush(member, teamTeam2);

                            message.reply(`${name3} is full, you have checked into ${name1} and ${name2}`)
                        }

                        else {
                            teamPush(member, teamTeam1);
                            teamPush(member, teamTeam2);
                            teamPush(member, teamTeam3)

                            message.reply(`You have checked into all teams`)
                        }
                    }

                    else {  
                        // if team 1 is full
                        if (fullteam1) {

                            if (team2.includes(member) || team3.includes(member)) {
                                return message.reply(`${name1} is full, and you are already in ${name2} and ${name3}`)
                            }

                            else if (fullteam2) {

                                if (fullteam3) {
                                    return message.reply(`All teams are full!`)
                                }

                                teamPush(member, teamTeam3);

                                message.reply(`${name1} & ${name2} are full, you have been added to ${name3}`)

                                teamEmbed(name3, team3);
                            }
                            
                            else {
                                teamPush(member, teamTeam2);
                
                                message.reply(`${name1} is full, you have been added to ${name2}`);
                
                                teamEmbed(name2, team2);
                            }
                            }
                            
                        // if team 2 is full
                        else if(fullteam2) {

                            if (team1.includes(member) || team3.includes(member)) {
                                return message.reply(`${name2} is full, and you are already checked in to ${name1} and ${name3}`)
                            }

                            else if (team1.includes(undefined) && team1.length !== 6) {
                                teamPush(member, teamTeam1);

                                message.reply(`${name2} is full, you have been added to ${name1}`);

                                teamEmbed(name1, team1);
                            }

                            else {

                                if (fullteam3) {
                                    return message.reply(`All teams are full!`)
                                }
                                teamPush(member, teamTeam3);
                
                                message.reply(`${name2} is full, you have been added to ${name3}`);
                
                                teamEmbed(name3, teamTeam3);
                            }
                        }    

                        else if (team1.includes(member)) {
                            return message.reply(`You're already checked in!`)
                        }
                
                        else {
                
                            teamPush(member, teamTeam1);
                        
                            message.reply(`you just checked in to ${name1}.`)
                    
                            teamEmbed(name1, team1);
                        } 
                    }
                }
                
                // checking out
                else if (prop === "checkout") {
                
                const [prop, value] = args;

                    if (includesMember1 && includesMember2 && includesMember3) {

                        if (value === '1') {
                            teamRemove(member, teamTeam1);
                        
                            message.reply(`you have been removed from ${name1}.`);
                
                            teamEmbed(name1, team1);
                        }

                        else if (value === '2') {
                            teamRemove(member, teamTeam2);

                            message.reply(`you have been removed from ${name2}`);

                            teamEmbed(name2, team2);
                        }

                        else if (value === '3') {
                            teamRemove(member, teamTeam3);

                            message.reply(`you have been removed from ${name3}`);

                            teamEmbed(name3, team3);
                        }

                        else if (value === 'all') {
                            teamRemove(member, teamTeam1);
                            teamRemove(member, teamTeam2);
                            teamRemove(member, teamTeam3);

                            message.reply(`you have been removed from all 3 teams.`)
                        }

                        else {
                            message.reply(`You are checked in to all 3 teams. Please specify which team you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember1 && includesMember2) {

                        if (value === '1') {
                            teamRemove(member, teamTeam1);
                        
                            message.reply(`you have been removed from ${name1}.`);
                
                            teamEmbed(name1, team1);
                        }

                        else if (value === '2') {
                            teamRemove(member, teamTeam2);

                            message.reply(`you have been removed from ${name2}`);

                            teamEmbed(name2, team2);
                        }
                        else if (value === 'all') {
                            teamRemove(member, teamTeam1);
                            teamRemove(member, teamTeam2);
                            

                            message.reply(`you have been removed from ${name1} & ${name2}.`)
                        }

                        else {
                            message.reply(`You are checked in to teams 1 & 2. Please specify which team you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember1 && includesMember3) {

                        if (value === '1') {
                            teamRemove(member, teamTeam1);
                        
                            message.reply(`you have been removed from ${name1}.`);
                
                            teamEmbed(name1, team1);
                        }

                        else if (value === '3') {
                            teamRemove(member, teamTeam3);

                            message.reply(`you have been removed from ${name3}`);

                            teamEmbed(name3, team3);
                        }

                        else if (value === 'all') {
                            teamRemove(member, teamTeam1);
                            teamRemove(member, teamTeam3);
                            

                            message.reply(`you have been removed from ${name1} & ${name3}.`)
                        }

                        else {
                            message.reply(`You are checked in to teams 1 & 3. Please specify which team you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember2 && includesMember3) {

                        if (value === '2') {
                            teamRemove(member, teamTeam2);

                            message.reply(`you have been removed from ${name2}`);

                            teamEmbed(name2, team2);
                        }

                        else if (value === '3') {
                            teamRemove(member, teamTeam3);

                            message.reply(`you have been removed from ${name3}`);

                            teamEmbed(name3, team3);
                        }

                        else if (value === 'all') {
                            teamRemove(member, teamTeam2);
                            teamRemove(member, teamTeam3);
                            

                            message.reply(`you have been removed from ${name2} & ${name3}.`)
                        }

                        else {
                            message.reply(`You are checked in to teams 2 & 3. Please specify which team you'd like to be checked out of.`)
                        }
                    }

                    else if (includesMember1) {

                        teamRemove(member, teamTeam1);
                        
                        message.reply(`you have been removed from ${name1}.`);
            
                        teamEmbed(name1, team1);
                    }

                    else if (includesMember2) {
                        teamRemove(member, teamTeam2);

                        message.reply(`you have been removed from ${name2}`);

                        teamEmbed(name2, team2);
                    }

                    else if (includesMember3) {

                        teamRemove(member, teamTeam3);

                        message.reply(`you have been removed from ${name3}`);

                        teamEmbed(name3, team3);
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

                            let value = team1[secondValue-1];
                        
                            if (value !== undefined) {
                            
                                message.channel.send(`${value} has been removed from ${name1}.`)

                                teamRemove(value, teamTeam1)
            
                                teamEmbed(name1, team1);
                            }

                            else {
                                message.channel.send(`There is no one to remove here.`)

                                teamEmbed(name1, team1);
                            }
                        }

                        else {
                            return message.reply(`Please enter '!team remove <team1 or team2 or team3> <number>'`);
                        }
                        
                    }

                    else if (value === 'team2') {

                        if (secondValue.join(" ")) {

                            let value2 = team2[secondValue-1];

                            if (value2 !== undefined) {
                                message.channel.send(`${value2} has been removed from ${name2}.`)

                                teamRemove(value, teamTeam2);
                
                                teamEmbed(name2, team2);
                            }

                            else {
                                message.channel.send(`There is no one to remove here`);

                                teamEmbed(name2, team2);
                            }
                        }

                        else {
                            return message.reply(`Please enter '!team remove <team1 or team2 or team3> <number>'`)
                        }
                    }

                    else if (value === 'team3') {

                        if (secondValue.join(" ")) {

                            let value3 = team3[secondValue-1];

                            if (value3 !== undefined) {
                                message.channel.send(`${value3} has been removed from ${name3}.`)

                                teamRemove(value, teamTeam3);
                
                                teamEmbed(name3, team3);
                            }

                            else {
                                message.channel.send(`There is no one to remove here`);

                                teamEmbed(name3, team3);
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


                        if (team1.includes(secondValue.join(" "))) {
                            return message.reply(`${secondValue.join(" ")} is already checked in to ${name1}`)
                        }

                        else if (fullteam1) {
                            return message.reply(`${name1} is already full!`)
                        }
            
                        else {
                            message.channel.send(`${secondValue.join(" ")} has been added to ${name1}`)

                            teamPush(secondValue.join(" "), teamTeam1)
                
                            teamEmbed(name1, team1);
                        }
                    }

                    else if (value === 'team2') {

                        if (team2.includes(secondValue.join(" "))) {
                            return message.reply(`${secondValue.join(" ")} is already checked in to ${name2}`)
                        }

                        else if (fullteam2) {
                            return message.reply(`${name2} is already full!`)
                        }
            
                        else {
                            message.channel.send(`${secondValue.join(" ")} has been added to ${name2}`)
            
                            teamPush(secondValue.join(" "), teamTeam2)
                
                            teamEmbed(name2, team2);
                        }
                    }

                    else if (value === 'team3') {

                        if (team3.includes(secondValue.join(" "))) {
                            return message.reply(`${secondValue.join(" ")} is already checked in to ${name3}`)
                        }

                        else if (fullteam3) {
                            return message.reply(`${name3} is already full!`)
                        }
            
                        else {
                            message.channel.send(`${secondValue.join(" ")} has been added to ${name3}`)
            
                            teamPush(secondValue.join(" "), teamTeam3)
                
                            teamEmbed(name3, team3);
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
                        teamSet([], teamTeam1);

                        return message.channel.send(`${name1} has been cleared.`)
                    }

                    else if (value === '2') {
                        teamSet([], teamTeam2);

                        return message.channel.send(`${name2} has been cleared`)
                    }
                    
                    else if (value === '3') {
                        teamSet([], teamTeam3);

                        return message.channel.send(`${name3} has been cleared`)
                    }

                    else if ( value === 'all') {
                        teamSet([], teamTeam1);
                        teamSet([], teamTeam2);
                        teamSet([], teamTeam3);

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
                        teamEmbed(name1, team1);
                    }

                    else if (value === '2') {
                        teamEmbed(name2, team2);
                    }

                    else if (value === '3') {
                        teamEmbed(name3, team3);
                    }

                    else if (value === 'all') {
                        const teamList = (index, team) => {
                            return team[index] === undefined ? " " : team[index];
                        }

                        return message.channel.send({embed: {
                            color: 3447003,
                            fields: [
                                {
                                name: `**__${name1}__**`,
                                value: `1. ${teamList(0, team1)} \n 2. ${teamList(1, team1)} \n 3. ${teamList(2, team1)} \n 4. ${teamList(3, team1)} \n 5. ${teamList(4, team1)} \n 6. ${teamList(5, team1)} \n 7. ${teamList(6, team1)} \n 8. ${teamList(7, team1)} \n 9. ${teamList(8, team1)} \n 10. ${teamList(9, team1)}`
                                },
                                {
                                name: `**__${name2}__**`,
                                value: `1. ${teamList(0, team2)} \n 2. ${teamList(1, team2)} \n 3. ${teamList(2, team2)} \n 4. ${teamList(3, team2)} \n 5. ${teamList(4, team2)} \n 6. ${teamList(5, team2)} \n 7. ${teamList(6, team2)} \n 8. ${teamList(7, team2)} \n 9. ${teamList(8, team2)} \n 10. ${teamList(9, team2)} `
                                },
                                {
                                name: `**__${name3}__**`,
                                value: `1. ${teamList(0, team3)} \n 2. ${teamList(1, team3)} \n 3. ${teamList(2, team3)} \n 4. ${teamList(3, team3)} \n 5. ${teamList(4, team3)} \n 6. ${teamList(5, team3)} \n 7. ${teamList(6, team3)} \n 8. ${teamList(7, team3)} \n 9. ${teamList(8, team3)} \n 10. ${teamList(9, team3)} `
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

                    const [prop, firstteam, firstNumber, secondteam, secondNumber] = args;

                    const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);

                    if(!adminRole) return message.reply("Administrator Role Not Found");
                
                
                    if(!message.member.roles.has(adminRole.id)) {
                        return message.reply("Hey, you're not the boss of me!");
                    }

                    if (firstteam === 'team1' && secondteam === 'team2') {
                        let member1 = team1[firstNumber-1];

                        let member2 = team2[secondNumber-1];

                        if (member1 === undefined && member2 !== undefined) {

                            message.reply(`${member2} has been moved to ${name1}`);

                            teamPush(member2, teamTeam1);

                            teamRemove(member2, teamTeam2);
            
                        }
            
                        else if (member2 === undefined && member1 !== undefined) {
            
                            message.reply(`${member1} has been moved to ${name2}`);
            
                            teamPush(member2, teamTeam2);

                            teamRemove(member2, teamTeam1);
            
                            
                        }
            
                        else if (member2 === undefined && member1 === undefined) {
                            return message.reply(`There are no one in these positions!`)
                        }
            
                        else {
                            message.reply (`${member1} and ${member2} have been swapped.`)
            
                            teamPush(member1, teamTeam2);

                            teamRemove(member1, teamTeam1);

                            teamPush(member2, teamTeam1);

                            teamRemove(member2, teamTeam2);
            
                            
                        }
                    }

                    else if (firstteam === 'team1' && secondteam === 'team3') {
                        let member1 = team1.team[firstNumber-1];

                        let member2 = team3.team[secondNumber-1];

                        if (member1 === undefined && member2 !== undefined) {

                            message.reply(`${member2} has been moved to ${name1}`);
            
                            teamPush(member2, teamTeam1);

                            teamRemove(member2, teamTeam3);
                        }
            
                        else if (member2 === undefined && member1 !== undefined) {
            
                            message.reply(`${member1} has been moved to ${name3}`);
            
                            teamPush(member1, teamTeam3);

                            teamRemove(member1, teamTeam1);
            
                            
                        }
            
                        else if (member2 === undefined && member1 === undefined) {
                            return message.reply(`There are no one in these positions!`)
                        }
            
                        else {
                            message.reply (`${member1} and ${member2} have been swapped.`)
                            
                            teamPush(member1, teamTeam3);

                            teamRemove(member1, teamTeam1);

                            teamPush(member2, teamTeam1);

                            teamRemove(member2, teamTeam3);
                            
                        }
                    }

                    else if (firstteam === 'team2' && secondteam === 'team3') {
                        let member1 = team2.team[firstNumber-1];

                        let member2 = team3.team[secondNumber-1];

                        if (member1 === undefined && member2 !== undefined) {

                            message.reply(`${member2} has been moved to ${name2}`);
            
                            teamPush(member2, teamTeam2);

                            teamRemove(member2, teamTeam3);
                        }
            
                        else if (member2 === undefined && member1 !== undefined) {
            
                            message.reply(`${member1} has been moved to ${name3}`);
            
                            teamPush(member1, teamTeam3);

                            teamRemove(member1, teamTeam2);
            
                            
                        }
            
                        else if (member2 === undefined && member1 === undefined) {
                            return message.reply(`There are no one in these positions!`)
                        }
            
                        else {
                            message.reply (`${member1} and ${member2} have been swapped.`)

                            teamPush(member1, teamTeam3);

                            teamRemove(member1, teamTeam2);

                            teamPush(member2, teamTeam2);

                            teamRemove(member2, teamTeam3);
            
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

                        teamSet(secondValue.join(" "), teamName3);

                        return message.reply(`You have changed team 3's name to ${secondValue.join(" ")}`)
                    }

                    else if (value === 'team2') {

                        teamSet(secondValue.join(" "), teamName2);

                        return message.reply(`You have changed team 2's name to ${secondValue.join(" ")}`)
                    }

                    else if (value === 'team1') {

                        teamSet(secondValue.join(" "), teamName1);

                        return message.reply(`You have changed team 1's name to ${secondValue.join(" ")}`)
                    }
                }

                // mentioning checked-in members

                else if (prop === 'mention') {

                    const [ prop, value, ...secondValue ] = args;

                    const realUser = (user) => {
                        return user === null ? "" : user;
                    }

                    if (value === 'team1') {

                        let user1 = message.guild.members.find(member => member.displayName == team1[0]);

                        let user2 = message.guild.members.find(member => member.displayName == team1[1]);

                        let user3 = message.guild.members.find(member => member.displayName == team1[2]);

                        let user4 = message.guild.members.find(member => member.displayName == team1[3]);

                        let user5 = message.guild.members.find(member => member.displayName == team1[4]);

                        let user6 = message.guild.members.find(member => member.displayName == team1[5]);

                        let user7 = message.guild.members.find(member => member.displayName == team1[6]);

                        let user8 = message.guild.members.find(member => member.displayName == team1[7]);

                        let user9 = message.guild.members.find(member => member.displayName == team1[8]);

                        let user10 = message.guild.members.find(member => member.displayName == team1[9]);


                            
                        return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} ${realUser(user7)} ${realUser(user8)} ${realUser(user9)} ${realUser(user10)} : \n ${secondValue.join(" ")}`)
                    }

                    if (value === 'team2') {
                        let user1 = message.guild.members.find(member => member.displayName == team2[0]);

                        let user2 = message.guild.members.find(member => member.displayName == team2[1]);

                        let user3 = message.guild.members.find(member => member.displayName == team2[2]);

                        let user4 = message.guild.members.find(member => member.displayName == team2[3]);

                        let user5 = message.guild.members.find(member => member.displayName == team2[4]);

                        let user6 = message.guild.members.find(member => member.displayName == team2[5]);

                        let user7 = message.guild.members.find(member => member.displayName == team2[6]);

                        let user8 = message.guild.members.find(member => member.displayName == team2[7]);

                        let user9 = message.guild.members.find(member => member.displayName == team2[8]);

                        let user10 = message.guild.members.find(member => member.displayName == team2[9]);

                            
                        return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} ${realUser(user7)} ${realUser(user8)} ${realUser(user9)} ${realUser(user10)} : \n ${secondValue.join(" ")}`)
                    }

                    if (value === 'team3') {
                        
                        let user1 = message.guild.members.find(member => member.displayName == team3[0]);

                        let user2 = message.guild.members.find(member => member.displayName == team3[1]);

                        let user3 = message.guild.members.find(member => member.displayName == team3[2]);

                        let user4 = message.guild.members.find(member => member.displayName == team3[3]);

                        let user5 = message.guild.members.find(member => member.displayName == team3[4]);

                        let user6 = message.guild.members.find(member => member.displayName == team3[5]);

                        let user7 = message.guild.members.find(member => member.displayName == team3[6]);

                        let user8 = message.guild.members.find(member => member.displayName == team3[7]);

                        let user9 = message.guild.members.find(member => member.displayName == team3[8]);

                        let user10 = message.guild.members.find(member => member.displayName == team3[9]);

                                
                        return message.channel.send(`${realUser(user1)} ${realUser(user2)} ${realUser(user3)} ${realUser(user4)} ${realUser(user5)} ${realUser(user6)} ${realUser(user7)} ${realUser(user8)} ${realUser(user9)} ${realUser(user10)} : \n ${secondValue.join(" ")}`)
                
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
    }
}

module.exports = Team;