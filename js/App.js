
$(document).ready(function() {

    $.getJSON("./public/share.json", function (data) {
        console.log(data.weather);
        share = data.weather;
    });

    fetchInfo();
    $("#searchBtn").on("click", function () {
        event.preventDefault();
        console.log("click");

        userInput = $("#search").val();
        $("#search").val("");
        fetchInfo();
    })
});

let share;
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
        let clear = share.sunny;
        let rain = share.rain.little_rain;
        let storm = share.rain.storm;
        let clouds = share.cloudy;
        let index;

        switch (weather.toUpperCase()) {
            case "CLEAR":
                index = Math.floor(Math.random() * clear.length);
                return "url("+clear[index]+")";
            case "RAIN":
                index = Math.floor(Math.random() * rain.length);
                return "url("+rain[index]+")";
            case "STORM":
                index = Math.floor(Math.random() * storm.length);
                return "url("+storm[index]+")";
            case "CLOUDS":
                index = Math.floor(Math.random() * clouds.length);
                return "url("+clouds[index]+")";
        }

    }

    console.log(name, temp, weather, weatherMain, humidity, wind);
    let weatherIcon = getIcon(weatherMain);

    let bgImg = getBg(weatherMain);

    $("#view").css("background-image", bgImg);
    $("#nav-brand-info").text(name+" : "+weather+" ");
    $("#nav-brand-info").append(weatherIcon);
    $("#main-card-info .card-title").text(name);
    $("#main-card-info .card-text").text(weather+" ");
    $('#main-card-info i').last().remove();
    $("#main-card-info .card-upper").append(weatherIcon);
    $("#main-card-info .temp").text(temp );
    $("#main-card-info .wind").text("Winds at "+wind+" m/s");
    $("#main-card-info .humidity").text("Humidity levels at "+humidity+"%");
    $("#hello").text("hello "+name+"!");
}