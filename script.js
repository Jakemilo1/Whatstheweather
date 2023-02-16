var apiKey = "9197a7374fc2a713e95a7db07c9a0a81";
    
    // Current weather function
    function getWeather (city) {

        // Build the URL needed to query the database of the OpenWeatherMap API
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    
        // Run AJAX GET call to request the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
         // Store all of the retrieved data inside of a response object 
            success: function(response){
                // Log the queryURL and resulting object
                console.log(queryURL);
                console.log(response);
    
                    // Retrieve dates
                    function date_format(dt_string){
                        var date = new Date(dt_string.dt*1000);
                        return date.toDateString();
                    }
    
                    // Convert the temperature to fahrenheit
                    function temp_trans(input){
                        var temp =  "Temperature: " + ((input.main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F ";
                        return temp;
                    }
            
               // Empties the divs to get rid of previous searches
               $("#previousSearches").empty();
    
                var holder= response.list[0];
                   // ******************************************* CURRENT WEATHER ******************************************* //              
    
                         // Transfer Current Weather content to HTML and retrieve and display icon from weather API
                            $(".currentCity").html("<h3>" + response.city.name + " " + date_format(holder) + "</h3>").append(
                                $('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png" +' "/>')); 
                            $(".humidity").text("Humidity: " + holder.main.humidity + " %");
                            $(".windSpeed").text("Wind Speed: " + holder.wind.speed + " mph");
                            $(".temperature").text(temp_trans(holder));
                            // Create coordinate variables for UV Index to retrieve data from the UVindexAPI
                            getUVindex(response.city.coord.lat, response.city.coord.lon);
    
    // ******************************************* GET 5 DAY FORECAST ******************************************* //              
    
                // Retrieves and displays 5 Day Weather Forecast and associated icon
                        
                        for(i=1; i<=5; i++){
                        holder= response.list[(i*8)-1];
                      
                        $("#"+ i + "dayForecast").text(date_format(holder));
                        $("#"+ i + "dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+holder.weather[0].icon+".png" +' "/>'));
                        $("#"+ i + "dayHumidity").text("Humidity: " + holder.main.humidity + " %");
                        $("#"+ i + "dayTemperature").text(temp_trans(holder));
    
                        }
                  }
            });           
    } 
    
    // ******************************************* GET UVI INDEX API CALL ******************************************* //              
    
    // Using lat and long with get uvIndex and display on Currentweather DOM
    function getUVindex(lat,long) {  
                 
        //Build the URL we need to get the UVI information
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
    
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(responseUVI) {
                console.log(responseUVI.current.uvi)
                var uvIndex = responseUVI.current.uvi;
                //Print UVIndex
                $("#uvIndex").text("UV Index: " + uvIndex);
                
                if (uvIndex <= 2.99) {                  
                    uvIndex = $("#uvIndex").css({"background-color": "olivedrab", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
                } else if (uvIndex >= 3 & uvIndex <= 5.99) {
                    uvIndex = $("#uvIndex").css({"background-color": "gold", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
                } else if (uvIndex >= 6 & uvIndex <= 7.99) {
                    uvIndex = $("#uvIndex").css({"background-color": "darkorange", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
                } else if (uvIndex >= 8) {
                    uvIndex = $("#uvIndex").css({"background-color": "firebrick", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
                };
    
            });
        } 
    getWeather("Los Angeles"); 
