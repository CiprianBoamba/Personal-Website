const crt = document.querySelector(".correct");
const incrt = document.querySelector(".incorrect");
const rndtext = document.querySelector(".randcolor");
const rndshape = document.querySelector(".rndshape");
var colors = ["yellow", "blue", "green", "red", "orange", "purple"];
var textColors = ["yellow", "blue", "green", "red", "orange", "purple"];
const startbtn = document.querySelector(".gamestart");
startbtn.addEventListener("click", start);
const countD = document.querySelector(".countDown");

crt.addEventListener("click", correct);
incrt.addEventListener("click", incorrect);
let totalpoints = 0;
let count = 0;
let color = "";
let txtcol = "";

function start() {
  count += 1;
  if (count == 11) {
    $('.modal').modal("show");
    $(".scorepoints").html(`You score: ${Math.floor(totalpoints/10*100) + String.fromCharCode(37)}`);
    let decision = (totalpoints <= 4) ? $(".modal-title").html("Oops !") : (totalpoints < 10) ? $(".modal-title").html("Good !") : $(".modal-title").html("Well Done !");
  };
  countD.innerHTML = 11 - count;

  // console.log(count)
  // console.log(totalpoints)
  color = colors[Math.floor(Math.random() * colors.length)];
  rndshape.classList = "rndshape square  d-flex justify-content-center align-items-center";
  rndshape.classList.add(color);

  txtcol = textColors[Math.floor(Math.random() * textColors.length)];
  rndtext.innerHTML = txtcol;
  $(".game").show();
  $(".startgame").hide();
  $(".image").hide();
  $("body").css("background-color", "#079992");

}

function correct() {
  if (txtcol == color) {
    totalpoints += 1;
  }
  start()
}

function incorrect() {
  if (txtcol !== color) {
    totalpoints += 1;
  }
  start()

}
$(".playagain").click(() => location.reload());