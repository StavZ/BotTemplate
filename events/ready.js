const Client = require('../structures/Client')

/**
 * @param {Client} client
 */
module.exports.run = (client) => {
    client.logger.log(`${client.user.tag} ready to work!`)
    client.user.setActivity({name: `My prefix is ${client.prefix}`})
}