module.exports = (bot, member) => {
    enmap.ensure(member.guild.id, defaultSettings);

    let privateMessage = enmap.get(member.guild.id, "privateMessage");

    return member
        .send(privateMessage)
        .catch(console.error);
}