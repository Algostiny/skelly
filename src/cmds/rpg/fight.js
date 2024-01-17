const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription('Encontre algum oponente para batalha')
        .setNameLocalization('pt-BR', 'luta')
        .setDescriptionLocalization('pt-BR', 'Inicie uma batalha com alguém'),
    execute: function (interaction, client) {

    }
}