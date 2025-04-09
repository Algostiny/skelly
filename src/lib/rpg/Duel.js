class Duel {
    constructor(power1, power2, user1, user2) {
        this.powers = []
        this.users = []

        if (power1.stats.spd > power2.stats.spd) {
            this.powers.push(power1)
            this.powers.push(power2)
            this.users.push(user1)
            this.users.push(user2)
        }
        else if (power1.stats.spd == power2.stats.spd) {
            let r = Math.round(Math.random() * 1)
            if (r == 0) {
                this.powers.push(power1)
                this.powers.push(power2)
                this.users.push(user1)
                this.users.push(user2)
            }
            else {
                this.powers.push(power2)
                this.powers.push(power1)
                this.users.push(user2)
                this.users.push(user1)
            }
        }
        else {
            this.powers.push(power2)
            this.powers.push(power1)
            this.users.push(user2)
            this.users.push(user1)
        }

        this.arenaEffects = []
        this.turn = 0
        this.log = []
        this.playing = 0
    }

    runTurn(action) {
        if(this.playing == 0) this.log.push([[], []])
        let playerPlaying = this.users[this.playing]
        let playerNotPlaying = this.users[1 - this.playing]

        let powerPlaying = this.powers[this.playing]
        let powerNotPlaying = this.powers[1 - this.playing]

        //


        if (action.type == "move") {
            if (powerPlaying.attacks[action.id]) this.addLog(powerPlaying.attacks[action.id].execute(powerPlaying, powerNotPlaying, this))
        }
        else {

        }

        this.execPassives()
        //

        this.turn += 1
        this.playing = 1 - this.playing
    }

    addLog(t,u) {
        if(u) return this.log[this.log.length-1][u == "zero" ? 0 : 1].push(t.log[0])
        
        this.log[this.log.length-1][this.playing].push(t.log[0])
        if(t.log[1]) this.log[this.log.length-1][1-this.playing].push(t.log[1])
    }

    execPassives() {

        for (let passive of this.powers[1].passives) {
            if (passive.execute) {
                let r = passive.execute(this.powers[1], this.powers[0], this)
                if (r && r.log) this.addLog(r, "one")
            }
        }

        for (let passive of this.powers[0].passives) {
            if (passive.execute) {
                let r = passive.execute(this.powers[0], this.powers[1], this)
                if (r && r.log) this.addLog(r, "zero")
            }
        }
    }
}

module.exports = Duel