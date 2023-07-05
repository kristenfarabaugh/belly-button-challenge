// Drop down 
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// # is ID, . is class, and nothing is a tag 
let dropDown = d3.select("#selDataset");

d3.json(url).then((data) => {
   
    console.log("Data: ", data); 
    let names = data.names

    for (i=0; i < names.length; i++) {
        dropDown
        // Create a tag, and the name is option
        .append("option")
        // The .text is outside of the HTML tag (the text is what you see on the broswer)
        .text(names[i])
        // Add actual values (the value you pass to the server)
        .property("value", names[i]);

    }

    buildMetaData(names[0])
    buildCharts(names[0])
})

function buildMetaData(id){

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    // # is ID, . is class, and nothing is a tag 
    let box = d3.select("#sample-metadata");
    
    d3.json(url).then((data) => {
        let metadata = data.metadata
        // Check if the id is equal, the the results will be assigned to below variable
        let resultArray = metadata.filter(sampleObj => sampleObj.id == id);
        // Go into the list 
        let result = resultArray[0];

        // Wipes out the box - if you don't do this, it will append the results over and over 
        box.html("")

        for (key in result){
            // The H6 creates the tag, the uppercase is the ID
            box.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
      
    })
}

//This ensures the metadata box updates when a user selects a new id on the dropdown
function optionChanged(id) {
    buildMetaData(id)
    buildCharts(id)

}

function buildCharts(id) {
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    
    d3.json(url).then((data) => {
        let samples = data.samples
        // Check if the id is equal, the the results will be assigned to below variable
        let resultArray = samples.filter(sampleObj => sampleObj.id == id);
        // Go into the list 
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let barData = [
            {
            // .map = "for each"
              y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
              x: sample_values.slice(0, 10).reverse(),
              text: otu_labels.slice(0, 10).reverse(),
              type: "bar",
              orientation: "h",
            }
          ];

          let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
          };
      
          Plotly.newPlot("bar", barData, barLayout);

         
          let bubbleData = [
            {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                size: sample_values,
                color: otu_ids,
                // colorscale: "Earth"
              }
            }
          ];
      
          let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30}
          };
      
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      
    })

}

