const { Client, Collection } = require("discord.js");
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

class MainClient extends Client {
    constructor() {
       super({
            shards: "auto",
            intents: 32767,
            allowedMentions: {
            parse: ["roles", "users", "everyone"],
            repliedUser: false
        },
    });

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

this.config = require('./settings/config.js');
this.prefix = this.config.PREFIX;
this.owner = this.config.OWNER_ID;
if(!this.token) this.token = this.config.TOKEN;

const client = this;

this.distube = new DisTube(client, {
  searchSongs: 5, /// SET TO 5 FOR ENABLE SEARCH MODE!
  searchCooldown: 30,
  leaveOnEmpty: true,
  emptyCooldown: 60,
  leaveOnFinish: true,
  leaveOnStop: true,
  youtubeDL: false,
  plugins: [
  new SoundCloudPlugin(), 
  new SpotifyPlugin({
      emitEventsAfterFetching: true
    })],
});

["aliases", "commands"].forEach(x => client[x] = new Collection());
["loadCommands", "loadEvents", "loadDistube"].forEach(x => require(`./handlers/${x}`)(client));

    }
        connect() {
            return super.login(this.token);
    };
};
module.exports = MainClient;


// Do not change anything here
require('http').createServer((req, res) => res.end(`
 |-----------------------------------------|
 |              Informations               |
 |-----------------------------------------|
 |• Alive: 24/7                            |
 |-----------------------------------------|
 |• Author: 𝕩𝕏𝕩 | 𝒯𝑒𝓃𝓉𝒶𝒸𝒾𝑜𝓃#8064           |
 |-----------------------------------------|
 |• Server: https://discord.gg/PrkvzXRw    |
 |-----------------------------------------|
 |• Youtube: Calin Engine                  |
 |-----------------------------------------|
 |• License: Calin Engine Community        |
 |-----------------------------------------|
`)).listen(3000) //Dont remove this 