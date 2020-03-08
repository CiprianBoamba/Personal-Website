//---- HEADER Animations ----


var tl = new TimelineMax();
tl.from(".nameh", 1, {
  y: -60,
  opacity: 0,
  ease: "sine.out"
})
tl.from("#boy", 0.8, {
  x: 120,
  opacity: 0,
  ease: "sine.out"
}, "-=.5")
tl.from(".jobh", 1, {
  opacity: 0,
  y: -80,
  ease: "power4.out",
}, "-=.5")
tl.from("#laptop", 1, {
  opacity: 0,
  x: 200,
  ease: "power4.out"
}, "-=.6")
tl.from(".contacth", 1, {
  opacity: 0,
  y: 200,
  ease: "bounce.out"
}, "-=.8")
tl.from("#cube-3", 1, {
  opacity: 0,
  y: -200,
  ease: "bounce.out"
}, "-=1")
tl.from(".linkedinh", 1, {
  opacity: 0,
  y: 200,
  ease: "bounce.out"
}, "-=.8")
tl.from("#cube-2", 1, {
  opacity: 0,
  y: -200,
  ease: "bounce.out"
}, "-=1")
tl.from(".gith", 1, {
  opacity: 0,
  y: 200,
  ease: "bounce.out"
}, "-=.8")
tl.from("#cube-1", 1, {
  opacity: 0,
  y: -230,
  ease: "bounce.out"
}, "-=1")

var headerAnim = new TimelineMax();
const controllerHeader = new ScrollMagic.Controller();

headerAnim.to(".cH", 0.6, {
  opacity: 0,
})

const sceneHeader = new ScrollMagic.Scene({
    triggerElement: ".cH",
    triggerHook: "onLeave",
    offset: 50,
    duration: "50%"
  })
  .setTween(headerAnim)
  .addTo(controllerHeader);






//---- ABOUT ME Animation ----


var abtme = new TimelineMax();
const controllerAbt = new ScrollMagic.Controller();

abtme.from(".anime2", 1, {
  opacity: 0,
  stagger: .6,
  y: -80,
  ease: "sine.out"
})
abtme.from(".img-aboutme", 1, {
  opacity: 0,
  x: -80,
  ease: "sine.out"
}, "-=.6")

abtme.from(".Abtbtn", 1, {
  opacity: 0,
  ease: "power3.out"
}, "-=.4")

const sceneAbt = new ScrollMagic.Scene({
    triggerElement: "#aboutMe",
    triggerHook: 0.5,
    reverse: false
  })

  .setTween(abtme)
  .addTo(controllerAbt);







// ---- PROJECTS Animation ---- 
var tlproject1 = new TimelineMax();

const projectController1 = new ScrollMagic.Controller();

tlproject1.from(".projects-title", 1, {
  opacity: 0,
  y: -80,
  ease: "sine.out"
})
tlproject1.from(".myWeather", 1, {
  opacity: 0,
  y: -100,
  ease: "sine.out"
}, "-=.8")

const sceneProject1 = new ScrollMagic.Scene({
    triggerElement: "#projects",
    triggerHook: 0.5,
    reverse: false
  })

  .setTween(tlproject1)
  .addTo(projectController1);


var tlproject2 = new TimelineMax();

const projectController2 = new ScrollMagic.Controller();

tlproject2.from(".myGame", 1, {
  opacity: 0,
  y: -100,
  ease: "sine.out"
})
const sceneProject12 = new ScrollMagic.Scene({
    triggerElement: ".myWeather",
    triggerHook: 0,
    reverse: false
  })

  .setTween(tlproject2)
  .addTo(projectController2);





// ---- Contact Me Animation ---- 

var tlcontactMe = new TimelineMax();

const contactmeController = new ScrollMagic.Controller();


tlcontactMe.from(".imageC", .9, {
  opacity: 0,
  x: 80,
})
tlcontactMe.from(".msgAnime3", .7, {
  opacity: 0,
  x: -60,
}, "-=.6")
tlcontactMe.from(".cntAnime1", .7, {
  opacity: 0,
  y: 40,
  ease: "sine.out"
}, "-=.6")
tlcontactMe.from(".cntAnime2", .7, {
  opacity: 0,
  y: 40,
}, "-=.6")

tlcontactMe.from(".emailAnime4", .7, {
  opacity: 0,
  y: -40,
}, "-=.7")
tlcontactMe.from(".btncon", .7, {
  opacity: 0,
  y: -40,
}, "-=.6")

const sceneContactMe = new ScrollMagic.Scene({
    triggerElement: ".contactme",
    triggerHook: "onEnter",
  })
  .setTween(tlcontactMe)
  .addTo(contactmeController);








// ---- navbar animations smooth ---- 

$(document).ready(function () {
  $(".scrollTest").on('click', function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top
      }, 1000, function () {
        window.location.hash = hash;
      });
    }
  });
});