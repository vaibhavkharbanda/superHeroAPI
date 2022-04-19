const url = 'https://superheroapi.com/api/10216671135609162/search/';
//geting the local storage variable of favlist array
var favList = JSON.parse(localStorage.getItem("favList")) === null
    ? []
    : JSON.parse(localStorage.getItem("favList"));

//fetching data from search bar
var inputName = document.getElementById('searchBar');
var notification=document.getElementById('notification');
//fetching name while typing from search bar
inputName.onkeyup = function () {

    //if the length of name is les than 2 than no output will be there
    if (inputName.value.length < 3) {
        document.getElementById('no-output').innerHTML="Super Hero Name atleast have 3 words "
    }
    //fetch data if length of hero is >=3
    else {
        var searchName = inputName.value;
        var xhrRequest = new XMLHttpRequest();

        xhrRequest.onload = function () {
            var responseJSON = JSON.parse(xhrRequest.response);
            filterHeros(responseJSON.results);
        }

        xhrRequest.open('get', url + searchName);
        xhrRequest.send();
    }
}

function filterHeros(heros) {
    //removing previous results
    var heroCardDiv = document.getElementById('hero-cards');
    heroCardDiv.remove();

    //adding div for new result
    var newHeroCardDiv = document.createElement('div');
    newHeroCardDiv.setAttribute('id', 'hero-cards');
    document.getElementById('outputContainer').appendChild(newHeroCardDiv);
    for (hero of heros) {
        heroCard(hero);
    }
}

//Showing hero cards to the output Container
function heroCard(hero) {
    let heroName = hero.name;
    var heroId = hero.id;
    let heroImage = hero.image.url;


    //adding card
    let heroCards = document.getElementById('hero-cards');
    let card = document.createElement('span');
    card.setAttribute('class', 'card row');
    heroCards.appendChild(card);

    //adding  cards and details 
    
    let detailsAnchor = document.createElement('a');
    detailsAnchor.setAttribute('class', 'detail-page');
    detailsAnchor.setAttribute('id', hero.id);
    detailsAnchor.href = "/project/SuperHeroAPI/heroDetails.html";
    card.appendChild(detailsAnchor);
    
    

    //adding image to the tag
    let heroImagetag = document.createElement('img');
    heroImagetag.setAttribute('class', 'hero-image');
    heroImagetag.setAttribute('alt', heroName);
    heroImagetag.src = heroImage;
    detailsAnchor.appendChild(heroImagetag);

    //adding name to the card
    let heroNameTag = document.createElement('h6');
    heroNameTag.setAttribute('class', 'hero-name text-center');
    heroNameTag.innerHTML = heroName;
    detailsAnchor.appendChild(heroNameTag)

    //adding fav button to the card
    var favButton = document.createElement('i');
    favButton.setAttribute('class', 'fa-solid fa-heart fav-button');
    favButton.setAttribute('superheroId', heroId);
    favButton.setAttribute('divType', 'fav-btn');
    favButton.setAttribute('value','unfav');
    card.appendChild(favButton);

    //redirecting to the hero details page
    detailsAnchor.addEventListener('click', (element) => {
        var heroID = element.path[1].id;
        localStorage.setItem("heroId", heroID);
    });

    //toggling with the fav button of each card
    if(favList.includes(heroId)){
        favButton.setAttribute('class', 'fa-solid fa-heart fav-button fav-filled');
        favButton.setAttribute('value','fav');
    }
    
}
//functioning of fav button of each card
var output=document.getElementById('outputContainer');

output.onclick=function(event){
    var id = event.target.getAttribute('superheroId');
    var div = event.target.getAttribute('divType');
    var favValue=event.target.getAttribute('value');

    //toggling with fav buttons
    if (div === 'fav-btn') {
        if (id === null)
            return;
        if (favValue=="fav") {
            favList.splice(favList.indexOf(id), 1);
            event.target.classList.remove('fav-filled');
            event.target.setAttribute('value','unfav')
            if(notification.getAttribute("notification-design")){

            }
            else{
                notification.setAttribute('class',"notification-design");
            }
            
            notification.innerHTML="Removed to favourite !";
            setTimeout(()=>{
                notification.innerHTML=""
                notification.classList.remove('notification-design');
            },4000);
        } else {
            favList.push(id);
            event.target.classList.add('fav-filled');
            event.target.setAttribute('value','fav');
            if(notification.getAttribute("notification-design")){

            }
            else{
                notification.setAttribute('class',"notification-design");
            }
            notification.innerHTML="Added to favourite !";
            setTimeout(()=>{
                notification.innerHTML=""
                notification.classList.remove('notification-design');
            },5000);
        }
    }
    localStorage.setItem("favList", JSON.stringify(favList));
}




