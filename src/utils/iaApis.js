const axios = require('axios')
const fs = require('fs')

async function genText(n) {
    if (!n) return;

    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINIKEY}`

    let response = await axios.post(url,
        {
            "contents": [{
                "parts": [{ "text": n }]
            }]
        }
    )

    return response.data.candidates[0].content.parts[0].text;
}

async function genImage(msg = 'clown dancing') {
    let url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFAREID}/ai/run/@cf/lykon/dreamshaper-8-lcm`

    let response = await axios.post(
        url,
        {
            prompt: msg
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.CLOUDFARETOKEN}`,
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
        }
    );

    return response.data
}

async function detectSentiment(msg) {
    if (!msg) throw new Error('Texto inválido')

    try {
        let url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFAREID}/ai/run/@cf/meta/m2m100-1.2b`
        let response = await axios.post(url,
            {
                text: msg,
                source_lang: 'pt',
                target_lang: 'en'
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFARETOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        if(!response.data.success) return console.log('ERROR TRANSLATING')

        url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFAREID}/ai/run/@cf/huggingface/distilbert-sst-2-int8`
        response = await axios.post(
            url,
            {
                text: response.data.result.translated_text
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFARETOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    genText,
    genImage,
    detectSentiment
}   