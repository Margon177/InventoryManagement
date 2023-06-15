const axios = require('axios');

export async function getAllDeliveries() {

    const response = await axios.get('/api/deliveries');
    return response.data;
}

export async function getCurrentStock() {

    const response = await axios.get('/api/stock');
    return response.data;
}

export async function createDelivery(data) {
    const response = await axios.post(`/api/delivery`, {delivery: data});
    return response.data;
}

export async function getConfig() {

    const response = await axios.get(`/my-config-app`);
    return response.data;
}