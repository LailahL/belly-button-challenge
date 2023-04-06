const url2 = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise2= d3.json(url2);
console.log("Data Promise2:", dataPromise2);

d3.json(url2).then(function(data) {
    console.log(data);

});