
let randomCity = document.getElementById("cityRandom")
let today = moment().format('l');
let todayTemp = document.querySelector(".temp");
let todayWind = document.querySelector(".wind");
let todayHumid = document.querySelector(".humidity");
let todyUV = document.querySelector(".uv");

let dayOne = document.getElementById("day1");
let day1 = moment().add(1, 'days').calendar("l");
let day1Temp = document.querySelector(".temp1");
let day1Wind = document.querySelector(".wind1");
let day1Humid = document.querySelector(".humid1");

let dayTwo = document.getElementById("day2");
let day2 = moment().add(2, 'days').calendar("l");
let day2Temp = document.querySelector(".temp2");
let day2Wind = document.querySelector(".wind2");
let day2Humid = document.querySelector(".humid2");

$(".btn").on("click", function (event) {
    event.preventDefault();
    city = $("#city").val()
    // adding city and date 
    randomCity.textContent = city + " " + today;
    dayOne.textContent = day1;
    dayTwo.textContent = day2;
    //make the text content to nothing after button is pressed
    // check to see if there is a space in word
    if (city.indexOf(" ") > 0) {
        let theCity = city.replace(/\s/g, '%20')
        console.log(theCity)
        searchLocation(theCity);
    } else {
        searchLocation(city);
    }


})





//Location Search
function searchLocation(cityName) {
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=US&namePrefix=" + cityName,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a905819813mshb487c4aa03c8e57p1f0687jsnfe693ad390a5",
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (searchLocation) {
        console.log(searchLocation.data[0].latitude);
        console.log(searchLocation.data[0].longitude);
        let long = searchLocation.data[0].longitude;
        let lat = searchLocation.data[0].latitude;
        weather(lat,long)
    });
}






//API Current Location
settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ip-geo-location.p.rapidapi.com/ip/check?format=json",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "a905819813mshb487c4aa03c8e57p1f0687jsnfe693ad390a5",
        "x-rapidapi-host": "ip-geo-location.p.rapidapi.com"
    }
};

$.ajax(settings).done(function (yourLocation) {
    console.log(yourLocation.location.latitude);
    console.log(yourLocation.location.longitude);
    let lat = yourLocation.location.latitude;
    let long = yourLocation.location.longitude;

    
});

//The weather API
function weather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=acd13b0a528e45739840dc8d676da4d3`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let tempString =data.current.temp.toString();
            console.log(tempString) 
            todayTemp.textContent = "Temp: " + tempString + " Fahrenheit";

            let windString = data.current.wind_speed.toString();
            todayWind.textContent = "Wind: " +windString + " MPH";

            let humidString = data.current.humidity.toString();
            todayHumid.textContent = "Humidity: " +humidString + " %";

            let uvString = data.current.uvi.toString();
            todyUV.textContent = "UV Index: " + uvString;

            // day1
            let tempDay1 = data.hourly[0].temp.toString()
            console.log(day1Temp)
            day1Temp.innerText = "Temp: " + tempDay1 + " Fahrenheit";

            let windDay1 = data.hourly[0].wind_speed.toString()
            day1Wind.textContent = "Wind: " +windDay1 + " MPH";

            let humidDay1 = data.hourly[0].humidity.toString();
            day1Humid.textContent = "Humidity: " +humidDay1 + " %";


        })
}