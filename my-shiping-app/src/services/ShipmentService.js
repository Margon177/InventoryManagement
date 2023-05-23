const axios = require('axios');

export async function getAllShipments() {

    const response = await axios.get('/api/shipments');
    return response.data;
}

export async function getCurrentStock() {

    const response = await axios.get('/api/stock');
    return response.data;
}

export async function createShipment(data) {
    const response = await axios.post(`/api/shipment`, {delivery: data});
    return response.data;
}