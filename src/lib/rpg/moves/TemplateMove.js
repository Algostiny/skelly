class Attack {
    constructor ({name, description, id, lvlRequired=0, power=65, type, quotes, precision=500}) {
        this.name = name
        this.id = id
        this.description = description
        this.type = type
        this.lvlRequired = lvlRequired
        this.quotes = quotes
        this.power = power
        this.precision = precision
    }

    execute() {
        throw new Error('O código do ataque não foi implementado')
    }

    calcDmg(atk, me, target) {
        return Math.ceil(atk.power * 0.6 * (me.stats.str + 35) / (target.stats.def + 60) - atk.power*0.2 + atk.power*0.4*Math.random()) 
    }

    calcHit(atk, me, target) {
        let need = (Math.sqrt(me.stats.spd/target.stats.spd)*atk.precision)
        let roll = Math.random()*100
        return {need, roll, sucess: roll < need}
    }
}

module.exports = Attack