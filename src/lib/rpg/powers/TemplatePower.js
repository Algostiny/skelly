class Power {
    constructor ({lvl=1, effects=[]}) {
        this.effects = effects
        this.lvl = lvl

        this.hp = this.calcHP()
        this.maxHp = this.hp
        this.mp = this.calcMP()
        this.maxMp = this.mp

        this.log = []
    }

    get stats() {
        return this.constructor.stats
    }
    get attacks() {
        return this.constructor.attacks
    }
    get passives() {
        return this.constructor.passives
    }

    calcMP() {
        let q = Math.floor(Math.sqrt(this.stats.str + this.stats.def + this.stats.spd)) + this.lvl
        return 75 + Math.floor(q * 0.2) * 5
    }
    calcHP() {
        let q = Math.round(this.lvl*Math.pow(this.stats.def, 0.8)*0.1+ Math.pow(this.stats.def, 0.9))
        // console.log(this.lvl)
        return 50 + Math.floor(q * 0.2) * 5
    }

    executeAttack(atk, target, battle) {
        if (atk.execute) atk.execute(this, target, battle)
    }

    executePassives() {
        for (let passive of this.passives) {
            if (passive.execute) this.addLog(passive.execute(this))
        }
    }

    executeEffects() {
        for (let effect of this.effects) {
            if (effect.execute) this.addLog(effect.execute(this))
        }
    }

    addLog(t) {
        if (this.log.length > 0 && this.log[this.log.length-1]) this.log[this.log.length-1].push(t)
    }

    proceedLog() {
        this.log.push([])
    }
}

module.exports = Power