let url = new URL("https://developers.zomato.com/api/v2.1/search")
let latt ,long,searchKey;
let radius = 1000;
let userKey = "431d512a3f5465a139bb5e58f03fdaa2";
let header = {
    "user-key": userKey
}


function getUserLocation(){
   let x = document.getElementById("x");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
        
            latt = position.coords.latitude;
            long = position.coords.longitude;
            console.log(latt,long);
        });  
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
}

function getResturants(){
    let params ={
        "lon" : long,
        "lat" : latt,
        "q" : searchKey
    }
    
    if(latt == null || long == null || searchKey == null){
        x.innerHTML = "error with word or location";
        return
    }
    url.search = new URLSearchParams(params).toString(); 
    //console.log(url.search);
    fetch(url,{
        headers:header
    }).then((res)=>{
        return res.json()
    }).then((json)=>{
        //this is where i find all the info
       
        console.log(json);
        showAllRest(json.restaurants);
    }).catch(err => console.log(err)); 
}
function showAllRest(arrResturants){
    if(arrResturants.length ==0){
        return;
    }
    let searchResults = document.getElementById("search-results");
    let str="";
	console.log(arrResturants)
    for(resturants in arrResturants){
        resturants = arrResturants[resturants]["restaurant"];
        //console.log(resturants);
        
        str += "<div>";
        str+=`<h2>cusine types : ${resturants.cuisines}</h2>`
       // str+=`<h3>rating : ${resturants.user_rating.aggregate_rating}</h3>`
	   str += `<h2>name : ${resturants.name}</h2>`
        str+=`<h4>address : ${resturants.location.address}<br>
          locallity : ${resturants.location.locality}<br>
          longtude : ${resturants.location.longitude}<br>
          lattitude : ${resturants.location.latitude}
        </h4>` 
        str+=`<p>menu url : <a href='${resturants.menu_url}'>menu</a></p>`;
        str+=`<p>resturant url : <a href='${resturants.url}'>returant link</a></p>`;
        str+="</div><hr>"
    }
    searchResults.innerHTML= str;
}
window.onload = ()=>{
   
    getUserLocation();
    let searchButton  = document.getElementById("search-button");
    searchButton.addEventListener("click",()=>{
      searchKey = document.getElementById("search-info").value;
      console.log(searchKey);
      getResturants();
    
    })
    
};






