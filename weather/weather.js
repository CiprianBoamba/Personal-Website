const input = document.querySelector(".inputSearch");
const search = document.querySelector(".bSearch");
const form = document.querySelector("#search");
const gps = document.querySelector(".bGps");

gps.addEventListener("click", getLocation);
form.addEventListener("submit", checkInput);

function checkInput(e) {
  e.preventDefault();
  console.log(input.value)
  if (!input.value) {
    alert('type something');
  } else {
    getWeather(input.value);
  }
}

function getWeather(loc) {
  let location = document.querySelector(".location");
  let country = document.querySelector(".country");
  let time = document.querySelector(".time");
  let icon = document.querySelector(".w-icon");
  let current = document.querySelector(".current");
  let temperature = document.querySelector(".temperature");
  let feels = document.querySelector(".feels-like");
  let hum = document.querySelector(".humidity");
  let vis = document.querySelector(".visibility");
  let uv = document.querySelector(".uvindex");
  let desa = document.querySelector(".desapi");
  let winddeta = document.querySelector(".wind-details");
  let forecast = document.querySelector(".forecastDetails");
  let test = document.querySelector(".test");
  let datefore = document.querySelector(".datefore");
  fetch(
      `http://api.apixu.com/v1/forecast.json?key=a360df2d71ed4fadbe561545193005&q=${loc}&days=10&hour`
    )
    .then(data => {
      console.log(data);
      if (!data.ok) {
        throw Error(data.statusText)
      }

      return data.json()
    })
    .then(results => {
      console.log(results);
      let days = results.forecast.forecastday;
      location.textContent = results.location.name;
      country.textContent = results.location.country;
      time.textContent = `Local Time : ${formatDate(
    results.location.localtime
  )}`;
      icon.setAttribute("src", results.current.condition.icon);
      current.textContent = results.current.condition.text;
      temperature.textContent = results.current.temp_c;
      feels.textContent = results.current.feelslike_c;
      hum.textContent = results.current.humidity;
      vis.textContent = `${results.current.vis_km} km`;
      uv.textContent = results.current.uv;

      winddeta.textContent = ` Wind variable up to maximum ${
    results.current.wind_kph
  } kph, direction ${results.current.wind_dir}`;

      let forecastText = "";
      let output = "";
      days.splice(1).forEach(function (day) {
        console.log(day);
        output += `

    <div class="col-sm-4 my-3">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${day.date}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${
        day.day.condition.text
      }</h6>
      <p class="card-text">Temperature between ${day.day.mintemp_c} C and ${
      day.day.maxtemp_c
    } C .Sunrise at ${day.astro.sunrise} and sunset at ${
      day.astro.sunset
    }  </p>
    </div>
  </div>
  </div>
`;

      });
      test.innerHTML = output;
    })
    .catch(error => {
      console.log(error);
      if (error == "Error: Bad Request") {
        let ermsg = document.querySelector(".ermes");
        let outputem = "";
        outputem += `
      <div class="card">
       <div class="card-body">
           <p> City not found! </p> 
                    </div>
      </div>
            `;
        // console.log(outputem)
        ermsg.innerHTML = outputem;
      } else {
        alert("No Conection");
      }
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeather(`${lat},${lon}`);
}

function formatDate(d) {
  let date = new Date(d);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    "  " +
    strTime.toUpperCase()
  );
}
// console.log(search);

//http://api.apixu.com/v1/current.json?key=a360df2d71ed4fadbe561545193005&q=
//document.querySelector(".").textContent =results.;
//Today - Partly cloudy with a high of 78 °F (25.6 °C). Winds variable at 6 to 9 mph (9.7 to 14.5 kph).




// anime({
//   targets: 'div.anime-test',

//   duration: 4000,
//   left: '240px',

//   borderRadius: ['0%', '50%'],
//   easing: 'easeInOutQuad'

// });
anime({
  targets: 'div.anime-test',
  // translateX: {
  //   value: 250,
  //   duration: 800
  // },
  rotate: {
    value: 360,
    duration: 9900,
    easing: 'easeInOutSine'
  },
  // scale: {
  //   value: 2,
  //   duration: 1600,
  //   delay: 800,
  //   easing: 'easeInOutQuart'
  // },
  // delay: 250 // All properties except 'scale' inherit 250ms delay
});