// Function to fetch JSON data and render the plot
function renderPlot(jsonFileName, plotContainerId,width=1440, height=900) {
    fetch(jsonFileName)
        .then(response => response.json())
        .then(data => {
            // Modify the layout to adjust size to 4:3 aspect ratio
            data.layout.width = width;
            data.layout.height = height;
            Plotly.newPlot(plotContainerId, data.data, data.layout); // Use Plotly.newPlot to create the plot
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

// Render each plot
renderPlot('./JSON/fig1.json', 'plot1',1440, 900);
renderPlot('./JSON/fig2.json', 'plot2',1440, 900);
renderPlot('./JSON/fig3.json', 'plot3',1440, 900);
renderPlot('./JSON/fig4.json', 'plot4',1440, 900);
// renderPlot('./JSON/fig5.json', 'plot5',1440, 900);
renderPlot('./JSON/fig6.json', 'plot6',1440, 900);