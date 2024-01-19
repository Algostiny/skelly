const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Powers = require('../../../assets/Powers')
const { getInfo } = require('../../functions/db')
const fightList = {}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription('Start a battle with someone')
        .setNameLocalization('pt-BR', 'luta')
        .setDescriptionLocalization('pt-BR', 'Inicie uma batalha com alguém')
        .addMentionableOption(option =>
            option.setName('target')
            .setNameLocalization('pt-BR', 'alvo')
            .setDescription('The people to start a fight')
            .setDescriptionLocalization('pt-BR', 'A pessoa para começar uma luta')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('power')
            .setNameLocalization('pt-BR', 'poder')
            .setDescription('The power you gonna use')
            .setDescriptionLocalization('pt-BR', 'O poder que você utilizará')
            .setRequired(true)),
    execute: function (interaction, client) {
        const target = interaction.options.getUser('target')
        if(!target) {
            let emb = new EmbedBuilder()
                .setTitle('Você precisa marcar alguém para batalhar')
                .setDescription(`Exemplo: \`${process.env.PREFIX}fight <@712389918877286450> sp\``)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }
        else if(target.id == interaction.user.id){
            let emb = new EmbedBuilder()
                .setTitle('Você não pode batalhar contra si mesmo')
                .setDescription(`Mesmo que não tenha amor próprio...`)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }
        else if (target.id==client.user.id){
            let emb = new EmbedBuilder()
                .setTitle('SKELLY VENCEU')
                .setDescription(`Você morreu.`)
                .setImage("https://i.pinimg.com/originals/14/c0/fc/14c0fc2b979696b888ce05d4690a3963.gif")
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }
        else if(target.bot){
            let emb = new EmbedBuilder()
                .setTitle('Você não pode batalhar contra um bot')
                .setDescription(`Apenas usuários podem batalhar`)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }
        
        const power = Powers[interaction.options.getString('power')]
        if(!power) {
            let emb = new EmbedBuilder()
                .setTitle('Você precisa escolher um poder válido')
                .setDescription(`Você tentou escolher \`${interaction.options.getUser('power')}\`, use \`/powers\` e utilize o "Alias" do poder desejado`)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }

        if(fightList[interaction.channel.id]) {
            let emb = new EmbedBuilder()
                .setTitle('O canal já esta sendo utilizado')
                .setDescription(`A briga entre os usuários <@${fightList[interaction.channel.id].user1.id}> e <@${fightList[interaction.channel.id].user2.id}> está acontecendo nesse canal, aguarde`)
                .setColor('Red')

            return interaction.reply({ embeds: [emb], ephemeral: true })
        }

        // export all data from interaction.user
        getInfo(interaction.user, (err, r) => {
            if (err) {
                let emb = new EmbedBuilder()
                    .setTitle('Houve algum problema')
                    .setDescription('Contate o suporte ou tente novamente')
                    .setColor('Red')
                console.log(err)
                return interaction.reply({ ephemeral: true, embeds: [emb] })
            }

            console.log(r)

            // criar o convite para luta
            let emb = new EmbedBuilder()
            .setTitle('Você foi desafiado para um combate')
            .setDescription(`${interaction.user} lhe desafiou para uma luta, escolhe o seu poder nessa mensagem para aceitar`)
            .setColor('Gold')

            interaction.reply({ ephemeral: true, content: 'Convite enviado.'})
            var r = interaction.channel.send({ content: `${target}`, embeds:[emb]})
        })
    }
}   