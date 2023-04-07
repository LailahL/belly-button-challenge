const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise= d3.json(url);
console.log("Data Promise:", dataPromise);



dataPromise.then(function(data) {
  const dropdownMenu = d3.select("#selDataset");
  data.names.forEach(function (dataname) {
    dropdownMenu.append("option").text(dataname).property("value", dataname);
  })

  d3.selectAll("#selDataset").on("change", fetchData);
  function fetchData() {
  let selection=document.getElementById("selDataset").value;

  function init(jdata) {
    var samples=jdata.samples;
    var filtered=samples.filter(metData=>
      metData.id==selection);
    var allDATA=filtered[0];

    var metaData=jdata.metadata;
    var filteredMeta=metaData.filter(metametData=>
      metametData.id==selection);
    var allmetaDATA=filteredMeta[0];

  
  function createbarh(){
    var data1 = [{
     x: allDATA.sample_values.slice(0,10).reverse(),
     y: allDATA.otu_ids.map(otuid=>`OTU ${otuid}`).slice(0,10).reverse(),
     text:allDATA.otu_labels.slice(0,10).reverse(),
     type: "bar",
     orientation: "h"
   }];
 
   const layout = {
     l: 50,
     r: 50,
     t: 50,
     b: 50,

   };
   
   Plotly.newPlot("bar", data1, layout);
    }
    createbarh();

  function createbubbleChart(){
    var data2 = [{
      x: allDATA.otu_ids,
      y: allDATA.sample_values,
      text:allDATA.otu_labels,
      type:"scatter",
      mode: "markers",
      marker: {
        size: allDATA.sample_values,
        color:allDATA.otu_ids,
        }
        }];
    
      const layout2 = {
        xaxis:{ 
          title:"OTU ID",
        }
   
      };
      
      Plotly.newPlot("bubble", data2, layout2);
      }
    createbubbleChart();

    function demoGraphy() {
      let PANEL = d3.select("#sample-metadata");
      console.log("here")
     
      PANEL.html("");
      for (key in allmetaDATA){
        PANEL.append("h6").text(`${key.toUpperCase()}: ${allmetaDATA[key]}`);
      }
      
      var data = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 450,
    title: { text: "Speed" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 400 },
    gauge: { axis: { range: [null, 500] } }
      }
    ];

    var layout = { width: 600, height: 400 };
    Plotly.newPlot('myDiv', data, layout);


    }demoGraphy();

    function buildGauge() {

      var data4 = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: allmetaDATA.wfreq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          delta: { reference: 9 },
          gauge: { axis: { range: [null, 10] } }
        }
      ];
      
      var layout4 = { width: 600, height: 400 };
      let gauge1=document.getElementById("gauge");
      Plotly.newPlot(gauge1, data4, layout4);

    }buildGauge();
      
      }init(data);
    }})

  
 