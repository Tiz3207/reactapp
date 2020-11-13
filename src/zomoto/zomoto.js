// let url = new URL("https://developers.zomato.com/api/v2.1/search")
// let latt ,long,searchKey;
// let radius = 10;
// let userKey = "431d512a3f5465a139bb5e58f03fdaa2";
// let header = {
//     "user-key": userKey
// }
import React from 'react';


// function getUserLocation(){
//    let x = document.getElementById("x");
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position)=>{
        
//             latt = position.coords.latitude;
//             long = position.coords.longitude;
//             console.log(latt,long);
//         });  
//       } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//       }
// }

// function getResturants(){
//     let params ={
//         "lon" : long,
//         "lat" : latt,
//         "q" : searchKey,
//         "radius": radius
//     }
    
//     if(latt == null || long == null || searchKey == null){
//         x.innerHTML = "error with word or location";
//         return
//     }
//     url.search = new URLSearchParams(params).toString(); 
//    console.log(url.search);
//     fetch(url,{
//         headers:header
//     }).then((res)=>{
//         return res.json()
//     }).then((json)=>{
//         //this is where i find all the info
//         x.innerHTML = "";
//         console.log(json);
//         showAllRest(json.restaurants);
//     }).catch(err => console.log(err)); 
// }
// function showAllRest(arrResturants){
//     let searchResults = document.getElementById("search-results");
//     if(arrResturants.length ==0){
//         searchResults.innerHTML=`<h2>no results found with searchword: <b>${document.getElementById("search-info").value}</b></h2>`
//         return;
//     }
    
//     let str="";
//     console.log(arrResturants);
//     for(resturants in arrResturants){
//         resturants = arrResturants[resturants]["restaurant"];
//         console.log(resturants.featured_image);
        
//         str += "<div>";
//         str += `<h2>name : ${resturants.name}</h2>`
//         str+=`<h2>cusine types : ${resturants.cuisines}</h2>`
//        if(resturants.featured_image != ""){
//         str+=`<img src="${restaurants.featured_image}" width="100px" height="100px"></img>`;   
//        }
       
//          str+=`<h3>rating : ${resturants.user_rating.aggregate_rating}</h3>`
//         str+=`<h4>address : ${resturants.location.address}<br>
//           locallity : ${resturants.location.locality}<br>
//           longtude : ${resturants.location.longitude}<br>
//           lattitude : ${resturants.location.latitude}
//         </h4>` 
//         str+=`<p>menu url : <a href='${resturants.menu_url}' target="_blank">menu</a></p>`;
//         str+=`<p>resturant url : <a href='${resturants.url}' target="_blank">returant link</a></p>`;
//         str+="</div><hr>"
//     }
//     searchResults.innerHTML= str;
// }
// window.onload = ()=>{
   
//     getUserLocation();
//     let searchButton  = document.getElementById("search-button");
//     searchButton.addEventListener("click",()=>{
//       searchKey = document.getElementById("search-info").value;
//       let radiusValue = document.getElementById("radius").value;
//       if(Number(radiusValue).toString().toUpperCase() == "NAN" || radiusValue ==""){
//         let x = document.getElementById("x");
//         x.innerText = "not a valid radius";    
//         return;
//       }
//       radius = Number(radiusValue);
//       console.log(searchKey);
//       getResturants();
    
//     })
    
// };
class Zomato extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchKey : "",
            radius : 10,
            latt:"",
            long:"",
            allResturants:[]
        }
        this.url = new URL("https://developers.zomato.com/api/v2.1/search")
        this.userKey = "431d512a3f5465a139bb5e58f03fdaa2";
         this.header = {
            "user-key": this.userKey
         }
         this.handleChangeRadius = this.handleChangeRadius.bind(this);
         this.handleChangeSearchKey = this.handleChangeSearchKey.bind(this);
         this.searchRest = this.searchRest.bind(this);
         
       // this.handleClick = this.handleClick(this);
    }
    componentDidMount(){
        if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position)=>{
                    
                        this.setState({
                            latt : position.coords.latitude,
                            long : position.coords.longitude
                        });
                        // latt = position.coords.latitude;
                        // long = position.coords.longitude;
                        console.log(position.coords.latitude,position.coords.longitude);
                    });  
         
             }
    }
    handleChangeSearchKey(e){
      this.setState({searchKey :e.target.value });
      
    }
    handleChangeRadius(e){
        this.setState({radius : e.target.value });
      }
    searchRest(){
        //console.log(this.state);
        let x = document.getElementById("x");
        let params ={
                     "lon" : this.state.long,
                    "lat" : this.state.latt,
                    "q" : this.state.searchKey,
                    "radius": this.state.radius
                }
      let latt = this.state.latt;
      let long = this.state.long;
      let searchKey = this.state.searchKey; 
      let url = this.url;
      let header = this.header;         
                if(latt == null || long == null || searchKey == ""){
                    x.innerHTML = "error with word or location";
                    return
                }
                url.search = new URLSearchParams(params).toString(); 
                fetch(url,{
                    headers:header
                }).then((res)=>{
                    return res.json()
                }).then((json)=>{
                    //this is where i find all the info
                    x.innerHTML = "";
                    
                    this.setState({allResturants:json.restaurants});
                    
                }).catch(err => console.log(err));
            }
    render(){
        let arrayForRest=[];
        
        for(let i=0;i<this.state.allResturants.length;i++){
           
            let restNow = this.state.allResturants[i].restaurant;
            
           arrayForRest.push(<div key={i}>
               <h2>name : {restNow.name}</h2>
        <h2>cusine type : {restNow.cuisines}</h2>
           <h3>rating : {restNow.user_rating.aggregate_rating}</h3>
           <h4>address : {restNow.location.address}<br />
           locallity : {restNow.location.locality}<br />
           longtude : {restNow.location.longitude}<br />
          lattitude : {restNow.location.latitude}
           </h4>
    <p>menu url : <a href={restNow.menu_url} target="_blank">menu</a></p>
    <p>resturant url : <a href={restNow.url} target="_blank">returant link</a></p>
           <hr></hr>
            </div>);
        }
        
        
    

        return (
            <div>
            <h1 id= "x"></h1>
        <script src = "index2.js"></script>
        <input id = "search-info" value = {this.state.searchKey} onChange = {this.handleChangeSearchKey} />
        <label> radius in meters: <input value = {this.state.radius} id="radius" onChange={this.handleChangeRadius}  size="5"/></label>
        <button onClick={this.searchRest} id= "search-button">search</button>
        <div id = "search-results">{arrayForRest}</div>
        </div>);
    }

}

export default Zomato;






