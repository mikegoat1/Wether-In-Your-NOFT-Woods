
let randomCity = document.getElementById("cityRandom")
let today = moment().format('l');
let todayTemp = document.querySelector(".temp");
let todayWind = document.querySelector(".wind");
let todayHumid = document.querySelector(".humidity");
let todyUV = document.querySelector(".uv");
$("ul").attr("style", "font-size: 10px")

let dayOne = document.getElementById("day1").children[0];
console.log(dayOne);
let day1 = moment().add(1, 'days').calendar("l");
let day1Temp = document.querySelector(".temp1");
let day1Wind = document.querySelector(".wind1");
let day1Humid = document.querySelector(".humid1");

let dayTwo = document.getElementById("day2").children[0];
let day2 = moment().add(2, 'days').calendar("l");
let day2Temp = document.querySelector(".temp2");
let day2Wind = document.querySelector(".wind2");
let day2Humid = document.querySelector(".humid2");

let dayThree = document.getElementById("day3").children[0];
let day3 = moment().add(3, 'days').calendar("l");
let day3Temp = document.querySelector(".temp3");
let day3Wind = document.querySelector(".wind3");
let day3Humid = document.querySelector(".humid3");

let dayFour = document.getElementById("day4").children[0];
let day4 = moment().add(4, 'days').calendar("l");
let day4Temp = document.querySelector(".temp4");
let day4Wind = document.querySelector(".wind4");
let day4Humid = document.querySelector(".humid4");

let dayFive = document.getElementById("day5").children[0];
let day5 = moment().add(5, 'days').calendar("l");
let day5Temp = document.querySelector(".temp5");
let day5Wind = document.querySelector(".wind5");
let day5Humid = document.querySelector(".humid5");

$(".btn").on("click", function (event) {
    event.preventDefault();
    city = $("#city").val()
    // adding city and date 
    randomCity.textContent = city + " " + today;
    dayOne.textContent = day1;
    dayTwo.textContent = day2;
    dayThree.textContent = day3;
    dayFour.textContent = day4;
    dayFive.textContent = day5;


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
            // day2
            let tempDay2 = data.hourly[1].temp.toString()
            console.log(day2Temp)
            day2Temp.innerText = "Temp: " + tempDay2 + " Fahrenheit";

            let windDay2 = data.hourly[1].wind_speed.toString()
            day2Wind.textContent = "Wind: " +windDay2 + " MPH";

            let humidDay2 = data.hourly[1].humidity.toString();
            day2Humid.textContent = "Humidity: " +humidDay2 + " %";
            // day3
            let tempDay3 = data.hourly[2].temp.toString()
            console.log(day3Temp)
            day3Temp.innerText = "Temp: " + tempDay3 + " Fahrenheit";

            let windDay3 = data.hourly[2].wind_speed.toString()
            day3Wind.textContent = "Wind: " +windDay3 + " MPH";

            let humidDay3 = data.hourly[2].humidity.toString();
            day3Humid.textContent = "Humidity: " +humidDay3 + " %";
            // day 4
            let tempDay4 = data.hourly[3].temp.toString()
            console.log(day4Temp)
            day4Temp.innerText = "Temp: " + tempDay4 + " Fahrenheit";

            let windDay4 = data.hourly[3].wind_speed.toString()
            day4Wind.textContent = "Wind: " +windDay4 + " MPH";

            let humidDay4 = data.hourly[3].humidity.toString();
            day4Humid.textContent = "Humidity: " +humidDay4 + " %";
            // day 5
            let tempDay5 = data.hourly[4].temp.toString()
            console.log(day5Temp)
            day5Temp.innerText = "Temp: " + tempDay5 + " Fahrenheit";

            let windDay5 = data.hourly[4].wind_speed.toString()
            day5Wind.textContent = "Wind: " +windDay5 + " MPH";

            let humidDay5 = data.hourly[4].humidity.toString();
            day5Humid.textContent = "Humidity: " +humidDay5 + " %";
        })
}