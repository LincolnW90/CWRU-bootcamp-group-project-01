// var movieTest = fetch(
//     "http://www.omdbapi.com/?a=ChrisPratt&apikey=d86e2804"
// )
// .then(function (response) {
//     return response.json();
// })
// .then(function (response) {
//     console.log(response)
// });

var filmArray1 = [];
var filmArray2 = [];
var finalResults = [];

function checkActors(){
userResponse1 = "Ben Affleck"
userResponse2 = "Matt Damon"

fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse1 +"/" , {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
		"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
	}



})
.then(function (response) {
    return response.json();
})
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
    .then(function (data) {
        for (i = 0; i < data.Roles.movies.length; i++){
        filmArray1.push(data.Roles.movies[i][0].title)
        
    }
    })

    .catch(err => {
        console.error(err);
    });

})
.catch(err => {
	console.error(err);
    
});


fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse2 +"/" , {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
		"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
	}
})
.then(function (response) {
    return response.json();
})
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
    .then(function (response) {
        for (i = 0; i < response.Roles.movies.length; i++){
            
        filmArray2.push(response.Roles.movies[i][0].title)
       
        
        
        if (filmArray1.includes(filmArray2[i])){
            console.log( filmArray2[i])
        }
        else {
            console.log("no match")
        }
        }

    
    })
    


    .catch(err => {
        console.error(err);
    });

})
.catch(err => {
	console.error(err);
    
});
console.log(filmArray1)
console.log(filmArray2)


}

checkActors();

function checkActors2(){
userResponse1 = "Tom Hanks"
userResponse2 = "Chris Pratt"

Promise.all([
	fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse1 +"/" , {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        }
    }),
	fetch("https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/" + userResponse2 +"/" , {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1d90df3750mshd40006f295ac708p1a17dajsn87556815a8fb",
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        }
    })
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(function (data) {
	// Log the data to the console
	// You would do something with both sets of data here
	console.log(data);

    var ActorID = Promise.all(data.Array[0].Actors[0].imdb_id)
    console.log(ActorID)


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
    .then(function (response) {
        for (i = 0; i < response.Roles.movies.length; i++){
        filmArray = (response.Roles.movies[i][0].title)
        console.log(filmArray)
    }
    })

    
}).catch(function (error) {
	// if there's an error, log it
	console.log(error);
});



    }

    // checkActors2();