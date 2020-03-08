const input = document.querySelector(".inputSearch");
const search = document.querySelector(".bSearch");
const form = document.querySelector("#search");
const locationCoordinates = document.querySelector(".test1");

form.addEventListener("submit", checkInput);

function checkInput(e) {
  e.preventDefault();
  console.log(input.value)
  if (!input.value) {
    alert('type something');
  } else {
    getCoordinates(input.value);
  }
}



function getCoordinates() {


  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input.value}&key=b3768e8c23d84809bb35cca1b9b9eea5`)
    .then(data => {
      console.log(data);
      if (!data.ok) {
        console.log(Error);

        throw Error(data.statusText)

      }

      return data.json()
    })

    .then(res => {

      $(".weatherImage").hide();


      var locRes = [];
      locationCoordinates.innerHTML = "";

      console.log(res);

      locRes = res.results;
      console.log(locRes)
      let noLoc = res.total_results;
      console.log(noLoc)

      if (noLoc == 0) {
        $(".ermes1").slideDown(300);
      } else {
        $(".ermes1").hide();

        let output = "";

        locRes.forEach(function (element, index) {
          locRes = "";
          $(".inputSearch").val("");
          $(".coordinatsResults").show();



          // console.log(`Current index: ${index}`);

          // console.log(element);

          var resLocation = res.results;
          console.log(resLocation);
          let descrip = element.formatted;
          let lat = element.geometry.lat;
          let long = element.geometry.lng;
          let type = element.components._type;
          let location = element.formatted;

          // console.log(location);
          // console.log(type);
          // console.log(capitalize(type))
          // console.log(typeof "type");


          output = `
          <div class="card">
          <div class="list-group " id="myList">
          <button type="button" class="list-group-item list-group-item-action resLocation test22 " id="${lat} ${long}" data-button='{"blat": "${lat}", "blong": "${long}", "bloc": "${location}"}'  > 
           ${descrip} / ${capitalize(type)} 
          </button>
        </div>
        </div>
          `
          locationCoordinates.innerHTML += output;
          $(".resLocation").click(getWeather);
        });
      }
    })
    .catch(error => {
      console.log(error);
      if (error == "Error: Bad Request") {
        $(".ermes").slideDown(300);
      } else {
        $(".offline").slideDown("slow");

      }
    });

}






function getWeather() {
  let data = $.parseJSON($(this).attr('data-button'));
  // console.log(data.blong)
  let LAT = data.blat;
  let LONG = data.blong;
  let LOCATION = data.bloc;
  // console.log(LOCATION)

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LONG}&appid=7777747857397a532f803540fcfa2bc0&units=metric`)


    .then(data => {
      // console.log(data);
      if (!data.ok) {
        throw Error(data.statusText)
      }
      return data.json()
    })
    .then(result => {
      // console.log(result)
      $(".coordinatsResults").hide();
      $(".weatherDetails").show();

      let icon = result.weather[0].icon;
      // console.log(icon);
      let des = result.weather[0].description;
      let temp = Math.round(result.main.temp);
      let location = result.name;
      let wind = result.wind.speed;
      let pressure = result.main.pressure;
      let humidity = result.main.humidity;
      let country = result.sys.country;
      let todaydate = todayDate(result.dt);
      let time = unixTime(result.dt);
      let clouds = result.clouds.all;

      let iconcode = result.weather[0].icon;
      // console.log(iconcode)
      let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      // console.log(iconurl)
      // console.log(location);
      // console.log(country);
      // console.log(temp);
      // console.log(todaydate);
      // console.log(clouds);

      $('.wicon').attr('src', iconurl);
      document.querySelector(".wdegree").innerHTML = ` ${temp + String.fromCharCode(176) + "C"} `;
      document.querySelector(".wlocation").innerHTML = `${location},  ${country}`;
      document.querySelector(".wdate").innerHTML = `${todaydate}, ${time}`;
      document.querySelector(".wdesc").innerHTML = capitalize(des);
      document.querySelector(".wcloud").innerHTML = `<i class="fab fa-cloudversify"></i> ${clouds}% Clouds`;
      document.querySelector(".wwind").innerHTML = `<i class="fas fa-wind"></i> ${Math.round(wind)}m/s Winds`;
      document.querySelector(".whumid").innerHTML = `<i class="fas fa-tint"></i> ${humidity}% Humidity`;
      document.querySelector(".wpress").innerHTML = `<i class="far fa-clock"></i> ${pressure}hPa Pressure`;

      $(".wforecast").click(getwForecast);

      function getwForecast() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LONG}&appid=7777747857397a532f803540fcfa2bc0&units=metric`)
          .then(data => {
            console.log(data);
            if (!data.ok) {
              throw Error(data.statusText)
            }
            return data.json()
          })
          .then(results => {

            console.log(results)

            let wfore = results.city;
            // console.log(wfore)
            let days = results.list;
            // console.log(days);

            let day1f = days[8];
            let day2f = days[16];
            let day3f = days[24];
            let day4f = days[32];
            let day5f = days[39];

            //forecast first day

            let fd1date = todayDate(day1f.dt);
            let fd1temp = Math.round(day1f.main.temp);
            let fd1feels = Math.round(day1f.main.feels_like);
            let fd1icon = day1f.weather[0].icon;

            // console.log(fd1icon);
            let f1iconurl = "http://openweathermap.org/img/w/" + fd1icon + ".png";
            // console.log(f1iconurl)

            $('.fday1icon').attr('src', f1iconurl);

            document.querySelector(".fday1date").innerHTML = fd1date;
            document.querySelector(".fday1temp").innerHTML = `${fd1temp + String.fromCharCode(176)}/${fd1feels + String.fromCharCode(176)}`;

            // console.log(fd1date);
            // console.log(fd1temp);
            // console.log(fd1feels);

            //forecast second day

            let fd2date = todayDate(day2f.dt);
            let fd2temp = Math.round(day2f.main.temp);
            let fd2feels = Math.round(day2f.main.feels_like);
            let fd2icon = day1f.weather[0].icon;

            // console.log(fd2icon);
            let f2iconurl = "http://openweathermap.org/img/w/" + fd2icon + ".png";
            // console.log(f2iconurl)

            $('.fday2icon').attr('src', f2iconurl);

            document.querySelector(".fday2date").innerHTML = fd2date;
            document.querySelector(".fday2temp").innerHTML = `${fd2temp + String.fromCharCode(176)}/${fd2feels + String.fromCharCode(176)}`;

            // console.log(fd2date);
            // console.log(fd2temp);
            // console.log(fd2feels);

            //forecast third day

            let fd3date = todayDate(day3f.dt);
            let fd3temp = Math.round(day3f.main.temp);
            let fd3feels = Math.round(day3f.main.feels_like);
            let fd3icon = day3f.weather[0].icon;

            // console.log(fd3icon);
            let f3iconurl = "http://openweathermap.org/img/w/" + fd3icon + ".png";
            // console.log(f3iconurl)

            $('.fday3icon').attr('src', f3iconurl);

            document.querySelector(".fday3date").innerHTML = fd3date;
            document.querySelector(".fday3temp").innerHTML = `${fd3temp + String.fromCharCode(176)}/${fd3feels + String.fromCharCode(176)}`;

            // console.log(fd3date);
            // console.log(fd3temp);
            // console.log(fd3feels);

            //forecast fourth day

            let fd4date = todayDate(day4f.dt);
            let fd4temp = Math.round(day4f.main.temp);
            let fd4feels = Math.round(day4f.main.feels_like);
            let fd4icon = day4f.weather[0].icon;

            // console.log(fd4icon);
            let f4iconurl = "http://openweathermap.org/img/w/" + fd4icon + ".png";
            // console.log(f4iconurl)

            $('.fday4icon').attr('src', f4iconurl);

            document.querySelector(".fday4date").innerHTML = fd4date;
            document.querySelector(".fday4temp").innerHTML = `${fd4temp + String.fromCharCode(176)}/${fd4feels + String.fromCharCode(176)}`;

            // console.log(fd4date);
            // console.log(fd4temp);
            // console.log(fd4feels);

            //forecast fifth day

            let fd5date = todayDate(day5f.dt);
            let fd5temp = Math.round(day5f.main.temp);
            let fd5feels = Math.round(day5f.main.feels_like);
            let fd5icon = day5f.weather[0].icon;

            // console.log(fd5icon);
            let f5iconurl = "http://openweathermap.org/img/w/" + fd5icon + ".png";
            // console.log(f5iconurl)

            $('.fday5icon').attr('src', f5iconurl);

            document.querySelector(".fday5date").innerHTML = fd5date;
            document.querySelector(".fday5temp").innerHTML = `${fd5temp + String.fromCharCode(176)}/${fd5feels + String.fromCharCode(176)}`;

            // console.log(fd5date);
            // console.log(fd5temp);
            // console.log(fd5feels);

            // console.log(day1f);
            // console.log(day2f);
            // console.log(day3f);
            // console.log(day4f);
            // console.log(day5f);

          })
      }


    })
    .catch(error => {
      console.log(error);
      if (error == "Error: Bad Request") {
        $(".ermes").slideDown(300);
        // console.log(outputem)
      } else {
        $(".offline").slideDown("slow");

      }
    });
}





function unixDate(unixtime) {

  var u = new Date(unixtime * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var d = u.getDate();
  var m = months[u.getMonth()];
  var y = u.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
};



// console.log(unixDate(1581267795))

function todayDate(tw) {
  let d = new Date(tw * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[d.getDay()];
}

// console.log(todayDate(1581267795))


function unixTime(t) {
  var date = new Date(t * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  return strTime.toUpperCase();
}

// console.log(unixTime(1581234159));

const capitalize = (w) => {
  if (typeof w !== 'string') return ''
  return w.charAt(0).toUpperCase() + w.slice(1)
};