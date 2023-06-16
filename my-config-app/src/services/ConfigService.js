const axios = require('axios');

export async function sendConfig(data) {
    console.log(data);
    const response = await axios.post(`/api/newConfig`, {configurations: data});
    return response.data;
}