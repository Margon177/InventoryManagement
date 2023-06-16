const express = require('express');
const randomId = require('random-id');
const cron = require("node-cron");
const app = express(),
      bodyParser = require("body-parser");
      port = 3070;

// place holder for the deliveries
const deliveries = [];

// place holder for the shipments
const shipments = [];

// Current Stock 
const stock = [];

//Configurations
let configurations = [];


function addToStock(itemToAdd){
  const item = itemToAdd.item;
  const qty = itemToAdd.qty;
  console.log("I'm in [addToStock]");
  console.log("stock list length: "+ stock.length);
  console.log("element:" + item + " " + qty);
  console.log("current stock list: " + JSON.stringify(stock));
  
  if(stock.length === 0){
    stock.push(itemToAdd);
    console.log("created stock => item: " + stock[0].item + " qty: " + stock[0].qty);
  } else {
    findItem(itemToAdd,stock);
  }
}

function findItem(itemToFind,stock){

  //UPDATE
  stock.forEach(el => {
    console.log("Stock: " + el.item);
    console.log("Element: " + itemToFind.item);
    if(itemToFind.item === el.item){
      console.log("I'm going to Update" + JSON.stringify(el));
      el.qty += itemToFind.qty; 
      console.log("updated stock => item: " + el.item + " qty: " + el.qty);
    }
  })

  //NEW
  if(!stock.find(element => element.item === itemToFind.item)){
    stock.push(itemToFind);
  }
}

function processDeliveries(){
  //Process available Deliveries
  deliveries.forEach(element => {
    if(element.status == "NEW" && element.invNo != "" && 
      element.item != ""  && element.qty > 0  && element.supplier != ""){
      element.status = "APPROVED"
      console.log("item to approve: " + element.item);
      const stockElement = {item: element.item, qty: Number(element.qty)};
      console.log("StockElement to add: " + JSON.stringify(stockElement));
      
      //Puts items from deliveries to stock
      addToStock(stockElement);
    }else if(element.status == "APPROVED"){
      console.log("Order "+element.invNo + " is OK")
    } else{
      element.status = "DENIED";
    }
  });
}

//Process new shipment and modify stock
function processNewShipment(shipment){

  //Modify stock
  stock.forEach(el => {
    console.log("Stock: " + el.item);
    console.log("Element: " + shipment.item);
    if (shipment.item === el.item) {
      console.log("I'm going to Update" + JSON.stringify(el));
        if (el.qty - shipment.qty >= 0) {
          el.qty -= shipment.qty; 
          console.log("updated stock => item: " + el.item + " qty: " + el.qty);

          //Change status of shipment
          shipment.status = "REGISTERED";

          //Put away current shipment on stack
          shipments.push(shipment);
        } else {
            //Change status of shipment
            shipment.status = "FAULTY";

            //Put away current shipment on stack
            shipments.push(shipment);
            console.log("Oh shoot! Something bad happended!")
        }
    }
  })
}

//Process of shipment approval
function processShipments(){
  shipments.forEach(element => {
    if(element.status == "REGISTERED"){
      element.status = "APPROVED"
      console.log("Shipment "+element.invNo + " is APPROVED")
    }
  })
}

//Receive new config
function processNewConfig(config){
  configurations = config;
}


app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

//setup cron schedule
cron.schedule("*/15 * * * * *", function () {
  console.log("---------------------");
  console.log("running a task every 15 second");
  processDeliveries();
  processShipments();
});

//REST API
//RECEIVING
app.get('/api/deliveries', (req, res) => {
  console.log('api/deliveries called!!!!!!!')
  res.json(deliveries);
});

//RECEIVING
//SENDING
app.post('/api/delivery', (req, res) => {
  const delivery = req.body.delivery;
  delivery.id = randomId(10);
  console.log('Adding delivery:::::', delivery);
  deliveries.push(delivery);
  res.json("delivery addedd");
});

//SHIPPING
//SENDING
app.get('/api/shipments', (req, res) => {
  console.log('api/shipments called!!!!!!!')
  res.json(shipments);
});

//RECEIVING
app.post('/api/shipment', (req, res) => {
  const shipment = req.body.shipment;
  shipment.id = randomId(10);
  console.log('Adding shipment:::::', shipment);
  processNewShipment(shipment);
  res.json("shipment addedd");
});

//STOCK
//RECEIVING
app.get('/api/stock', (req, res) => {
  console.log('api/stock called!!!!!!!')
  res.json(stock);
});

//CONFIGURATIONS
//RECEIVING
app.post('/api/newConfig', (req, res) => {
  console.log(JSON.stringify(req.body.configurations));
  const config = req.body.configurations;
  console.log('Adding config:::::', JSON.stringify(config));
  processNewConfig(config);
  res.json("config addedd");
});

//SENDING
app.get('/api/configurations', (req, res) => {
  console.log('api/configurations called!!!!!!!')
  res.json(configurations);
});


app.get('/', (req,res) => {
  res.sendFile(process.cwd() + '/my-app/dist/index.html');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});