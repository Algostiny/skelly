const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: "power",
        description: "desc",
        aliases: ["alias1", "alias2"],
        prefixed: true
    },
    execute: function (interaction, client) {

    }
}