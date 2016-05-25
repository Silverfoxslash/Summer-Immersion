/**
 * Created by Jeremy on 5/12/2016.
 * Marcus Spears Contributed with map integration 5/25/2016.
 */
//Formula for polution concentration at a point is C=(Q/2pi(sigy)sigz))(e^(-.5(y/sigy)))(e^(-.5((H-z)/(sigz)))+e^(-.5((H+z)/(sigz)))
//How z is height we are measureing, which is ground lvl so we can take out z
// the function which handles the input field logic
// use an eventlistener for the event


window.onload=function () {

    
    document.getElementById("subButton").addEventListener("click", getVaribles);


    function getVaribles() {

        var HeightField = document.getElementById('HeightField').value;
        var Pollutant = document.getElementById('PollutantRelease').value;
        var Distance = Number(document.getElementById('DistanceField').value);
        var WindSpeed = document.getElementById('WindSpeedField').value;
        var CenterLineDistance = Number(document.getElementById('DistanceFromCenterlineField').value);
        var StabilityClass = document.getElementById('StabilityClass').value;
        var result = document.getElementById('result').value;

        if (HeightField < 0) {
            alert("Please enter a positive number for height.");

        }
        else if (Pollutant <= 0) {
            alert("Please enter a number greater than zero for pollution.")
        }
        else if (Distance < 0) {
            alert("Please enter a positive number for distance from stack.");

        }
        else if (WindSpeed <= 0) {
            alert("Please enter a positive number for wind speed.");

        }
		else if(Location="  "){
			alert("Please enter the location of the pollutant source.");
			
		}
        else {
            calculate(HeightField, Pollutant, Distance, WindSpeed, CenterLineDistance, StabilityClass);
            DrawLinearGraph(HeightField, Pollutant, Distance, WindSpeed, CenterLineDistance, StabilityClass);
			FindAddress(Distance);
        }

    }


    function calculate(height, pollutant, distance, windspeed, centerline, sc) {
        var k1, k2, k3, k4;
        switch (sc) {
            case 'A':
                k1 = 0.250;
                k2 = 927;
                k3 = 0.189;
                k4 = 0.1020;
                k5 = -1.918;
                break;
            case 'B':
                k1 = 0.2020;
                k2 = 370;
                k3 = 0.162;
                k4 = 0.0962;
                k5 = -0.101;
                break;
            case 'C':
                k1 = 0.134;
                k2 = 283;
                k3 = 0.134;
                k4 = 0.0722;
                k5 = 0.102;
                break;
            case 'D':
                k1 = 0.0787;
                k2 = 707;
                k3 = 0.135;
                k4 = 0.0475;
                k5 = 0.465;
                break;
            case 'E':
                k1 = 0.0566;
                k2 = 1070;
                k3 = 0.137;
                k4 = 0.0335;
                k5 = 0.624;
                break;
            case 'F':
                k1 = 0.0370;
                k2 = 1170;
                k3 = 0.134;
                k4 = 0.0220;
                k5 = 0.700;
                break;
        }

        var sigy = (k1 * distance) / (Math.pow([1 + (distance / k2)], k3));
        var sigz = (k4 * distance) / (Math.pow([1 + (distance / k2)], k5));
        var concentation = ( pollutant / (2 * Math.PI * sigy * sigz * windspeed)) * [Math.pow(Math.E, (-(centerline * centerline) / (2 * sigy * sigy)))] * 2 * [(Math.pow(Math.E, ((-height * height) / (2 * sigz * sigz))))] * 1000000;

        document.getElementById("result").innerHTML = concentation.toExponential(4) + ' micrograms per cubic meter.';


        return concentation;
    }

    function Draw3DGraph(height, pollatant, distance, windspeed, centerline, sc) {
        var GraphSpace = document.getElementById('GraphSpace');
        var x = [];
        var x1 = [];

        var y = [];
        var y1 = [];
        var z = [];
        var counter = 0;

        for (a = 1; a < distance + 1 + 10; a += distance / 175)
        {

            for (b = 0; b < distance + 1 + 10; b += distance / 175)
            {
                x[counter] = a;
                y[counter] = b;
                counter++;
            }

        }

        counter=0;
        for (a =1 ; a >1; a += distance / 175)
        {
            for (b = 0; b < distance + 1 + 10; b += distance / 175)
            {
                x1[counter] = a;
                y1[counter] = -1*b;
                counter++;
            }

        }


        for (a = 0; a < x.length; a++)
        {
            z[a]=calculate(height, pollatant, x[a], windspeed, y[a], sc);

        }
        var trace =
        {
            x, y, z,
            mode: 'lines',
            marker: {
                color: '#1f77b4',
                size: 12,
                symbol: 'circle',
                line: {
                    color: 'black',
                    width: 3,
                }
            },
            line: {
                color: '#1f77b4',
                width: '.40'
            },
            type: 'scatter3d'
        };

        var data=[trace];
        var layout =
        {
            title: 'Pollution concentration',
            xaxis: {
                title: 'Distance from stack',
                titlefont: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
            yaxis: {
                title: 'Centerline Distance',
                titlefont: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                },
                zaxis: {
                    title: 'Concentration',
                    titlefont: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
                autosize: true,
                width: 800,
                height: 800,
            }
        };

        Plotly.newPlot('GraphSpace', data, layout);

        
    }

    function DrawSurfaceGraph(height, pollatant, distance, windspeed, centerline, sc) {

        var z = [];
        var x = [];

        for (a = 0; a < distance + 1; a++) {
            for (b = 0; b < distance + 1; b++) {

                x.push(calculate(height, pollatant, a, windspeed, b, sc));
            }
            z.push(x);
            x = [];
        }
        var trace =
        {
            z,
            type: 'surface',
        };

        var layout =
        {
            title: 'Pollution Concentration',
            xaxis: {
                title: 'Distance'
            },
            yaxis: {
                title: 'Concentration in micrograms'
            },
            autosize: true,
            width: 500,
            height: 500,
            font: {size: 20},
            margin: {
                l: 100,
                r: 50,
                b: 65,
                t: 90,
            }
        };

        Plotly.newPlot("GraphSpace", [trace], layout);
    }

    function DrawLinearGraph(height, pollatant, distance, windspeed, centerline, sc) {

        GraphSpace = document.getElementById('GraphSpace');
        var x = [];
        var y = [];

        for (a = 0; a < distance + 1; a++) {
            x[a] = a;
            y[a] = (calculate(height, pollatant, a, windspeed, centerline, sc));
        }


        var trace =
        {
            x,
            y,
            type: 'scatter',
            mode: 'lines',
        };

        var layout =
        {
            title: 'Pollution Concentration',
            xaxis: {
                title: 'Distance'
            },
            yaxis: {
                title: 'Concentration in micrograms'
            },
            autosize: false,
            width: 1500,
            height: 500,
            font: {size: 20},
            margin: {
                l: 100,
                r: 50,
                b: 65,
                t: 90,
            }
        };

        Plotly.newPlot(GraphSpace, [trace], layout);

    }
	
	var geocoder;
	var map;
	function drawMap()
	{
		geocoder = new google.maps.Geocoder();
		var latlng = new google.mapa.LatLng(36.1627, 86.7816);
		var mapOptions =
		{
			zoom:6,
			center: latlng
		}
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}
	function FindAddress(distance)
	{
		var address = document.getElementById("InputLocation").value;
		geocoder.geocode( {'address' : address}, function(results, status)
		{
			if (status == google.maps.GeocoderStatus.OK)
			{
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker(
				{
					map:map,
					position: results[0].geometry.location
				});
			}
			else 
			{
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
		var distanceCircle = new google.maps.Circle(
		{
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.15,
			map: map,
			center: marker[position].center,
			radius:  distance,
		});
	}
	
}	
