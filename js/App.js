
$(document).ready(function() {
    fetchInfo();
    $("#searchBtn").on("click", function () {
        event.preventDefault();
        console.log("click");

        userInput = $("#search").val();
        $("#search").val("");
        fetchInfo();
    })
});

let defultCity = "Tucson";
let name;
let temp;
let weatherMain;
let weather;
let humidity;
let wind;
let userInput;

function fetchInfo() {
    let URL;
    if (userInput !== undefined){
        URL = "http://api.openweathermap.org/data/2.5/weather?q="+userInput+"&APPID=7cc146857e5061a3b42082e083d63e8f";
    }else {
        URL = "http://api.openweathermap.org/data/2.5/weather?q="+defultCity+"&APPID=7cc146857e5061a3b42082e083d63e8f";
    }
    console.log(userInput);
    $.ajax({
        url: URL,
        Method: "GET"
    }).then(function (response) {
       getRes(response);
    });

    function getRes(response) {
        console.log(response);
        name = response.name;
        temp = Math.floor(parseFloat(response.main.temp) - 273.15);
        weatherMain = response.weather[0].main;
        weather = response.weather[0].description;
        humidity = response.main.humidity;
        wind = response.wind.speed;
        UpdateUI()
    }
}

function UpdateUI(){
    function getIcon(weather){
        switch (weather.toUpperCase()) {
            case "CLEAR":
                return "<i class=\"fas fa-sun fa-lg\"></i>";
            case "RAIN":
                return "<i class=\"fas fa-cloud-rain fa-lg\"></i>";
            case "STORM":
                return "<i class=\"fas fa-cloud-showers-heavy fa-lg\"></i>";
            case "CLOUDS":
                return "<i class=\"fas fa-cloud fa-lg\"></i>";

        }
    }
    function getBg(weather){
        switch (weather.toUpperCase()) {
            case "CLEAR":
                return "url(\"img/clear_sky.jpg\")";
            case "RAIN":
                return "url(\"img/little_rain.jpg\")";
            case "STORM":
                return "url(\"/img/heavy_rain.jpg\")";
            case "CLOUDS":
                return "url(\"img/heavy_cloud.jpg\")";
        }
    }

    console.log(name, temp, weather, weatherMain, humidity, wind);
    let weatherIcon = getIcon(weatherMain);
    let bgImg = getBg(weatherMain);
    console.log(bgImg);

    $("#view").css("background-image", bgImg);
    $("#main-card-info .card-title").text(name);
    $("#main-card-info .card-text").text(weather+" ");
    $('#main-card-info i').last().remove();
    $("#main-card-info .card-upper").append(weatherIcon);
    $("#main-card-info .temp").text(temp );
    $("#main-card-info .wind").text("Winds at "+wind+" m/s");
    $("#main-card-info .humidity").text("Humidity levels at "+humidity+"%");


}