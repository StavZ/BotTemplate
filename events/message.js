const { Message } = require('discord.js');
const Client = require('../structures/Client')

/**
 * @param {Message} message
 * @param {Client} client 
 */
module.exports.run = async (client, message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);

    //* Command
    let cmd;

    let command = args.shift().toLowerCase();
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (!cmd) return;

    if (cmd.guildOnly && message.channel.type == 'dm') return message.reply(`This command is not available in DMs`);

    try {
        cmd.exec(message, args);
    } catch (e) {
        client.logger.error(e)
    }
}
