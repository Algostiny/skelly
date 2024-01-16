const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: "sorusoru",
        description: "LIFE OR DEATH???",
        aliases: ["soru"],
        prefixed: true
    },
    execute: function (msg, args, client) {
        if (args.length <= 0){
            let emb = new EmbedBuilder()
            
        }
    }
}