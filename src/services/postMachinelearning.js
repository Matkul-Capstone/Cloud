const axios = require('axios');
require('dotenv').config();

async function postMachineLearning(sentence, audio_file){
    try {
        audio_file.append('reference_passage', sentence);

        const response = await axios.post(process.env.ML_URL, audio_file, {
            headers: {
                ...audio_file.getHeaders()
            }
        });

        return response;
    } catch (error){
        error.statusCode = 400;
        error.message = 'Failed to post data to machine learning server.';
        throw error
    }
}

module.exports = postMachineLearning;