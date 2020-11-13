//key - 431d512a3f5465a139bb5e58f03fdaa2
const fetch = require("node-fetch");
//const URL = require("url");
let url = new URL("https://developers.zomato.com/api/v2.1/search")
let latt = "38.715140",long ="-90.418950",searchKey="burgers";
let radius = 1000;
let userKey = "431d512a3f5465a139bb5e58f03fdaa2";
let header = {
    "user-key": userKey
}

let params ={
    "lon" : long,
    "lat" : latt,
    "q" : searchKey
}
url.search = new URLSearchParams(params).toString(); 
fetch(url,{
    headers:header
}).then((res)=>{
    return res.json()
}).then((json)=>{
    console.log(json);
}).catch(err => console.log(err));

//url - https://developers.zomato.com/api/v2.1/search

