const { Client, TextChannel, MessageEmbed, Guild, User, Message, Collection } = require('discord.js');
const { config } = require('dotenv')

class DClient extends Client {
    constructor(...args) {
        super(...args);

        this.config = config().parsed;
        this.logger = new (require('./Logger'));

        this.commands = new Collection()
        this.aliases = new Collection()
        this.groups = require('fs').readdirSync('./commands')
        this.commandHandler = new (require('./CommandHandler'))(this)
        this.eventHandler = new (require('./EventHandler'))(this)

        this.embedColor = "#FFFF00";
        this.prefix;
        this.owner;
    }
    /**
     * 
     * @param {string} ownerID 
     * @param {string} prefix 
     */
    async run(ownerID, prefix) {

        if (!ownerID) throw new Error(`OwnerID not specified.`);

        if (typeof ownerID !== 'string') throw new TypeError(`OwnerID must be a string.`);

        this.owner = ownerID;

        if (!prefix) throw new Error(`Prefix not specified.`);

        if (typeof prefix !== 'string') throw new TypeError(`Prefix must be a string.`);

        this.prefix = prefix;

        if (prefix.length > 6) {
            this.logger.debug(`Prefix more than 6 characters.`)
        }

        await this.commandHandler.load();
        await this.eventHandler.load();

        this.login(this.config.TOKEN).then(() => {
            this.logger.log(`Successfully logged in.`)
            this.logger.log(`Loaded ${this.commands.size} commands...`)
        }).catch(e => {
            this.logger.error(`Something went wrong while logging in\n${e.stack}`)
        });
    }
}

module.exports = DClient;