const axios = require('axios')

const jogos = []
const rodadas = 1

async function getRodada(n) {
    let r = await axios.get(`https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-campeonato-brasileiro-2025/rodada/${n + 1}/jogos/`)
    jogos.push(r.data)
}

(async () => {
    for (let i = 0; i < rodadas; i++) {
        await getRodada(i)
    }
})()


module.exports = {
    getRodada
}   