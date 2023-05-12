/* Global Variables */
const apiKey = 'afff8ca948795f02f3bb0452ac11708e&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getDate()+'/'+(d.getMonth()+1)+'/'+ d.getFullYear();

//select button to get data
let button = document.querySelector("#generate")
let myTemp; // data of weather

//function to get data when click on the button

let buttonEvent = () => {
    const zip = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;
    const myUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=afff8ca948795f02f3bb0452ac11708e&units=imperial`;
    const fetchApi = collectData(myUrl);
    fetchApi.then((data) => {
        const finalData = {         //object container the data 
        myTemp : data.main.temp ,
        theFeelings : feelings ,
        theDate : newDate
        }
        sendData('/add',finalData);
    }).then(() => retrieveData());
}  
// function to get data
const collectData= async(myUrl) => {
    zip = document.querySelector("#zip").value;
    const link = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=afff8ca948795f02f3bb0452ac11708e&units=imperial`;
    console.log(myUrl);
    const response = await fetch (link);
    try {
    const data = await response.json()
        return data;
    } catch(error){
        console.log('error')
    }  
}
// function to post data to the server
const sendData = async (addRoute,finalData) => {
    const response = await fetch (addRoute , {
        method: 'POST',
        credentials : 'same-origin',
        headers : {
            'content-type':'application/json'
        },
        body : JSON.stringify(finalData)
    });
}
// function to return data and show on the UI
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.myTemp)+' '+'degrees';
    document.getElementById('content').innerHTML = allData.theFeelings;
    document.getElementById('date').innerHTML =allData.theDate;
    }
    catch(error) {
      console.log('error', error);
    }
   }
button.addEventListener('click', buttonEvent); 