# Data Visualizations - Project 3

By: Christian Fincher, Jamey Yadon, Steve Yuan, and Sarah Dutton

Steve Part

## Instructions for Use

The demo includes five views:

1. Accident Severity Distribution Map (Scatter Map)

Combining a scatter plot and a map, it shows the distribution of accidents in Austin. Accidents are categorized into four levels based on severity, represented by gray, light blue, yellow, and red. Hovering over points reveals detailed information including latitude and longitude, postal code, street name, county, city district severity level, accident duration, and impact distance on traffic.

2. Annual Accident Time Trend in Austin (Line Chart)

This line chart displays the time trend of accidents occurring. A slider at the bottom allows users to view specific time periods; clicking on the legend provides insights into distribution trends for each county.

3. Monthly Distribution of Accidents per Year (Distribution Chart)

This view presents the number of accidents per month for each year. There are two ways to observe this data: click "Show All" to see data for the entire period; or select "Choose Year" to compare relevant years using the legend on the right side.

4. Average Number of Accidents by Hour (Distribution Chart)

This chart shows average accident numbers calculated by hour. Users can observe this data in two ways: click "Show All" to see data for the entire period; or click "Details" to understand differences between weekdays and weekends.

5. Traffic Accident Numbers by Postal Code Area Over Time (Bubble Chart)

Using a bubble chart to display monthly aggregated traffic accident data for various areas; clicking the play button below animates dynamic development trends over time.



## About Data Processing and Visualization

During the project, we utilized a PostgreSQL database to house our data, ensuring efficient data management and querying capabilities. Initial data exploration compared different geographic levels such as Texas, Austin, and Waco to determine the most relevant subset for our analysis, ultimately focusing on Austin.

We conducted data cleaning using Pandas, which included handling missing values, correcting data types, and filtering out anomalies. The cleaned dataset was then saved as CSV files for further use.

For visualization, we employed Plotly to create dynamic, interactive views from both temporal and spatial dimensions, generating JSON documents for seamless integration into HTML and CSS files to produce a comprehensive and interactive final display.


