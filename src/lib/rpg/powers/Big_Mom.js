const Power = require('./TemplatePower.js');
const GenericAttack = require('../moves/GenericAttack.js')
const lowHealthBuff = require('../passives/lowHealthBuff.js')

class BigMom extends Power {
    static name = 'Big Mom'
    static prefix = "bigmom"
    static description = "Nenhum pirata no mundo tem uma família tão grande… e tão disfuncional"
    static color = "Pink"
    static obtainedMethod = 2

    static mpName = "SOULS"
    static passives = [
    new lowHealthBuff({
        name: 'Hungry',
        description: 'Quando seu apetite aumenta, fica sem controle',
        quotes: {
            activation: ['Está sentindo fome...', 'Perdeu a razão em prol de seu apetite', 'Entrou em fúria']
        },
        buff: {
            str: 0.3,
            spd: -0.1
        }
    })
    ]
    static attacks = {
        punch: new GenericAttack({
            name: 'Golpe',
            description: 'Um poderoso golpe em cheio',
            id: 'punch',
            quotes: {
                sucess_atk: ['Lançou um golpe poderoso', 'Utilizou um ataque físico'],
                sucess_def: ['Foi atingido por um golpe, recebendo %DMG% de dano', 'Recebeu um ataque em cheio, perdeu %DMG% HP'],
                fail: ['Errou um golpe físico', 'Tentou lançar um golpe e falhou', 'Não acertou a mira de seu soco']
            },
            lvlRequired: 0,
        })
    }
    static stats = {
        str: 85,
        def: 75,
        spd: 60
    }

    constructor(info, souls=5) {
        super(info)

        this.mp = 5
        this.maxMp = 10
    }
}

module.exports = BigMom