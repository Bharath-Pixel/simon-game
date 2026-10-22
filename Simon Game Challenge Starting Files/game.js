//game
var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var level = 0;

var gameTitle = document.querySelector('#level-title')


//user
var userClickedPattern = []
const buttonClicked = document.querySelectorAll('[type="button"]');

//adding the colours that user has clicked to an array (userClickedPattern)
if (buttonClicked) {
  for(i=0;i < buttonClicked.length; i++){
    buttonClicked[i].addEventListener("click", (event) => {
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        animatePress(event);
        checkAnswer(userClickedPattern.length-1)
        console.log(userClickedPattern);
    });
  };
} else {
    console.error("Could not find the buttonClicked element in the HTML!");
}

//for the flash effect
function triggerFlash(gamePatternColourId){
     gamePatternColourId.animate([
    { opacity: 1, backgroundColor: gamePatternColourId },
    { opacity: 0.2, backgroundColor: 'transparent' },
    { opacity: 1, backgroundColor: gamePatternColourId }
  ], {
    duration: 500, // Speed of one flash in milliseconds
    iterations: 1  // Number of times to flash
  });
}

function animatePress(currentColour){
  currentColour.target.classList.add("pressed");
      setTimeout(() => {
        currentColour.target.classList.remove("pressed");
    }, 100);
}

function nextSequence(){
  var randomChosenColour = buttonColours[Math.floor(Math.random() * buttonColours.length)]
  var gamePatternColour = document.getElementById(randomChosenColour);
  setTimeout(()=>{
    triggerFlash(gamePatternColour);  
  }, 1000)
  gamePattern.push(randomChosenColour);
  level++;
  gameTitle.textContent = `Level ${level} has started`
}

const keyboardPress=document.addEventListener("keydown", (event)=> {
  nextSequence()
  console.log(`Key pressed: ${event.key} | Code: ${event.code}`);
    if (event.key === 'Enter') {
        console.log('You pressed the Enter key!');
    }
},{once:true})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("success!")
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(()=>{
        nextSequence()
      }, 1000)
      userClickedPattern.length=0
      gamePattern.length=0
    }
  }
  else{
    gameTitle.textContent= `Game Over, Press Any Key to Restart`
    document.querySelector("body").classList.add("game-over")
    setTimeout(()=>{
      document.querySelector("body").classList.remove("game-over")
    }, 200)
    console.log("fail!")
    if (keyboardPress){
      startOver()
    }
  }
}


function startOver(){
  level = 0
  gamePattern.length = 0
}