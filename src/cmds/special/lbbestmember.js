const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');
const { getVotes } = require('./votebestmember.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rankbest')
    .setNameLocalization('pt-BR','rankbest')
    .setDescription('Votação em tempo real do BEST MEMBER WIZKKA'),

    async execute (client, interaction) {
        let votos = Object.entries(getVotes())
        let ranking = votos.sort((a,b) => b[1]-a[1]).slice(0,10).map(v => `\`${v[1]}\` | <@${v[0]}>`)

        let embed = new EmbedBuilder()
        .setTitle('Ranking - Best Member')
        .setDescription(`**Votos** |  **Membro**\n――――――――\n${ranking.length > 0 ? ranking.join('\n ') : 'Parece que ainda não há ninguém :(\nTente votar com `/votarbest <@Membro>`'}`)
        .setColor('Purple')
        .setFooter({text:'/votarbest <@Membro>'})

        interaction.reply({ embeds: [embed] })
    },

    getVotes() {return votes}
}