const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');
const { getVotes } = require('./voteworstmember.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rankworst')
    .setNameLocalization('pt-BR','rankworst')
    .setDescription('Votação em tempo real do WORST MEMBER WIZKKA'),

    async execute (client, interaction) {
        let votos = Object.entries(getVotes())
        let ranking = votos.sort((a,b) => b[1]-a[1]).slice(0,10).map(v => `\`${v[1]}\` | <@${v[0]}>`)

        let embed = new EmbedBuilder()
        .setTitle('Ranking - Worst Member')
        .setDescription(`**Votos** |  **Membro**\n――――――――\n${ranking.length > 0 ? ranking.join('\n ') : 'Parece que ainda não há ninguém :(\nTente votar com `/votarworst <@Membro>`'}`)
        .setColor('Purple')
        .setFooter({text:'/votarworst <@Membro>'})

        interaction.reply({ embeds: [embed] })
    },

    getVotes() {return votes}
}