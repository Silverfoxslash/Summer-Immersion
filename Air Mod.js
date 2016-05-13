/**
 * Created by Jeremy on 5/12/2016.
 */
//Formula for polution concentration at a point is C=(Q/2pi(sigy)sigz))(e^(-.5(y/sigy)))(e^(-.5((H-z)/(sigz)))+e^(-.5((H+z)/(sigz)))
// the function which handles the input field logic
function getVaribles()
{   
    var HeightField = document.getElementById('HeightField').value;
    var Pollutant = document.getElementById('PollutantRelease');
    var Distance = document.getElementById('DistanceField');
    var WindSpeed = document.getElementById('WindSpeedField');
    var CenterLineDistance = document.getElementById('DistanceFromCenterlineField');
    var StabilityClass = document.getElementById('StabilityClass').value;
    var result = document.getElementById('result');

    if (HeightField.length < 0)
    {
        result.textContent = 'Please enter a positive number for height.';
        return;
    }
    else if(Distance < 0)
    {
        result.textContent = "Please enter a positive number for distance from stack.";
        return;
    };
    else
    {
        calculate(HeightField,Pollutant,Distance,WindSpeed,CenterLineDistance,StabilityClass);
    }

}

// use an eventlistener for the event
var subButton = document.getElementById('subButton');
subButton.addEventListener('click', getVaribles, false);

function calculate(height, pollutant,distance,windspeed,centerline,sc) 
{
    switch (sc)
    {
        case 'A':
            k1=0.250;
            k2=927;
            k3=0.189;
            k4=0.1020;
            k5=-1.918;
            break;
        case 'B':
            k1=0.2020;
            k2=370;
            k3=0.162;
            k4=0.0962;
            k5=-0.101;
            break;
        case 'C':
            k1=0.134;
            k2=283;
            k3=0.134;
            k4=0.0722;
            k5=0.102;
            break;
        case 'D':
            k1=0.0787;
            k2=707;
            k3=0.135;
            k4=0.0475;
            k5=0.465;
            break;
        case 'E'
            k1=0.0566;
            k2=1070;
            k3=0.137;
            k4=0.0335;
            k5=0.624;
            break;
        case 'F':
            k1=0.0370;
            k2=1170;
            k3=0.134;
            k4=0.0220;
            k5=0.700;
            break;
    }
    sigy=(k1*(windspeed))/((1+((windspeed)/k2))^k3);
    sigz=(k4*(windspeed))/((1+((windspeed)/k2))^k5);
    concentation=( pollutant/(2*Math.PI*sigy*sigz))*(Math.pow(Math.E,-centerline/2*sigy))*(Math.pow(Math.E,)      )


}