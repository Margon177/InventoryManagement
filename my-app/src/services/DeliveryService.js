const axios = require('axios');

export async function getAllDeliveries() {

    const response = await axios.get('/api/deliveries');
    return response.data;
}

export async function createDelivery(data) {
    const response = await axios.post(`/api/delivery`, {delivery: data});
    return response.data;
}