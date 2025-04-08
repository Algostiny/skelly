const Power = require('./TemplatePower.js');
const GenericAttack = require('../attacks/GenericAttack.js')

class StarPlatinum extends Power {
    static name = 'Star Platinum'
    static id = "sp"
    static description = "Um espírito roxo com uma capacidade física e reflexos excelentes! Além de um poder além do comum..."
    static color = "DarkPurple"
    static obtainedMethod = 1

    static mpName = "STM"
    static passives = [{
        name: 'Timestopper',
        description: 'O usuário pode parar o tempo e é imune a isso'
    }]
    static attacks = {
        punch: new GenericAttack({
            name: 'Golpe',
            description: 'Um poderoso golpe em cheio',
            id: 'punch',
            quotes: {
                sucess_atk: ['Lançou um golpe poderoso', 'Utilizou um ataque físico'],
                sucesss_def: ['Foi atingido por um golpe, recebendo %DMG% de dano', 'Recebeu um ataque em cheio, perdeu %DMG% HP'],
                fail: ['Errou um golpe físico', 'Tentou lançar um golpe e falhou', 'Não acertou a mira de seu soco']
            },
            lvlRequired: 0,
        }),
        barrage: new GenericAttack({
            name: 'Barragem de Socos',
            description: 'Uma chuva de golpes no seu oponente',
            id: 'barrage',
            quotes: {
                sucess_atk: ['ORA ORA ORA ORA ORA', 'Atacou com uma onda de acertos'],
                sucesss_def: ['Foi atingido por múltiplos golpes, recebendo %DMG% de dano', 'Recebeu uma onda de ataques, perdeu %DMG% HP'],
                fail: ['Não conseguiu causar efeito', 'Falhou em usar o seu ataque múltiplo', 'Não acertou nenhum de seus golpes']
            },
            lvlRequired: 3
        }
        )
    }
    static stats = {
        str: 75,
        def: 60,
        spd: 80
    }

    constructor(info) {
        super(info)
    }
}

module.exports = StarPlatinum