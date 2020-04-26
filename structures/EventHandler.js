const walk = require('walk')
const {resolve} = require('path')
const {Client} = require('./Client')
class EventHandler {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
    }
    async load() {
        let walker = walk.walk('./events');
        walker.on('file', (root, stats, next) => {
            if(!stats.name.endsWith('.js')) return;
            let Event = require(`${resolve(root)}/${stats.name}`)
            let name = stats.name.substring(0, stats.name.length -3);
            this.client.on(name, (...args) => Event.run(this.client, ...args));
            next()
        })
        
    }
}
module.exports = EventHandler;