// set up date and clock
var todaysDate = document.querySelector('#currentDate');
var date = moment().format('dddd, MMMM Do YYYY');
todaysDate.innerHTML = date;
var currentTime = document.querySelector('#currentTime');
var hours = moment().format('hh:mm:ss a')
currentTime.innerHTML = hours
// update time function
var updateClock = setInterval(function(){
    var currentHour = moment().format('hh:mm:ss a');
    currentTime.innerHTML = currentHour
}, 1000);
// end date and clock

//Initial set of arrays, to be added to later
var filmArray1 = [];
var filmArray2 = [];
var finalResults = [];

userResponse1 = "Julia Roberts"
userResponse2 = "Dermot Mulroney"

function checkFirstActor() {
    //user responses, set as defined strings currently but will be set to take in values based on what the user types in


    //inital fetch request for the first actor, retrieves Imdb ID data to then be used 
    fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse1 + "/", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        }
    }).then(function (response) {
        return response.json();
    })
        //taking that initial fetch, logging data as a variable and then passing it to the next fetch request
        .then(function (response) {
            var ActorID = response.Actors[0].imdb_id
            console.log(response)


            fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + ActorID + "/all_roles/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }
            }).then(response => {
                return response.json();
            })
                //build an array from the desired data for the first actor, to be checked with the next array
                .then(function (response) {
                    for (var i = 0; i < response.Roles.movies.length; i++) {
                        if (filmArray1.includes(response.Roles.movies[i][0].title) === false) {
                            filmArray1.push(response.Roles.movies[i][0].title)
                            console.log(filmArray1)
                        }
                    } checkSecondActor();
                }).catch(err => {
                    console.error(err);
                });
        })
        .catch(err => {
            console.error(err);
        });
    console.log(filmArray1)
}

function checkSecondActor() {
    //Second series of fetch requests for the second entered actor
    fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse2 + "/", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        }
    })
        .then(function (response) {
            return response.json();
        })

        //same as the previous fetch request where we store the relevant data to then be used
        .then(function (response) {
            var ActorID = response.Actors[0].imdb_id
            console.log(response)


            fetch("https://data-imdb1.p.rapidapi.com/actor/id/" + ActorID + "/all_roles/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }
            })
                .then(response => {
                    return response.json();
                })
                //build an array from the desired data for the second actor, to be checked with the first array
                .then(function (response) {
                    for (var i = 0; i < response.Roles.movies.length; i++) {
                        if (filmArray2.includes(response.Roles.movies[i][0].title) === false) {
                            filmArray2.push(response.Roles.movies[i][0].title)
                        }
                    }
                    //pushes the films the two actors have in common to a new array
                    for (var j = 0; j < filmArray2.length; j++) {

                        if (filmArray1.includes(filmArray2[j])) {
                            finalResults.push(filmArray2[j])
                        }
                        else {
                            console.log("no match")
                        }
                    }
                    console.log(filmArray1)
                    console.log(filmArray2)
                    console.log(finalResults)

                    //for loop to iterate through this created array and retrieve the poster data from a new API
                    for (i = 0; i < finalResults.length; i++) {
                        matchedMovie = finalResults[i]
                        fetch("http://www.omdbapi.com/?s=" + matchedMovie + "&apikey=d86e2804")
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (response) {
                                var poster = response.Search[0].Poster
                                console.log(poster)
                            });
                    };
                })
        })
        .catch(err => {
            console.error(err);
        });
}

checkFirstActor();