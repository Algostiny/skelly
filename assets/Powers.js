function randArrayElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

module.exports = {
    soru:{
        name: "Soru Soru no Mi",
        alias: "soru",
        description: "LIFE OR DEATH??",
        moves: {
            attack: {
                description: "Ataque algum alvo",
                usage: "soru atk (alvo)"
            },
            lifeordeath: {
                description: "Coloque a vida de alguém em jogo",
                usage: "soru lod (@alvo)"
            }
        },
        color: () => {return randArrayElement(["#F3A9B3","#EB4B64"])},
        imgs: {
            pose: () => {return randArrayElement([
                "https://media.discordapp.net/attachments/950485727618150492/1196892509125754900/pose0.gif",
                "https://media.discordapp.net/attachments/950485727618150492/1196892509478072440/pose1.gif"
            ])},
            attack: ()=>{return randArrayElement([
                "https://media.discordapp.net/attachments/950485727618150492/1196892507582238810/attack0.gif",
                "https://media.discordapp.net/attachments/950485727618150492/1196892510367268905/attack1.gif",
                "https://media.discordapp.net/attachments/950485727618150492/1196892509838774394/rage.gif"
            ])},
            lifeordeath: "https://media.discordapp.net/attachments/950485727618150492/1196892508748255232/lifeordeath.gif",
            life: "https://media.discordapp.net/attachments/950485727618150492/1196892507959738418/life.gif",
            death: "https://media.discordapp.net/attachments/950485727618150492/1196892508307857508/death.gif"
        }
    }
}