require('./prototypes/Array')
const client = new (require('./structures/Client'))({ disableMentions: 'none' });
client.run('OWNER-ID', 'PREFIX');
