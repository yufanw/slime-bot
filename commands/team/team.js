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
    }
}

module.exports = Team;