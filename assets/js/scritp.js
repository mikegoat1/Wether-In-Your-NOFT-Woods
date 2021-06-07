
let storedCity =[];

let randomCity = document.getElementById("cityRandom")
let today = moment().format('l');
let todayTemp = document.querySelector(".temp");
let todayWind = document.querySelector(".wind");
let todayHumid = document.querySelector(".humidity");
let todyUV = document.querySelector(".uv");
$("ul").attr("style", "font-size: 10px")

let dayOne = document.getElementById("day1").children[0];
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

//setting up local storage items
function getStored (){
   let whatYouGot = localStorage.getItem("key"); 
   whatYouGot = JSON.parse(whatYouGot);
   storedCity.push(whatYouGot)
    console.log(whatYouGot);
    for (const citys of whatYouGot){
        let inputEl = document.createElement("button");
    inputEl.setAttribute("class", "btn btn-secondary w-100 mt-2");
    inputEl.setAttribute("value", citys);
    inputEl.setAttribute("id", "btn")
    inputEl.innerText = citys;
    document.getElementById("history").appendChild(inputEl);

    }
    
}



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
    //history
    let inputEl = document.createElement("button");
    inputEl.setAttribute("class", "btn btn-secondary w-100 mt-2");
    inputEl.setAttribute("value", city);
    inputEl.setAttribute("id", "btn")
    inputEl.innerText = city;
    document.getElementById("history").appendChild(inputEl);
    //Local Storage "set"
    storedCity.push(city);
    localStorage.setItem("key",JSON.stringify(storedCity) );
    //clear input
    let cityClear = document.getElementById("city");
    cityClear.value = " ";

    if (city.indexOf(" ") > 0) {
        let theCity = city.replace(/\s/g, '%20')
        console.log(theCity)
        searchLocation(theCity);
    } else {
        searchLocation(city);
    }


})
//Clicking history city tab
$("#history").on("click", function (event) {
    event.stopPropagation();
    if (event.target.matches("button")){
        searchLocation(event.target.value);
        randomCity.textContent = event.target.value + " " + today;
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
        
        let long = searchLocation.data[0].longitude;
        let lat = searchLocation.data[0].latitude;
        weather(lat, long)
    });
}


//The weather API
function weather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=acd13b0a528e45739840dc8d676da4d3`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let tempString = data.current.temp.toString();
            todayTemp.textContent = "Temp: " + tempString + " Fahrenheit";

            let windString = data.current.wind_speed.toString();
            todayWind.textContent = "Wind: " + windString + " MPH";

            let humidString = data.current.humidity.toString();
            todayHumid.textContent = "Humidity: " + humidString + " %";

            let uvInteger = data.current.uvi
            if (uvInteger <= 2) {
                todyUV.setAttribute("style", "background-color: green; border-radius: 5px;")
            } else if (2 < uvInteger < 6) {
                todyUV.setAttribute("style", "background-color: yellow; border-radius: 5px")
            } else if (5 < uvInteger < 8) {
                todyUV.setAttribute("style", "background-color: orange; border-radius: 5px;")
            } else {
                todyUV.setAttribute("style", "background-color: red; border-radius: 5px;")
            }
            let uvString = data.current.uvi.toString();
            todyUV.textContent = " " + uvString;

            let mainIcon = document.getElementById("mainIcon");
            let mainIconHolder = data.current.weather[0].icon;
            mainIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + mainIconHolder + "@2x.png")

            // day1
            //Adding Temp
            let tempDay1 = data.daily[0].temp.day.toString()
            console.log(day1Temp)
            day1Temp.innerText = "Temp: " + tempDay1 + " Fahrenheit";
            //Wind
            let windDay1 = data.daily[0].wind_speed.toString()
            day1Wind.textContent = "Wind: " + windDay1 + " MPH";
            //Humid 
            let humidDay1 = data.daily[0].humidity.toString();
            day1Humid.textContent = "Humidity: " + humidDay1 + " %";
            //Icon
            let icon1 = document.getElementById("img1");
            let icon1Holder = data.daily[0].weather[0].icon;
            icon1.setAttribute("src", "http://openweathermap.org/img/wn/" + icon1Holder + ".png")

            // day2
            //Temp
            let tempDay2 = data.daily[1].temp.day.toString()
            console.log(day2Temp)
            day2Temp.innerText = "Temp: " + tempDay2 + " Fahrenheit";
            //Wind
            let windDay2 = data.daily[1].wind_speed.toString()
            day2Wind.textContent = "Wind: " + windDay2 + " MPH";
            //Humid
            let humidDay2 = data.daily[1].humidity.toString();
            day2Humid.textContent = "Humidity: " + humidDay2 + " %";
            //Icon
            let icon2 = document.getElementById("img2");
            let icon2Holder = data.daily[0].weather[0].icon;
            icon2.setAttribute("src", "http://openweathermap.org/img/wn/" + icon2Holder + ".png")

            // day3
            //Temp
            let tempDay3 = data.daily[2].temp.day.toString()
            console.log(day3Temp)
            day3Temp.textContent = "Temp: " + tempDay3 + " Fahrenheit";
            //Wind
            let windDay3 = data.daily[2].wind_speed.toString()
            day3Wind.textContent = "Wind: " + windDay3 + " MPH";
            //Humid
            let humidDay3 = data.daily[2].humidity.toString();
            day3Humid.textContent = "Humidity: " + humidDay3 + " %";
            //Icon
            let icon3 = document.getElementById("img3");
            let icon3Holder = data.daily[0].weather[0].icon;
            icon3.setAttribute("src", "http://openweathermap.org/img/wn/" + icon3Holder + ".png")

            // day 4
            let tempDay4 = data.daily[3].temp.day.toString()
            console.log(day4Temp)
            day4Temp.innerText = "Temp: " + tempDay4 + " Fahrenheit";

            let windDay4 = data.daily[3].wind_speed.toString()
            day4Wind.textContent = "Wind: " + windDay4 + " MPH";

            let humidDay4 = data.daily[3].humidity.toString();
            day4Humid.textContent = "Humidity: " + humidDay4 + " %";
            let icon4 = document.getElementById("img4");
            let icon4Holder = data.daily[0].weather[0].icon;
            icon4.setAttribute("src", "http://openweathermap.org/img/wn/" + icon4Holder + ".png")

            // day 5
            let tempDay5 = data.daily[4].temp.day.toString()
            console.log(day5Temp)
            day5Temp.innerText = "Temp: " + tempDay5 + " Fahrenheit";

            let windDay5 = data.daily[4].wind_speed.toString()
            day5Wind.textContent = "Wind: " + windDay5 + " MPH";

            let humidDay5 = data.daily[4].humidity.toString();
            day5Humid.textContent = "Humidity: " + humidDay5 + " %";
            let icon5 = document.getElementById("img5");
            let icon5Holder = data.daily[0].weather[0].icon;
            icon5.setAttribute("src", "http://openweathermap.org/img/wn/" + icon5Holder + ".png")

        })
}

getStored();