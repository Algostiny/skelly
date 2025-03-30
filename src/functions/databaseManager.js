const fs = require('fs')

module.exports = {
    writeJson (dir, data) {
        return new Promise(async (resolve, reject) => {
            if(dir && data) {
                await fs.writeFileSync(dir, JSON.stringify(data))
                resolve(200)
            }
            else reject('Parâmetros faltando - ' + dir)
        })
    }
}