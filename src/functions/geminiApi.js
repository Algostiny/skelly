const axios = require('axios')
const fs = require('fs')

async function sendPost(n) {
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

module.exports = {
    sendPost,
    genImage
}   