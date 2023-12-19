const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('desc')
        .setNameLocalization('pt-BR', 'nome')
        .setDescriptionLocalization('pt-BR', 'nome'),
    execute: function (interaction, client) {

    }
}