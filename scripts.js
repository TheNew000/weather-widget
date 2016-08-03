$(document).ready(function(){
    var apiKey = '59251b4d3fedbefd44d459c09e8b4213';
    var canvas = document.getElementById('current-temp');
    var context = canvas.getContext('2d');
    var currentTemp;
    var currentIcon;

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
            animate(0);
            iconPopulate(currentIcon);
        });
    });

    function animate(current){
        context.clearRect(0,0,300,300);
        var tempColor = "#ff0000";
        context.strokeStyle = tempColor;
        context.lineWidth = 10;
        // Clear Canvas
        // Prepare Drawing
        context.beginPath();
        context.arc(155, 155, 60, Math.PI * 1.5, (current/100) * (Math.PI * 2) + (Math.PI*1.5));
        context.fillStyle = '#666';
        context.fill();

        context.beginPath();
        context.arc(155, 155, 70, Math.PI * 1.5, (current/100) * (Math.PI * 2) + (Math.PI*1.5));
        // Draw the circle
        context.stroke();

        context.fillStyle = 'red';
        context.font = '30px Arial';
        context.fillText(currentTemp, 120, 170);
        current++;
        if(current < currentTemp){
            requestAnimationFrame(function(){
                animate(current);
                iconPopulate(currentIcon);
            });
        }
    }
    // function iconPopulate(icon){
    //     var image = new Image();
    //     image.src = icon+".png";
    //     $('.icon').html(image);
    // }

    function iconPopulate(icon){
        var image = new Image();
        image.src = icon+".png";
        console.log(image);
        context.drawImage(image,150,100);
    }
});

