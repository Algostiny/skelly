const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fightList = {}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription('Encontre algum oponente para batalha')
        .setNameLocalization('pt-BR', 'luta')
        .setDescriptionLocalization('pt-BR', 'Inicie uma batalha com alguém')
        .addMentionableOption(option =>
            option.setName('target')
            .setNameLocalization('pt-BR', 'alvo')
            .setDescription('The people to start a fight')
            .setDescriptionLocalization('pt-BR', 'A pessoa para começar uma luta')
            .setRequired(true)),
    execute: function (interaction, client) {

    }
}