class Command {
    constructor(options = {name: String(), group: String(), alias: Array, desc: String(), usage: String(), owner: Boolean(), requiredPerms: Array, requiredBotPerms: Array, nsfw: Boolean(), enabled: Boolean()}) {
        this.name = options.name;
        this.group = options.group || 'General';
        this.aliases = options.aliases || [];
        this.description = options.desc || 'None';
        this.usage = options.usage || 'None'
        this.owner = Boolean(options.owner)
        this.requiredPerms = options.requiredPerms || [];
        this.guildOnly = Boolean(options.guildOnly)
        this.nsfw = Boolean(options.nsfw)
        this.requiredBotPerms = options.requiredBotPerms || [];
        this.enabled = Boolean(options.enabled)
    }
}
module.exports = Command;