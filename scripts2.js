$(document).ready(function(){
    var apiKey = '59251b4d3fedbefd44d459c09e8b4213';
    var canvas = document.getElementById('thermometer');
    var context = canvas.getContext('2d');
    var currentTemp;
    var currentIcon;
    var img;

    $('.weather-form').submit(function(){
        // Keep form from submitting
        event.preventDefault();
        // Get User Input
        var cityText = $('.city').val();
        // Build URL from user input and API Key
        var url = "http://api.openweathermap.org/data/2.5/forecast/city?q=" +cityText+",us&units=imperial&APPID=" + apiKey;

        // Get JSON from the constructed URL
        $.getJSON(url, function(weatherData){
            console.log(weatherData);
            // Set up a variable for the selected city
            currentTemp = weatherData.list[0].main.temp;
            currentIcon = weatherData.list[0].weather[0].icon;
            // animate(0);
            animate(0);

        });
    });

    function animate(current){
        context.clearRect(147,349,6,(endaxisY-axisY));
        var axisY = 349;
        var endaxisY = 349-(current * 2.05);
        context.lineWidth = 7;
        // Prepare Drawing
        context.beginPath();
        context.moveTo(148,349);
        context.lineTo(148,endaxisY);
        context.strokeStyle = 'rgb(200,0,0)';
        context.stroke();
        context.font = '30px Arial green';
        context.fillText(currentTemp, 200, 100);
        current++;
        if(current < currentTemp){
            requestAnimationFrame(function(){
                animate(current);
            });
        }
    }
    // function iconPopulate(icon){
    //     var image = new Image();
    //     image.src = icon+".png";
    //     console.log(image);
    //     context.drawImage(image,100,100);
    // }
});

function imgLoaded(){
    var canvas = document.getElementById('thermometer');
    var context = canvas.getContext('2d');
    context.drawImage(img, 100, 50);
}

function drawGauge(){
    var canvas = document.getElementById('thermometer');
    var context = canvas.getContext('2d');
    img = new Image();
    img.onload = imgLoaded;
    img.src = 'thermometer2.png';

}
