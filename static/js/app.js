const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise= d3.json(url);
console.log("Data Promise:", dataPromise);




function init() {
    let data1 = [{
      x: [],
      y: [],
      text:[],
      type: "bar",
      orientation: "h"
    }];
  
    let layout = {
      l: 50,
      r: 50,
      t: 50,
      b: 200,

    };
  
    Plotly.newPlot("bar", data1, layout);
}

  d3.selectAll("#selDataset").on("change", updatePlotly);
  function updatePlotly() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = [];
    let x = [];
    let y = [];
    let text = [];
    dataPromise.then(function(data) {
      for (i=0;i<data.samples.length;i++) {
        for (j=0;j<data.samples[0].otu_ids.length;j++) {
        let testSubjectID = data.samples[i].id;
        dataset.push("<option>"+ data.names[i]+"</option>");
          if (dataset===testSubjectID) {  
            let sample_values = parseInt(data.samples[i].sample_values[j]);
            x.push(sample_values);
            let otu_ids= "OTU " + data.samples[i].otu_ids[j];
            y.push(otu_ids)
            let otu_labels = data.samples[i].sample_values[j];
            text.push(otu_labels)
            console.log(data.samples[i]);
          }}
      }
    });
    document.getElementById("#selDataset").innerHTML=dataset.join("");
 
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
}
      
    init();