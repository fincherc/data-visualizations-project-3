# Data Visualizations - Project 3

### By: Christian Fincher, Jamey Yadon, Steve Yuan, and Sarah Dutton

## Table of Contents

- Overview and Purpose of the Project
- Instructions on How To Use and Interact with the Project
- Efforts for Ethical Considerations Made in the Project
- References
- Conclusions
- Future Insights

## Overview and Purpose of the Project:

This dataset contains detailed records of car accidents that occurred within Austin, TX from February 2016 - March 2023. The data has been collected from kaggle and is intended for research, analysis, and modeling of traffic accidents to improve road safety, understand accident patterns, and aid in developing preventative measures. The dataset started as a countrywide car accident dataset that covers 49 states of the USA. The accident data was collected from February 2016 - March 2023, using multiple APIs that provide streaming traffic incident data. These APIs broadcast traffic data captures by various entities including the US and state departments of transportation, law enforcement agencies, traffic sensors within the road networks. The dataset origionated with approximately 7.7 million accident records.

This project is focusing on the Austin-Metro area. We analyzed and visualized trends of highly accident-prone areas, times, and weather conditions.

The dataset was cleaned by Jamey Yadon via PostgreSQL.

## Instructions on How To Use and Interact with the Project:

The file "main_index.html" will lead you to our Main Page. Here you can browse through, click, or go back, just like a typical website.

From the Main Page - if you click on the first option - Leaflet Accident Demo - this will bring you to our heat map where you can interact by clicking different weather conditions to check out the accidents which occured within these weather conditions. 

From the Main Page - if you click on the second option - Timeseries Plots - here you will find five different clickable views of charts based off time trends and geographics. 
    
From the Main Page - if you click on the third option - Heat Circle Marker Map - this will lead you to a map containing all the accidents which occured. It looks very busy from afar, but if you zoom in, you will see that accidents have happened at almost every intersection. 
From the Main Page - if you click on the second option - Timeseries Plots - here you will find five different clickable views of charts based off time trends and geographics. (See Timeseries for more info on views)

From the Main Page - if you click on the third option - Heat Circle Marker Map - this will lead you to a map containing all the accidents which occured. It looks very busy from afar, but if you zoom in, you will see that accidents have happened at almost every intersection.

From the Main Page - if you click on the fourth option - Heat Marker Map - here you will see a similar map but organized nicer with the markers. As you zoom in, you can again see all the accidents which occured and where.

The file "combined_plots.html" is where you will find a website containing all interactive charts and graphs in which you can click between different counties, years, severity levels, week vs weekend, zip codes, etc. There are some awesome charts on here that will allow you the reach any findings you are looking for from this dataset - clear and consice.

## Timeseries

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

## Efforts for Ethical Considerations Made in the Project:

Throughout this project, we wanted to be sure to avoid misleading representations. We made sure to ensure that our visualizations accurately are reflecting the data. It is also really important to remember that any conclusions drawn from the data apply to Austin, TX only. They may or may not be applicable to other cities, and definitely aren't applicable to people who live in rural areas. We wanted to avoid overgeneralization by straying away from certain visualizations such as zipcode, since we are not considering population and considering per capita.

## References:

### Dataset of study:

https://www.kaggle.com/datasets/sobhanmoosavi/us-accidents

### Acknowledgements:

If you use this dataset, please kindly cite the following papers:
• Moosavi, Sobhan, Mohammad Hossein Samavatian, Srinivasan Parthasarathy, and Rajiv Ramnath. “A Countrywide Traffic Accident Dataset.”, 2019.
• Moosavi, Sobhan, Mohammad Hossein Samavatian, Srinivasan Parthasarathy, Radu Teodorescu, and Rajiv Ramnath. "Accident Risk Prediction based on Heterogeneous Sparse Data: New Dataset and Insights." In proceedings of the 27th ACM SIGSPATIAL International Conference on Advances in Geographic Information Systems, ACM, 2019.

Usage Policy and Legal Disclaimer:

This dataset is being distributed solely for research purposes under the Creative Commons Attribution-Noncommercial-ShareAlike license (CC BY-NC-SA 4.0). By downloading the dataset, you agree to use it only for non-commercial, research, or academic applications. If you use this dataset, it is necessary to cite the papers mentioned above.

### Acknowledgements:

- University of Texas Austin Lessons and Challenges for guidance
- Help from Instructor Travis Hopkins and TA Kian Layson
- https://www.kaggle.com/datasets/sobhanmoosavi/us-accidents for the dataset of study itself and description / information on the dataset
- https://ionic.io/ionicons provided icons for javascript mapping

## Conclusions:

This project provided some important insights into the situation with car accidents in Austin, TX area:

- The highways are a highly accident-prone area, and are causing the highest severity of accidents.
- Accidents happen at almost every intersection -- which shows us you have to be careful no matter where you are driving.
- Accidents decreased drastically in the beginning of 2020 (COVID -- people were driving less), but also increased by 2021 and took another large decrease beginning of 2022
- More accdents occur between 7-9 AM (CST) and again between 5-6 PM (CST) most likely due to more people being on the road during those hours because of the typical work schedule
- On weekends, there are more accidents between the hours of 11 AM - 3 PM (CST)
- More accidents occured in September, October, November, and December
- Most of the accidents with severity level of 4, occured along the I-35

## Future Insights:

Some options to grow on this project more could include but are not limited to:

- Bringing in population numbers from each zipcode to compare accidents in area/capita
  (Although, just because someone lives in an area does not mean they are not driving in other areas as well)
- Comparing targeted areas / intersections to see if there are specific areas of Austin that could use some modification for improvement
  (ie. somewhere that needs a speedbump, or a traffic light over a stop sign)
