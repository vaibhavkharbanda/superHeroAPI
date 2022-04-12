var heroID= localStorage.getItem("heroId");

var fetchHero= function (){
    let url="https://superheroapi.com/api/10216671135609162/"+''+heroID;
    var xhrRequest = new XMLHttpRequest();

    xhrRequest.onload = function(){
    var responseJSON =JSON.parse(xhrRequest.response);
        if(responseJSON.response=='success'){
            diplayDetails(responseJSON);
        }else{
            console.log("Error in fetching Data from ID");
        }
    }
    xhrRequest.open('get',url);
    xhrRequest.send();
    
}


fetchHero();

function diplayDetails(heroDetail){
    document.getElementById('hero-name').innerHTML=heroDetail.name;
    document.getElementById('hero-image').src=heroDetail.image.url;
    console.log(heroDetail);

    //work profile output
        document.getElementById('work-base').innerHTML='&nbsp'+heroDetail.work.base;
        document.getElementById('work-occupation').innerHTML='&nbsp'+heroDetail.work.occupation;

    //Power Stat ouput
        powerStatManupulation('combat-data',heroDetail.powerstats.combat,"Combat");
        powerStatManupulation('durability-data',heroDetail.powerstats.durability,"Durability");
        powerStatManupulation('intelligence-data',heroDetail.powerstats.intelligence,"Intelligence");
        powerStatManupulation('power-data',heroDetail.powerstats.power,"Power");
        powerStatManupulation('speed-data',heroDetail.powerstats.speed,"Speed");
        powerStatManupulation('strength-data',heroDetail.powerstats.strength,"Strength");

        //appearance output
        // document.getElementById('eye-color').innerHTML=heroDetail.appearance.eye+'-'+color;
        document.getElementById('race').innerHTML=heroDetail.appearance.race;
        document.getElementById('gender').innerHTML='&nbsp'+heroDetail.appearance.gender;
        document.getElementById('height').innerHTML='&nbsp'+heroDetail.appearance.height[1];
        document.getElementById('weight').innerHTML='&nbsp'+heroDetail.appearance.weight[1];


        //Biography output
        // document.getElementById('full-name').innerHTML=heroDetail.biography.full+"-"+name;
        document.getElementById('alignment').innerHTML='&nbsp'+heroDetail.biography.alignment;
        document.getElementById('publisher').innerHTML='&nbsp'+heroDetail.biography.publisher;
        document.getElementById('aliases').innerHTML='&nbsp'+heroDetail.biography.aliases;
        document.getElementById('race').innerHTML='&nbsp'+heroDetail.biography.alignment;
        document.getElementById('race').innerHTML='&nbsp'+heroDetail.biography.alignment;
        document.getElementById('race').innerHTML='&nbsp'+heroDetail.biography.alignment;
        

}



function powerStatManupulation(powerId,value,powerName){
    document.getElementById(powerId).setAttribute('aria-valuenow',value);
    document.getElementById(powerId).setAttribute('style',"width:"+value+"%");
    document.getElementById(powerId).innerHTML=powerName + ' - '+value+'%';
}

