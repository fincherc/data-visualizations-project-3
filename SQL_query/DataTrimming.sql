CREATE TABLE "accidents" (
    "ID" varchar NOT NULL PRIMARY KEY,
    "Source" varchar,
    "Severity" int,
    "Start_Time" varchar,
	"End_Time" varchar,
	"Start_Lat" decimal,
	"Start_Lng" decimal,
	"End_Lat" decimal,
	"End_Lng" decimal,
	"Distance(mi)" decimal,
	"Description" varchar,
	"Street" varchar,
	"City" varchar,
	"County" varchar,
	"State" varchar(2),
	"Zipcode" varchar,
	"Country" varchar,
	"Timezone" varchar,
	"Airport_Code" varchar,
	"Weather_Timestamp" varchar,
	"Temperature(F)" decimal,
	"Wind_Chill(F)" decimal,
	"Humidity(%)" decimal,
	"Pressure(in)" decimal,
	"Visibility(mi)" decimal,
	"Wind_Direction" varchar,
	"Wind_Speed(mph)" decimal,
	"Precipitation(in)" decimal,
	"Weather_Condition" varchar,
	"Amenity" bool,
	"Bump" bool,
	"Crossing" bool,
	"Give_Way" bool,
	"Junction" bool,
	"No_Exit" bool,
	"Railway" bool,
	"Roundabout" bool,
	"Station" bool,
	"Stop" bool,
	"Traffic_Calming" bool,
	"Traffic_Signal" bool,
	"Turning_Loop" bool,
	"Sunrise_Sunset" varchar,
	"Civil_Twilight" varchar,
	"Nautical_Twilight" varchar,
	"Astronomical_Twilight" varchar
);

select * from accidents; --Check that it created the table

select * 
	from accidents
where "City" = 'Waco'; --Check that the data imported correctly

--Now, let's get some more usable datasets:
select * from accidents where "State"='TX';

select * from accidents where "City"='Austin' and "State"='TX';

select * from accidents where "City"='Waco' and "State" = 'TX';