const url= 'https://superheroapi.com/api/10216671135609162/search/';



function searchHero(){
    let searchName=document.getElementById('searchBar').value;
    let response=fetch(url+searchName);
    // let data = response.json();
    console.log(response);
}

document.getElementById('searchButton').addEventListener('click',searchHero);