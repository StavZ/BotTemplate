const moment = require('moment')
let Now = Date.now()
const time = moment(Now).format('h:mm:ss')
const chalk = require('chalk')

const log = chalk.greenBright;
const error = chalk.bold.red;
const debug = chalk.yellow;
class Logger {
    
    /**
     * @param {string} msg  
     */
    async log(msg) {
        console.log(log(`${time} [LOG] ${msg}`))
    }

    /**
     * @param {string} msg 
     */
    async error(msg) {
        console.log(error(`${time} [ERROR] ${msg}`))
    }

    /**
     * @param {string} msg 
     */
    async debug(msg) {
        console.log(debug(`${time} [DEBUG] ${msg}`))
    }
}
module.exports = Logger;