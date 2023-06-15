const axios = require('axios');

export async function sendConfig(data) {
    const response = await axios.post(`/my-app`, {config: data});
    return response.data;
}