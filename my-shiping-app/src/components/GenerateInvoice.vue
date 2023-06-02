<template>
    <div id="app" ref="document">
      <div id="element-to-convert">
        <center>
          <img width="400" src="./assets/constellation.png" />
        </center>
      </div>
      <button @click="exportToPDF">Print an Invoice as PDF</button>
    </div>
  </template>

<script>

import html2pdf from "html2pdf.js";

export default {
  name: "invoice",
  
  data: {

  },
 
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
				margin: 1,
  			filename: "invoice.pdf",
			});
    },
  },
};
</script>

<style>
#app {
  margin-top: 60px;
  text-align: center;
}
</style>