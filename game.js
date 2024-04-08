var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").on("click", handlerFunction);

if (gameStarted === false) {
    $(document).on("keypress", function() {
        gameStarted = true;
        newSequence();
    });}

function newSequence() {

    $("#level-title").text( "Level: " + (++level) );
    userClickedPattern = [];

    var randNum = Math.floor(Math.random()*4);
    var randChosenColor = buttonColors[randNum];
    gamePattern.push(randChosenColor);
    
    $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randChosenColor);

}

function handlerFunction() {

    var userChosenColor = $(this).attr("id");

    animatePress(userChosenColor);

    playSound(userChosenColor);

    userClickedPattern.push(userChosenColor);
    
    checkAnswer();

}

function checkAnswer() {

    var recentClick = userClickedPattern.length -1;
    if (userClickedPattern[recentClick] === gamePattern[recentClick]) {
        console.log("success");

        if (level === userClickedPattern.length) {
            setTimeout(newSequence, 1000);}

    } else {
        console.log("failed");
        gameOver();
    }

}

function gameOver() {
    
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200)
    level = 0;
    $("#level-title").text("GAME OVER!! Press any key to Restart...");
    gamePattern = [];
    gameStarted = false;
}

function animatePress(pressedColor) {
    $("#" + pressedColor).addClass("pressed");
    setTimeout(function() {
        $("#" + pressedColor).removeClass("pressed");
    }, 200);
}

function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");  
    audio.play();
}
