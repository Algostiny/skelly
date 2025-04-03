const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('measure')
    .setDescription('Measure something of a person or a object')
    .setNameLocalization('pt-BR', 'medir')
    .setDescriptionLocalization('pt-BR', 'Meça alguma coisa de algo ou alguém')
    .addSubcommand(subcmd => 
        subcmd.setName('penis')
        .setDescription('The thing :smirk:')
        .addUserOption( option =>
            option.setName('user')
            .setDescription('Target to measure')
        )
    )
    .addSubcommand(subcmd => 
        subcmd.setName('gaymeter')
        .setDescription('The percentage of gay in the user')
        .addUserOption( option =>
            option.setName('user')
            .setDescription('Target to measure')
        )
    ),

    execute (client, interaction) {
        let subcmd = interaction.options.getSubcommand()
        var response = 'teste';
        let target = interaction.options.getUser('user') || interaction.user
        let id;

        if(target.id == client.user.id) {
            let gifs = [
                'https://i.pinimg.com/originals/17/dd/22/17dd22ec6dafa441c1b4131e9969c63d.gif',
                'https://giffiles.alphacoders.com/124/124973.gif',
                'https://i.pinimg.com/originals/56/b7/64/56b7642388e52d62910a8806a18e10be.gif',
                'https://tenor.com/view/satoru-gojo-domain-expansion-muryoo-kuusho-six-eyes-jujutsu-kaisen-gif-2102848127558680877',
                'https://tenor.com/view/gojo-satoru-gif-949319236308169219'
            ]
            let phrases = [
                'VC ME DEIXOU IRRITADO.. RAAAASENNNNNNGANNNNNNNNNN',
                'agr acabou pra vc, CHIDORIIIIIIIIIIIIIIIIIIIII',
                'ha ha ha.. GEAR FOUURRTTHHHHHH',
                'Nao se atreva.. EXPANSAO DE DOMINIO: MUGEN',
                'VAZIOOOO ROXOOO'
            ]

            let i = Math.floor(Math.random()*gifs.length)
            return interaction.reply({content: `${phrases[i]}\n${gifs[i]}`})
        }

        switch (subcmd) {
            case 'penis':
                id = parseInt(`${parseInt(target.id.slice(-2))+parseInt(process.env.SEED)}`.slice(-2))
                // console.log(id)
                response = `${target} tem um ${['pepino','manguço','varote','menino','cabeçote','rifle'][Math.floor(Math.random()*6)]} de ${Math.round(id/3)}cm\n\nSeria desse tamanho: 8${'='.repeat(Math.floor(id*0.1))}D`
                break;
            case 'gaymeter':
                id = (parseInt(`${parseInt(target.id.slice(-8))+parseInt(process.env.SEED)}`.slice(-8)) * 0.000001)
                let phrase = Math.floor(id / 25)
                response = [
                    `%target% é um ${['cabra macho', 'homem', 'Homem', 'machão', 'mulherengo'][Math.floor(Math.random()*5)]}, sendo %percentage%% homossexual`,
                    `%target% é um pouco confuso, ${['talvez goste de homens', 'provável que goste de mulheres'][Math.floor(Math.random()*2)]} com %percentage%% de gay`,
                    `Pelo visto %target% tem tendências de ${['dar o furico', 'gostar de prazer anal em si', 'explorar novas coisas', 'sair do armário'][Math.floor(Math.random()*4)]} com %percentage%% de homossexualidade`,
                    `Não existem dúvidas, %target% ${['frequenta a página da Choquei','escuta Lana Del Rey', 'da o butico', 'é fanta', 'gosta de homens', 'é parente do Kermito'][Math.floor(Math.random()*6)]} com incríveis %percentage%% de gay`
                ][phrase].replace('%target%', `${target}`).replace('%percentage%', `${id}`.substring(0,4))
                break;
            default:
                break;
        }

        interaction.reply({ content: response })
    }
}