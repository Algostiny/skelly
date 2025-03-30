const { spawn } = require('child_process');

function executePython(fileName, args) {
    return new Promise((resolve, reject) => {
        // Executa o script Python
        const pythonProcess = spawn('python3', [`src/functions/${fileName}.py`, args]);
        let dados = '';

        // Captura a saída do Python
        pythonProcess.stdout.on('data', (data) => {
            dados += data.toString();
        });

        // Trata erros
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Erro no Python: ${data}`);
            reject(data.toString());
        });

        // Quando o processo terminar
        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`Processo Python terminou com código ${code}`);
            } else {
                try {
                    // Converte a saída para JSON (assumindo que o Python imprimiu um JSON)
                    const resultado = JSON.parse(dados);
                    resolve(resultado);
                } catch (err) {
                    reject("Falha ao analisar a saída do Python");
                    console.error(err)
                }
            }
        });
    });
}

module.exports = executePython