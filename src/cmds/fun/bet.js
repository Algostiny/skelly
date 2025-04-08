const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bet')
        .setDescription('Bet and play..')
        .setNameLocalization('pt-BR', 'apostar')
        .setDescriptionLocalization('pt-BR', 'Aposte e jogue')
        .addSubcommand(cmd =>
            cmd.setName('coinflip')
                .setDescription('Choose face or crown and roll a coin')
                .setNameLocalization('pt-BR', 'moeda')
                .setDescriptionLocalization('pt-BR', 'Escolha entre cara ou coroa e jogue uma moeda')
                .addStringOption(option =>
                    option
                        .setName('choose')
                        .setDescription('The face you choose')
                        .setNameLocalization('pt-BR', 'escolha')
                        .setDescriptionLocalization('pt-BR', 'A face escolhida')
                        .addChoices(
                            { name: 'Face', name_localizations: { "pt-BR": 'Cara' }, value: 'face' },
                            { name: 'Crown', name_localizations: { "pt-BR": 'Coroa' }, value: 'crown' }
                        )
                )
        )
        .addSubcommand(cmd =>
            cmd.setName('rps')
                .setDescription('Rock paper and scissors')
                .setNameLocalization('pt-BR', 'ppt')
                .setDescriptionLocalization('pt-BR', 'Pedra papel e tesoura')
                .addStringOption(option =>
                    option
                        .setName('choose')
                        .setDescription('Your choose')
                        .setNameLocalization('pt-BR', 'escolha')
                        .setDescriptionLocalization('pt-BR', 'A sua escolha')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Rock', name_localizations: { "pt-BR": 'Pedra' }, value: 'rock' },
                            { name: 'Paper', name_localizations: { "pt-BR": 'Papel' }, value: 'paper' },
                            { name: 'Scissors', name_localizations: { "pt-BR": 'Tesoura' }, value: 'scissors' }
                        )
                )
        )
        .addSubcommand(cmd =>
            cmd.setName('slotmachine')
                .setDescription('Let\'s go gambling')
                .setNameLocalization('pt-BR', 'sm')
                .setDescriptionLocalization('pt-BR', 'Aposte tudo..')
        ),

    execute(client, interaction) {
        // ['coinflip','guessnumber','rps','rr','roulette','cassino'];

        switch (interaction.options.getSubcommand()) {
            case 'coinflip':
                let choose = interaction.options.getString('choose')
                if (!choose) {
                    return interaction.reply('Você jogou uma moeda e tirou ' + ['cara', 'coroa'][Math.floor(Math.random() * 2)])
                }

                if (!['face', 'crown'].includes(choose)) return interaction.reply({ content: 'A sua escolha não é válida, escolha entre cara ou coroa', flags: [MessageFlags.Ephemeral] })

                let r = ['face', 'crown'][Math.floor(Math.random() * 2)]
                interaction.reply(`Você escolheu ${{ 'face': 'cara', 'crown': 'coroa' }[r]} e tirou ${{ 'face': 'cara', 'crown': 'coroa' }[r]}, ${r == choose ? ['você ganhou!'] : 'você perdeu...'}`)
                break;
            case 'rps':
                let c_ = interaction.options.getString('choose')

                if (!['rock', 'paper', 'scissors'].includes(c_)) return interaction.reply({ content: 'A sua escolha não é válida, escolha entre cara ou coroa', flags: [MessageFlags.Ephemeral] })

                let r_ = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
                let translate = { 'rock': 'pedra', 'paper': 'papel', 'scissors': 'tesoura' }
                if (r_ == 'rock' && c_ == 'paper' || r_ == 'paper' && c_ == 'scissors' || r_ == 'scissors' && c_ == 'rock') {
                    interaction.reply(`Eu escolhi ${translate[r_]} e você escolheu ${translate[c_]}, você ganhou!`)
                }
                else if (r_ == 'paper' && c_ == 'rock' || r_ == 'scissors' && c_ == 'paper' || r_ == 'rock' && c_ == 'scissors') {
                    interaction.reply(`Eu escolhi ${translate[r_]} e você escolheu ${translate[c_]}, eu ganhei!`)
                }
                else if (r_ == c_) {
                    interaction.reply(`Eu escolhi ${translate[r_]} e você escolheu ${translate[c_]}, aconteceu um empate!`)
                }

                break;
            case 'slotmachine':
                let ar = ['🍒','🍒','🍒','🍒','🍒','🍒','🍒','🪙','🪙','🪙','🪙','🪙','💰','💰','💰','💎','💎','7️⃣']

                let first_row =  [ar[Math.floor(Math.random()*ar.length)],ar[Math.floor(Math.random()*ar.length)],ar[Math.floor(Math.random()*ar.length)]]
                let second_row = [ar[Math.floor(Math.random()*ar.length)],ar[Math.floor(Math.random()*ar.length)],ar[Math.floor(Math.random()*ar.length)]]
                let third_row =  [ar[Math.floor(Math.random()*ar.length)],ar[Math.floor(Math.random()*ar.length)],ar[Math.floor(Math.random()*ar.length)]]

                var response = response = 'Você não ganhou nada :('
                
                if(second_row[0]==second_row[1]&&second_row[1]==third_row[2]) {
                    if(second_row[0] == '🍒') {response = 'Parabéns! Você ganhou!! x1.5'}
                    else if(second_row[0] == '🪙') {response = 'Parabéns! Você ganhou algo incomum!! x3'}
                    else if(second_row[0] == '💰') {response = 'Parabéns! Você ganhou algo raro!! x5'}
                    else if(second_row[0] == '💎') {response = 'Parabéns! Você ganhou algo MUITO raro!! x10'}
                    else if(second_row[0] == '7️⃣') {response = 'Parabéns! Você ganhou algo EXTREMAMENTE super raro!! x25'}
                }
                else if(first_row[0]==second_row[1]&&second_row[1]==third_row[2] || first_row[2]==second_row[1]&&second_row[1]==third_row[0]) {
                    if(second_row[0] == '🍒')      {response = 'Parabéns! Você ganhou!! x1.25'}
                    else if(second_row[0] == '🪙') {response = 'Parabéns! Você ganhou algo incomum!! x2'}
                    else if(second_row[0] == '💰') {response = 'Parabéns! Você ganhou algo raro!! x4'}
                    else if(second_row[0] == '💎') {response = 'Parabéns! Você ganhou algo MUITO raro!! x8'}
                    else if(second_row[0] == '7️⃣') {response = 'Parabéns! Você ganhou algo EXTREMAMENTE super raro!! x16'}
                }

                interaction.reply({
                    content: `${response}\n       ${first_row[0]}|${first_row[1]}|${first_row[2]}\n:arrow_forward: ${second_row[0]}|${second_row[1]}|${second_row[2]}\n       ${third_row[0]}|${third_row[1]}|${third_row[2]}`
                })
                break;
            default:
                break;
        }
    }
}