savedSearches2 = JSON.parse(localStorage.getItem('savedData'));
historyActors = document.getElementById('historySearches');
historyPosters = document.getElementById('historyResults');

function propogate(){
    for(i=0; i<savedSearches2.length; i++){
       var init = JSON.parse(localStorage.getItem('savedData'))
       console.log(init[i]);
       var list1 = document.createElement('p');
       list1.innerHTML = init[i].firstActor + ' & ' + init[i].secondActor;
       historyActors.appendChild(list1);
       
        //    posters to history list
        var list2 = document.createElement('div')
        list2.innerHTML = init[i].results
        historyActors.appendChild(list2)
    }
}

propogate();