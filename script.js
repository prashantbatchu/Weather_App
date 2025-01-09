const cityName = document.querySelector('.city-input');

const serachdone = document.querySelector('.search-btn');

const notFountsection = document.querySelector('.not-found');
const searchcitysection = document.querySelector('.search-city');
const weatherinformationsection = document.querySelector('.weather-information');

const countrytext = document.querySelector('.cntry-txt');
const temptext = document.querySelector('.temp-txt');
const conditiontext = document.querySelector('.condition-txt');
const humidityvaluetext = document.querySelector('.humidity-value-txt');
const windspeedetext = document.querySelector('.wind-value-txt');
const weathersummaryimage = document.querySelector('.weather-summary-img');
const currentdate = document.querySelector('.crt-date-txt');


const APIKEY = 'feb9a1d5c0b1077f9226a03f3cb8d6ec';



serachdone.addEventListener('click',() => {
    if(cityName.value.trim() != ''){
        Updatethedata(cityName.value);
        cityName.value = "";
        cityName.blur();
    }
});

cityName.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        if(cityName.value.trim() != ''){
            Updatethedata(cityName.value);
            cityName.value = "";
            cityName.blur();
        }
        else{
            cityName.value = "";
        }
    }
});


getFetchData = async(ep,city1) => {
    const apiurl = `https://api.openweathermap.org/data/2.5/${ep}?q=${city1}&appid=${APIKEY}&units=metric`;
    const response = await fetch(apiurl);
    return response.json();
}


getCurrdateof = () =>{
    const curdat = new Date();
    const options = {
        weekday : 'short',
        day : '2-digit',
        month : 'short'
    }
    return curdat.toLocaleDateString('en-GB',options);
}

gEtweatherimage = (id)=>{

    if(id<=232) return 'assets/weather/thunderstorm.svg';
    if(id<=321) return 'assets/weather/drizzle.svg';
    if(id<=531) return 'assets/weather/rain.svg';
    if(id<=622) return 'assets/weather/snow.svg';
    if(id<=781) return 'assets/weather/atmosphere.svg';
    if(id<=800) return 'assets/weather/clear.svg';
    else return 'assets/weather/clouds.svg';

}

Updatethedata = async(city)=>{
    const weatherData = await getFetchData('weather',city);
    if(weatherData.cod!=200){
        showdisplaysection(notFountsection);
        return ;
    }
    // console.log(weatherData);
    const {
        name : country,
        main : {temp ,humidity},
        weather : [{id,main}],
        wind : {speed},
    } = weatherData;

    countrytext.textContent = country;
    temptext.textContent = Math.round(temp) + " °C";
    conditiontext.textContent = main;
    humidityvaluetext.textContent = humidity + " %";
    windspeedetext.textContent = speed +  " M/s";
    weathersummaryimage.src = `${gEtweatherimage(id)}`;

    currentdate.textContent = getCurrdateof();


    showdisplaysection(weatherinformationsection);

}

showdisplaysection = (secc) => {
    [weatherinformationsection,searchcitysection,notFountsection].forEach(secc => secc.style.display = 'none');     
    secc.style.display = '';
}