const express = require('express');
const randomId = require('random-id');
const cron = require("node-cron");
const app = express(),
      bodyParser = require("body-parser");
      port = 3070;

// place holder for the deliveries
const deliveries = [];

// Current Stock 
const stock = [];

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
  console.log("I'm in [findItem]")
  const breakPoint = stock.length;

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

app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

cron.schedule("*/15 * * * * *", function () {
  console.log("---------------------");
  console.log("running a task every 15 second");
  deliveries.forEach(element => {
    if(element.status == "NEW" && element.invNo != "" && 
      element.item != ""  && element.qty > 0  && element.supplier != ""){
      element.status = "APPROVED"
      console.log("item to approve: " + element.item);
      const stockElement = {item: element.item, qty: Number(element.qty)};
      console.log("StockElement to add: " + JSON.stringify(stockElement));

      addToStock(stockElement);
    }else if(element.status == "APPROVED"){
      console.log("Order "+element.invNo + " is OK")
    } else{
      element.status = "DENIED";
    }
  });
});

app.get('/api/deliveries', (req, res) => {
  console.log('api/deliveries called!!!!!!!')
  res.json(deliveries);
});

app.get('/api/stock', (req, res) => {
  console.log('api/stock called!!!!!!!')
  res.json(stock);
});

app.post('/api/delivery', (req, res) => {
  const delivery = req.body.delivery;
  delivery.id = randomId(10);
  console.log('Adding delivery:::::', delivery);
  deliveries.push(delivery);
  res.json("delivery addedd");
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd() + '/my-app/dist/index.html');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});