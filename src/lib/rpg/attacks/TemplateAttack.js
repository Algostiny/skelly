class Attack {
    constructor ({name, description, id, lvlRequired=0, maestry=0, power=0, type}) {
        this.name = name
        this.id = id
        this.description = description
        this.type = type
        this.lvlRequired = lvlRequired

        this.power = power
    }

    execute() {
        throw new Error('O código do ataque não foi implementado')
    }

    calcDmg(atk, me, target) {
        return atk.power * (me.stats.str + 25) / (target.stats.def + 50)
    }

    calcHit(atk, me, target) {
        return Math.random*100 < (Math.sqrt(me.stats.spd/target.stats.spd)*atk.precision)*0.5
    }
}

module.exports = Attack