const Command = require('../../structures/Command')
const Client = require('../../structures/Client')
const { Message, MessageEmbed } = require('discord.js')
class Eval extends Command {
    /**
    * @param {Client} client
    */
    constructor(client) {
        super({
            name: 'eval',
            group: 'Owner',
            usage: 'eval [-a] <code>',
            desc: 'Execute code',
            alias: ['e'],
            owner: 1,
            guildOnly: 0,
            nsfw: 0,
            enabled: 1,
            requiredPerms: [],
            requiredBotPerms: ['EMBED_LINKS'],
        })
        this.client = client;
    }
    /**
    * @param {Message} message
    * @param {String[]} args
    */
    async exec(message, args) {
        if (args.isEmpty()) return message.reply(`Usage: \`${this.client.prefix}${this.usage}\``)

        try {
            let code, evaluated;

            if (args[0].toLowerCase() == '-a') {
                code = args.slice(1).join(' ');
                evaluated = await eval(`(async () => {\n${code}\n})();`);
            } else {
                code = args.join(' ');
                evaluated = require('util').inspect(eval(code, { depth: 0 }));
            }

            const hrStart = process.hrtime();
            const hrDiff = process.hrtime(hrStart);

            const embed = new MessageEmbed()
                .addField('📥 Input:', `\`\`\`js\n${typeof code == 'string' && code.length > 1024 ? code.slice(0, 1024) : code}\`\`\``)
                .addField('📤 Output:', `\`\`\`js\n${typeof evaluated == 'string' && evaluated.length > 1024 ? evaluated.slice(0, 1024) : evaluated}\n\`\`\``)
                .setColor(this.client.embedColor)
                .setFooter(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`);

            message.channel.send(embed).then(async msg => {
                await msg.react('❌');
                msg.awaitReactions((reaction, user) => user.id == message.author.id && reaction.emoji.name == '❌', { max: 1 }).then(collected => {
                    if (collected.first().emoji.name == '❌') {
                        msg.delete();
                    }
                });
            });

        } catch (e) {
            message.channel.send(`An error occurred: \`${e}\``)
            this.client.logger.error(e);
        }
    }
}
module.exports = Eval