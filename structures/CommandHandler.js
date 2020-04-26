const walk = require('walk');
const {resolve} = require('path');
const Client = require('./Client');
class CommandHandler {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
    }
    async load() {
        let walker = walk.walk('./commands')
        walker.on('file', (root, stats, next) => {
            if(!stats.name.endsWith('.js')) return;
            const Command = require(`${resolve(root)}/${stats.name}`);
            const command = new Command(this.client)
            command.aliases.forEach(r => {
                this.client.aliases.set(r, command.name)
            })
            this.client.commands.set(command.name, command);
            next()
        })
    }
}
module.exports = CommandHandler;