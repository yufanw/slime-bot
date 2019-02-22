module.exports = (bot, guild) => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);

    return guild.owner.send(`Hi! Thanks for adding Slime Bot. Please join my discord server to keep up with updates and ask questions! https://discord.gg/DVjQ39K`)
}