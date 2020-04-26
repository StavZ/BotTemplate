const Command = require('../../structures/Command')
const Client = require('../../structures/Client')
const { Message, MessageEmbed } = require('discord.js')
class ping extends Command {
    /**
    * @param {Client} client
    */
    constructor(client) {
        super({
            name: 'ping',
            group: 'General',
            usage: 'ping',
            description: 'Shows api latency',
            aliases: ['latency'],
            owner: 0,
            guildOnly: 0,
            nsfw: 0,
            enabled: 1,
            requiredPerms: [],
            requiredBotPerms: [],
        })
        this.client = client;
    }

    /**
    * @param {Message} message
    * @param {String[]} args
    */
    async exec(message, args) {
        let embed = new MessageEmbed()
            .setColor(this.client.embedColor)
            .setDescription(`🏓 Pong! \`${Math.floor(this.client.ws.ping)}ms\``);

        message.channel.send(embed);
    }
}
module.exports = ping