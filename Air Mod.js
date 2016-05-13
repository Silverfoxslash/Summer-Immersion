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
    var DistanceField = document.getElementById('DistanceField');
    var StabilityClass = document.getElementById('StabilityClass').value;
    var result = document.getElementById('result');

    if (HeightField.length < 0) {
        result.textContent = 'Please enter a positive number for height.';
        //alert('height is above 0 ');

    }
    // use an eventlistener for the event
    var subButton = document.getElementById('subButton');
    subButton.addEventListener('click', getUserName, false);
}