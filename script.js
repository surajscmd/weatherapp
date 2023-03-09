const APIKey = '5e3bc224625374e374e11d3be1d975bb';
const wrapper = document.querySelector(".wrapper"),
inputpart = wrapper.querySelector(".input-part"),
infotxt = inputpart.querySelector(".info-txt"),
inputField= inputpart.querySelector("input"),
locationbtn = inputpart.querySelector("button"),
wIcon = document.querySelector(".weatherpart img");
arrowBack = wrapper.querySelector("header i");

enterbtn =inputpart.querySelector(".btte");

let api;

inputField.addEventListener("keyup", e =>{

   // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
      requestApi(inputField.value);
      
    }
});

enterbtn.addEventListener("click", ()=>{
  if(inputField.value != ""){
    requestApi(inputField.value);
    
  }
});

locationbtn.addEventListener("click", ()=>{
  if(navigator.geolocation){
    //if browser suppots geolocation 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  }else{
    alert("Your browser not support geolocation api");
  }

});

function onSuccess(position){
  const{latitude, longitude} = position.coords; // geting lat and lon of user data
   api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`;
   featchData();
}



function onError(error){
  infotxt.innerText = error.message;
  infotxt.classList.add("error"); 
}

function requestApi(city){
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
  featchData();
}

function featchData(){
  infotxt.innerText = "Getting weather details...";
  infotxt.classList.add("pending"); 
  fetch(api).then(responce => responce.json()).then(result => weatherDetails(result));

}

function weatherDetails(info){
  infotxt.classList.replace("pending","error");
  if(info.cod == "404"){
    infotxt.innerText = `${inputField.value} isn't a valid city name`;

  }
  else{

    const city =info.name;
    const country=info.sys.country;
    const {description , id} =info.weather[0];
    const {feels_like, humidity ,temp} =info.main;

    //use custom icon according to id

    if(id == 800){
      wIcon.src = "Weather/clear.svg";
    }
    else if(id >= 200 && id <= 232){
      wIcon.src = "Weather/storm.svg";

    }else if(id >= 600 && id <= 622){
      wIcon.src = "Weather/snow.svg";

    }else if(id >= 701 && id <= 781){
      wIcon.src = "Weather/haze.svg";

    }else if(id >= 801 && id <= 804){
      wIcon.src = "Weather/cloud.svg"
    }
    else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
      wIcon.src = "Weather/rain.svg";

    }


    //passing value to html

    wrapper.querySelector(".temp .numb").innerText = temp;
    wrapper.querySelector(".weather").innerText = description ;
    wrapper.querySelector(".location span").innerText = `${city},${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".columhumidity span").innerText =`${humidity}%`;

    





    infotxt.classList.remove("pending","error")
    wrapper.classList.add("active");
    console.log(info);

  }
}
arrowBack.addEventListener("click",()=>{
      wrapper.classList.remove("active");
}
);