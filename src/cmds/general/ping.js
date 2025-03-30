const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong!'),

    execute (client, interaction) {
        interaction.reply('Pong!')
    }
}