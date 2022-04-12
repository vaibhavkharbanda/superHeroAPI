const url= 'https://superheroapi.com/api/10216671135609162/search/';

document.getElementById('searchButton').addEventListener('click',fetchHeros);

function fetchHeros(){
    let searchName=document.getElementById('searchBar').value;
    var xhrRequest = new XMLHttpRequest();

    xhrRequest.onload = function(){
        var responseJSON = JSON.parse(xhrRequest.response);
        filterHeros(responseJSON.results);
    }

    xhrRequest.open('get',url+searchName);
    xhrRequest.send();
}


function filterHeros(heros){
    for(hero of heros){
        heroCard(hero);
    }
}


function heroCard(hero){
    let heroName=hero.name;
    let heroId=hero.id;
    let heroImage=hero.image.url;

    //adding  cards and details 
    let heroCards=document.getElementById('hero-cards');
    let detailsAnchor=document.createElement('a');
    detailsAnchor.setAttribute('class','detail-page');
    detailsAnchor.setAttribute('id',hero.id);
    detailsAnchor.href="/project/SuperHeroAPI/heroDetails.html";
    // detailsAnchor.href="#";
    heroCards.appendChild(detailsAnchor);
        //adding card
    let card=document.createElement('span');
    card.setAttribute('class','card row');
    detailsAnchor.appendChild(card);
        //adding image to the tag
    let heroImagetag=document.createElement('img');
    heroImagetag.setAttribute('class','hero-image');
    heroImagetag.setAttribute('alt',heroName);
    heroImagetag.src=heroImage;
    card.appendChild(heroImagetag);
        //adding name to the card
    let heroNameTag=document.createElement('h6');
    heroNameTag.setAttribute('class','hero-name text-center');
    heroNameTag.innerHTML=heroName;
    card.appendChild(heroNameTag)

  
    detailsAnchor.addEventListener('click',(element)=>{
        var heroID=element.path[2].id;
        localStorage.setItem("heroId",heroID);
    });





    
}





