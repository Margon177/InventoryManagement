const express = require('express');
const randomId = require('random-id');
const cron = require("node-cron");
const app = express(),
      bodyParser = require("body-parser");
      port = 3070;

// place holder for the data
const deliveries = [
  {
    id: "1",
    date: "2021-01-22",
    invNo: "SA0U125",
    supplier: "Masey",
    item: "Bulgulator",
    qty: "123",
    status: "APPROVED"
  },
  {
    id: "2",
    date: "2022-03-12",
    invNo: "3Q25FE2",
    supplier: "Pinkey",
    item: "Bulgotnica",
    qty: "987",
    status: "APPROVED"
  },
  {
    id: "3",
    date: "2023-04-15",
    invNo: "AGSOQ2",
    supplier: "Miney",
    item: "Workownica",
    qty: "235",
    status: "APPROVED"
  }
];

app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

cron.schedule("*/15 * * * * *", function () {
  console.log("---------------------");
  console.log("running a task every 15 second");
  deliveries.forEach(element => {
    if(element.status == "NEW" && element.invNo != "" && 
      element.item != ""  && element.qty > 0  && element.supplier != ""){
      element.status = "APPROVED"
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