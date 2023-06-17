<template>
    <div class="container">
        <h2>Shipments</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Order Id</th>
                <th>Shipment Date</th>
                <th>Invoice No</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Price Per Item</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in shipments" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.invNo }}</td>
                  <td>{{ item.customer }}</td>
                  <td>{{ item.item }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.totalPrice }}</td>
                  <td>{{ item.status }}</td>
                  <td v-if= "item.status == 'APPROVED'" align ='center'>
                    <button @click='generatePDF(item)'>
                        Invoice
                    </button>
                  </td>
              </tr>
            </tbody>
        </table>
    </div>


</template>

<script>

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default {
        name: 'Shipments',
        props: ['shipments'],

data() {
    return {
      heading: "Generated Invoice for Order no: ",
      moreText: ["It's not a scam! If you have any questions about this invoice please do not contact anybody and pay the requested amount now. Cheers!"]
    }
},

methods: {
    generatePDF(item) {
        const columns = [
        { title: "Title", dataKey: "title" },
        { title: "Body", dataKey: "body" }
      ];
      const dataToPrint = [
        {title:"Customer", body:item.customer},
        {title:"Invoice Number", body:item.invNo},
        {title:"Shipping Date",  body:item.date},
        {title:"Item", body:item.item},
        {title:"Quantity", body:item.qty},
        {title:"Price Per Item", body:item.price + ' EUR'},
        {title:"Total Price", body:item.totalPrice + ' EUR'}
     ];
     
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      // text is placed using x, y coordinates
      doc.setFontSize(16).text(this.heading + item.invNo, 0.5, 1.0);
      // create a line under heading 
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // Using autoTable plugin
      autoTable(doc,{
        columns,
        body: dataToPrint,
        margin: { left: 0.5, top: 1.25 }
      });

      doc.setLineWidth(0.01).line(0.5, 5, 8.0, 5);
      // Using array of sentences
      doc
        .setFont("arial")
        .setFontSize(12)
        .text(this.moreText, 0.5, 5.5, { align: "left", maxWidth: "7.5" });
      
      // Creating footer and saving file
      doc
        .setFont("arial")
        .setFontSize(11)
        .setTextColor(0, 0, 255)
        .text(
          "Invoice printed from IMS",
          0.5,
          doc.internal.pageSize.height - 0.5
        )
        .save(`${item.invNo}.pdf`);
    }
}
}
    

</script>