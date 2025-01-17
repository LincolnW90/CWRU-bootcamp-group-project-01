var posterDisplay = document.getElementById("shared-movie-container")
var year = document.getElementById("year-released")
var director = document.getElementById("director")
var gross = document.getElementById("Total-box-office-sales")
var starActors = document.getElementById("star-actors")
var rottenTomatoes = document.getElementById("rotten-tomatoes")
var posterForMovie = document.getElementById("poster-holder")

// set up date and clock
var todaysDate = document.querySelector('#currentDate');
var date = moment().format('dddd, MMMM Do YYYY');
todaysDate.innerHTML = date;
var currentTime = document.querySelector('#currentTime');
var hours = moment().format('hh:mm:ss a')
currentTime.innerHTML = hours
// update time function
var updateClock = setInterval(function () {
    var currentHour = moment().format('hh:mm:ss a');
    currentTime.innerHTML = currentHour
}, 1000);
// end date and clock

//Initial set of arrays, to be added to later
var filmArray1 = [];
var filmArray2 = [];
var finalResults = [];
userResponse1 = ""
userResponse2 = ""

function checkFirstActor() {
    //user responses, set as defined strings currently but will be set to take in values based on what the user types in
    posterDisplay.innerHTML = ""
    filmArray1.length = 0
    filmArray2.length = 0
    finalResults.length = 0
    userResponse1 = document.querySelector('#choice-1').value

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
            console.log(response)
            var ActorID = response.Actors[0].imdb_id


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
            var noPoster = document.createElement("img")
            noPoster.setAttribute("src", "./assets/images/MovieMongoose2.png")
            posterDisplay.appendChild(noPoster)
        });

}

function checkSecondActor() {
    userResponse2 = document.querySelector('#choice-2').value

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
                    if (finalResults.length === 0) {
                        
                        var noPoster = document.createElement("img")
                        noPoster.setAttribute("src", "./assets/images/MovieMongoose.png")
                        posterDisplay.appendChild(noPoster)
                    }
                    //for loop to iterate through this created array and retrieve the poster data from a new API
                    for (i = 0; i < finalResults.length; i++) {
                        matchedMovie = finalResults[i]



                        fetch("https://www.omdbapi.com/?s=" + matchedMovie + "&apikey=d86e2804")
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (response) {

                                var poster = response.Search[0].Poster
                                var posterImg = document.createElement("img")
                                posterImg.setAttribute("src", poster)
                                posterDisplay.appendChild(posterImg)
                                console.log(poster)

                            });
                    };
                })
        })
        .catch(err => {
            console.error(err);
 
            var noPoster = document.createElement("img")
            noPoster.setAttribute("src", "./assets/images/MovieMongoose2.png")
            posterDisplay.appendChild(noPoster)
        });
}

function getMovieInfo() {
    year.innerHTML = ""
    director.innerHTML = ""
    gross.innerHTML = ""
    starActors.innerHTML = ""
    rottenTomatoes.innerHTML = ""
    posterForMovie.innerHTML = ""
    
    userResponse3 = document.querySelector('#movieChoice').value

    fetch(
        "https://www.omdbapi.com/?t=" + userResponse3 + "&apikey=d86e2804"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            console.log(response)
            var yearReleased = document.createElement("p")
            yearReleased.innerHTML = response.Year
            year.appendChild(yearReleased)
            var directedBy = document.createElement("p")
            directedBy.innerHTML = response.Director
            director.appendChild(directedBy)
            var boxOffice = document.createElement("p")
            boxOffice.innerHTML = response.BoxOffice
            gross.appendChild(boxOffice)
            var actors = document.createElement("p")
            actors.innerHTML = response.Actors
            starActors.appendChild(actors)
            // var rating = document.createElement("p")
            // rating.innerHTML =  response.Ratings[1].Value
            // rottenTomatoes.appendChild(rating)
            rottenTomatoes.innerHTML = '🍅🍅' + response.Ratings[1].Value + '🍅🍅'
            // var singlePoster = document.createElement("img")
            // singlePoster.setAttribute("src", response.Poster)
            // posterForMovie.appendChild(singlePoster)
            posterForMovie.setAttribute('src', response.Poster)



        })
}

document.getElementById("function2Btn").addEventListener("click", checkFirstActor)
document.getElementById("function3Btn").addEventListener("click",  getMovieInfo)



// save search functions
savedSearches2 = []
function saveSearch2(){
    actor1 = $('#choice-1').val().trim();
    actor2 = $('#choice-2').val().trim();
    // actors = [actor1, actor2]
    // results = document.querySelector('#shared-movie-container').innerHTML;
    console.log(actor1);
    console.log(actor2);
    // console.log(actors);
    // console.log(results);
    savedSearches2obj = {firstActor: actor1, secondActor: actor2, results: document.querySelector('#shared-movie-container').innerHTML
    }
    savedSearches2.push(savedSearches2obj);
    console.log(savedSearches2)
    localStorage.setItem('savedData', JSON.stringify(savedSearches2));
}
document.querySelector('#saveFunction2').addEventListener('click',saveSearch2);


