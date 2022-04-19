//checking and fetching the localstorage array of favlist
var favList = JSON.parse(localStorage.getItem("favList")) === null
    ? []
    : JSON.parse(localStorage.getItem("favList"));


if (favList == null) {
    document.getElementById('output-container').innerHTML("Ummm! No favourites Added Yet");
}
else {

    for (favID of favList) {
        fetchHero(favID);
    }

}


//fetching the hero detils using async await
async function fetchHero(id) {
    let url = "https://superheroapi.com/api/10216671135609162/" + '' + favID;
    var xhrRequest = new XMLHttpRequest();

    xhrRequest.onload = async function () {
        var responseJSON = await JSON.parse(xhrRequest.response);
        if (responseJSON.response == 'success') {
            heroCard(responseJSON);
        } else {
            console.log("Error in fetching Data from ID");
        }
    }
    await xhrRequest.open('get', url);
    await xhrRequest.send();
}

//generating the hero card and deleting aswell
function heroCard(response) {

    var heroCard=document.getElementById('hero-cards');
    

    var card=document.createElement('li');
    card.setAttribute('class',"card-li")
    heroCard.appendChild(card);

    var cardAnchor=document.createElement('a');
    cardAnchor.href="/project/SuperHeroAPI/heroDetails.html";
    cardAnchor.setAttribute('id',response.id);
    cardAnchor.setAttribute('class','card-anchor');
    card.appendChild(cardAnchor);

    var counter=document.createElement('h5');
    counter.setAttribute('class',"counter");
    cardAnchor.appendChild(counter);


    var heroImg=document.createElement('img');
    heroImg.setAttribute('src',response.image.url);
    heroImg.setAttribute('class',"hero-image");
    cardAnchor.appendChild(heroImg);

    var heroName=document.createElement('h5');
    heroName.setAttribute('class',"hero-name");
    heroName.innerHTML=response.name;
    cardAnchor.appendChild(heroName);

    var removeButton=document.createElement('i');
    var removeButton1=document.createElement('i'); 
    removeButton1.innerHTML=" &nbsp"
    removeButton1.setAttribute('class','helper');
    removeButton.setAttribute('class',"fa-solid fa-trash remove-fav hide-class");
    removeButton.setAttribute('id',"remove-fav"+response.id);
    card.appendChild(removeButton);
    card.appendChild(removeButton1);


    //removing the hero from favlist
    removeButton.addEventListener('click',()=>{
        favList.splice(favList.indexOf(response.id),1);
        localStorage.setItem("favList",JSON.stringify(favList));
        card.remove();
    });

    // redirecting the heros to its detail page
    cardAnchor.addEventListener('click',(element)=>{
        var heroID=element.path[1].id;
        localStorage.setItem("heroId",heroID);
    });



}



