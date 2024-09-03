// Function to fetch JSON data and render the plot
function renderPlot(jsonFileName, plotContainerId, width = 1280, height = 720) {
    fetch(jsonFileName)
        .then(response => response.json())
        .then(data => {
            // Ensure layout properties are set correctly for map display
            data.layout.width = width;
            data.layout.height = height;
            data.layout.autosize = true;  // Enable autosize for responsive resizing

            // Configuration for animations and responsiveness
            var config = { 
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
                scrollZoom: true
            };

            // Check if the plot contains frames for animation
            if (data.frames) {
                // Initialize plot with frames for animated plots
                Plotly.newPlot(plotContainerId, data.data, data.layout, config).then(function() {
                    Plotly.addFrames(plotContainerId, data.frames); // Add frames after the initial plot creation
                    // Resize plot if container is visible
                    setTimeout(function() {
                        if (document.getElementById(plotContainerId).offsetParent !== null) {
                            Plotly.Plots.resize(document.getElementById(plotContainerId));
                        }
                    }, 100); // Slight delay to ensure proper setup
                });
            } else {
                // Initialize plot without frames for static plots
                Plotly.newPlot(plotContainerId, data.data, data.layout, config).then(function() {
                    // Resize plot if container is visible
                    setTimeout(function() {
                        if (document.getElementById(plotContainerId).offsetParent !== null) {
                            Plotly.Plots.resize(document.getElementById(plotContainerId));
                        }
                    }, 100); // Slight delay to ensure proper setup
                });
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

// Function to show a specific view and hide others
function showView(viewId) {
    // Hide all plots
    document.getElementById('plot1').style.display = 'none';
    document.getElementById('plot2').style.display = 'none';
    document.getElementById('plot3').style.display = 'none';
    document.getElementById('plot4').style.display = 'none';
    document.getElementById('plot5').style.display = 'none';

    // Show the selected plot
    document.getElementById(viewId).style.display = 'block';
    
    // Resize the plot after making it visible
    setTimeout(function() {
        if (document.getElementById(viewId).offsetParent !== null) {
            Plotly.Plots.resize(document.getElementById(viewId));
        }
    }, 300); // Delay to ensure container setup
}

// Initialize by showing the first view (plot1)
document.addEventListener('DOMContentLoaded', function() {
    renderPlot('./JSON/fig1.json', 'plot1'); // Yearly Trends
    renderPlot('./JSON/fig2.json', 'plot2'); // Monthly Distribution
    renderPlot('./JSON/fig3.json', 'plot3'); // hourly Distrubution
    renderPlot('./JSON/fig4.json', 'plot4'); // Animated plot
    renderPlot('./JSON/fig5.json', 'plot5'); // Map plot

    // Show only the first plot initially
    showView('plot5');    //default display
});
