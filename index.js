
var buttonClrs=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var gameStarted=false;
var level=0;



$(document).keypress(function(){
  if(!gameStarted){
    $("#level-title").text("level "+ level);
    nextSequence();
    gameStarted=true;
  }

});



$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});



function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  } else{

    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over ! click any key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }

}


function nextSequence(){
  userClickedPattern = [];
  level++;

  $("#level-title").text("level "+ level);


  var randomNum=Math.floor(Math.random()*4);
  var randomChosenClr=buttonClrs[randomNum];
  gamePattern.push(randomChosenClr);

  $("#"+randomChosenClr).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenClr);


}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    },100);
  };


function playSound(name){
    var sound1=new Audio("sounds/"+name+".mp3");
    sound1.play();
}


function startOver(){
  level=0;
  gameStarted=false;
  gamePattern=[];

}
