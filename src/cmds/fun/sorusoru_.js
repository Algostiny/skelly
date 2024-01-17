const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType} = require('discord.js')
const {} = require('../../functions/discord.js')
const powerInfo = require('../../../assets/Powers.js').soru

// custom funcs
function death(msg, member, response) {
    member.timeout(3*60*1000, `${msg.author.id} - BIG MOM`)

    let emb = new EmbedBuilder()
        .setTitle('DEATH')
        .setDescription(`<@${member.id}> escolheu a sua própria morte...`)  
        .setImage(powerInfo.imgs.death)
        .setColor(powerInfo.color())

    msg.reply({ embeds: [emb] })
    response.delete()
}

function life(msg, member, response) {
    member.timeout(3*60*1000, `${msg.author.id} - BIG MOM`)

    let emb = new EmbedBuilder()
        .setTitle('LIFE')
        .setDescription(`<@${member.id}> escolheu viver, contudo...`)  
        .setImage(powerInfo.imgs.life)
        .setColor(powerInfo.color())

    msg.reply({ embeds: [emb] })
    response.delete()
}

module.exports = {
    data: {
        name: "sorusoru",
        description: powerInfo.description,
        aliases: ["soru"],
        options: [
            {
                name: 'target | "lod"'
            }
        ],
        prefixed: true
    },
    execute: async function (msg, args, client) {
        if(!process.env.OWNER.split('-').includes(msg.author.id)){
            msg.react('🚨')
            return
        }

        if(args[0] == 'lod' || args[0] == 'lifeordeath') {
            let target = msg.mentions.members.first();
            if (!target) {
                let emb = new EmbedBuilder()
                .setTitle('Você precisa mencionar alguém')
                .setDescription(`Exemplo: \`${process.env.PREFIX}${this.data.aliases[0]} lod (@alvo)\``) 
                .setColor('Red')

                return msg.reply({ embeds: [emb], ephemeral: true })
            }

            let emb = new EmbedBuilder()
            .setTitle('LIFE OR DEATH?')
            .setDescription(`<@${target.id}>, O QUE VOCÊ ESCOLHE? LIFE OR DEATH?`)  
            .setImage(powerInfo.imgs.lifeordeath)
            .setColor(powerInfo.color())
            // botao
            let btLife = new ButtonBuilder()
			.setCustomId('life')
			.setLabel('LIFE')
			.setStyle(ButtonStyle.Danger)
            .setEmoji('😵‍💫')
            let btDeath = new ButtonBuilder()
			.setCustomId('death')
			.setLabel('DEATH')
			.setStyle(ButtonStyle.Danger)
            .setEmoji('💀')

            let btRow = new ActionRowBuilder().addComponents(btLife, btDeath)
            //

            let r = await msg.reply({ embeds: [emb], content: `<@${target.id}>`, components: [btRow] })
            let collectorFilter = m => m.user.id === target.id
            const collector = r.createMessageComponentCollector({componentType: ComponentType.Button, filter: collectorFilter, time: 15_000, max: 1})
            var collected = false;

            collector.on('collect', i => {
                collected = true

                if (i.customId == 'death'){
                    death(msg,target,r)
                }
                else{
                    life(msg,target,r)
                }
            })

            collector.on('end', () => {
                if(!collected) {
                    death(msg,target,r)
                }
            })
        }
        else if(args[0] == 'atk' || args[0] == 'attack'){
            let emb = new EmbedBuilder()
            .setTitle('SORU SORU NO MI')
            .setDescription(`${msg.author} atacou ${args.slice(1).join(' ')}`.substring(0,500))  
            .setImage(powerInfo.imgs.attack())
            .setColor(powerInfo.color())

            msg.channel.send({ embeds: [emb] })
        }
        else{
            var movesField = ''
            let movesList = Object.keys(powerInfo.moves)
            for (let move of movesList) {
                let moveInfo = powerInfo.moves[move]
                movesField += `\`${process.env.PREFIX}${moveInfo.usage}\` - ${moveInfo.description}\n`
            }

            let emb = new EmbedBuilder()
            .setTitle('SORU SORU NO MI')
            .setDescription(powerInfo.description)  
            .setImage(powerInfo.imgs.pose())
            .setColor(powerInfo.color())
            .addFields({
                name: 'PODERES',
                value: movesField
            })
            .setFooter({text: '[arg] opcional | (arg) obrigatório'})

            msg.channel.send({ embeds: [emb] })
        }
    }
}