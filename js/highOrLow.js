var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update });

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    //  The Google Fonts we want to load.
    google: { families: [ 'Architects+Daughter::latin' ] }
};

function preload()
{
  //Importing the asset(s) required for the game
  game.load.image('background' , 'assets/images/highClick/background_640_520.jpg');
  game.load.image('play' , 'assets/images/highClick/play_30_30.png');
  game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
  game.load.image('start_button' , 'assets/images/start_50_50.png');
  game.load.image('start' , 'assets/images/highClick/start_50_50.png');

  game.load.image('pause' , 'assets/images/highClick/pause_30_30.png');
  game.load.image('box', 'assets/images/highClick/displaybox_130_130.png' );
  game.load.image('greater', 'assets/images/highClick/greaterThan_130_90.png' );
  game.load.image('lesser', 'assets/images/highClick/lessThan_130_90.png' );
  game.load.image('replay' , 'assets/images/replay_100_100.png');

  game.load.image('living' , 'assets/images/highClick/living_30_30.png');
  game.load.image('dead' , 'assets/images/highClick/dead_30_30.png');
  //game.load.image('happy' , 'assets/images/highClick/happy_75_75.png');
  //game.load.image('sad' , 'assets/images/highClick/sad_75_75.png');
  //Load the Google WebFont Loader script
  game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}
var pauseState = 0;
var level = 1;
var livingState; //create
var life; //create
var block; //create
var greater;
var lesser;
var score = 0;
var isCorrect = null;
var lifeline = 3;
var play;
var pause;
var boxText;
var mylevel;
var myscore;
var startScreen;
var startButton;
var previous = 0;
var present;
var start;


//var startkey;
//var keyup;
//var keydown;
var pausekey;
function create()
{
  game.add.sprite(0 , 0 , 'background');
    livingState = game.add.group();
    for(var p = 0 ; p < 3 ; p++)
    {
      life = livingState.create(27 , 180 + p*38 , 'living');
    }

    block = game.add.sprite(255,165,'box');

    greater = game.add.sprite(220,360,'greater');
    greater.inputEnabled = true;
    greater.scale.setTo(0.5,0.5);
    greater.alpha = 0;

    start = game.add.sprite(295,360,'start');
    start.inputEnabled = true;




    lesser = game.add.sprite(360,360,'lesser');
    lesser.inputEnabled = true;
    lesser.scale.setTo(0.5,0.5);
    lesser.alpha = 0;


    tempText = game.add.text(470, 470 , ' ' , {font : "15px Arial" , fill : "#eceff1"});

    pause = game.add.sprite(575,455,'pause');
    pause.inputEnabled = true;
    myscore = game.add.text(80, 43 , '000' , {font : "15px Arial" , fill : "#eceff1"});
    mylevel = game.add.text(311, 43 , '01' , {font : "15px Arial" , fill : "#eceff1"});
    timer = game.add.text(515, 43, '00:00:00' ,{font : "15px Arial" , fill : "#eceff1"});

    start.events.onInputUp.add(initialize);
    //startkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    //keyup = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    //keydown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    //startkey.onUp.add(initialize,this);
    pausekey=game.input.keyboard.addKey(Phaser.Keyboard.P);

    startScreen=game.add.sprite(0,0,'start_screen');
    startButton=game.add.sprite(560,465,'start_button');
    startButton.inputEnabled = true;
    startButton.events.onInputUp.add(startingGame);
}
function startingGame()
{
  startScreen.destroy();
  startButton.destroy();
  startGame = 1;
  game.time.reset();
}
function initialize()
{
  displayNumber();
  start.destroy();
  game.add.tween(greater).to({ alpha : 1}, 500, Phaser.Easing.Linear.easeInOut, true);

  game.add.tween(lesser).to({ alpha : 1}, 500, Phaser.Easing.Linear.easeInOut, true);
}
function createText()
{
    boxText = game.add.text(0, 0,'0',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 120, align: "center" });
    boxText.x = Math.floor(block.x + block.width/2);
    boxText.y = Math.floor(block.y + block.height/2);
    boxText.anchor.set(0.5,0.35);
    boxText.font = 'Architects Daughter';
}

function update()
{
 updateTimer();
  
   game.input.enabled=true; 

   //keyup.onDown.add(answeredUp,this);
   //keyup.onUp.add(updateBox);

   //keydown.onDown.add(answeredDown,this);
   //keydown.onUp.add(updateBox);

  greater.events.onInputDown.add(answeredUp);
  lesser.events.onInputDown.add(answeredDown);

  greater.events.onInputUp.add(updateBox);
  lesser.events.onInputUp.add(updateBox);

   pausekey.onUp.add(pauseAndPlay,this);
  pause.events.onInputUp.add(pauseAndPlay);
}
var answer = null;
function answeredUp()
{
  if(pauseState === 0)
  {
    answer = 1;
  }
}
function answeredDown()
{
  if(pauseState === 0)
  {
    answer = 0;
  }
}
var timer;
var totalSeconds = 0;
var gameSeconds = 0;
var timePaused = 0;
var timeUpdateFlag = 1;
var startGame = 0;
var timeText;
// The userdefined function to update the timer.
function updateTimer()
{
  if(startGame === 1)
  {
  //To find and display the elapsed time.
  if(pauseState === 0)
  {
    if(timeUpdateFlag === 0)
    {
      timeUpdateFlag = 1;
      timePaused = timePaused + (Math.floor(game.time.totalElapsedSeconds())-totalSeconds);
    }
    totalSeconds=Math.floor(game.time.totalElapsedSeconds());
    gameSeconds = totalSeconds - timePaused;
    var minutes = Math.floor(gameSeconds / 60);
    var hours = Math.floor(minutes/60);
    var modmin = minutes%60;
    if (modmin < 10)
    {
      modmin = '0' + modmin;
    }
    var modsec = gameSeconds % 60;
    if (modsec < 10)
    {
      modsec = '0' + modsec;
    }
    //Hour display in two digits ! will be like 002.
    timeText = '0'+hours+':'+modmin+ ':' + modsec ;
    timer.setText(timeText);
  }
  else
  {
    timeUpdateFlag = 0
  }
  if(gameSeconds > 59)
    {
			if(finishFlag === 0)
	    	{
	    		document.getElementById("finishButtonArea").innerHTML = '<paper-ripple></paper-ripple><paper-button raised style="color:#e91e63" onclick="finishGame()">Click here to finish the game</paper-button>';
	    		finishFlag = 1;
	    	}
  	}
	}
}
var finishFlag = 0;
var deadOne;
var deadTwo;
function updateBox()
{
  if (pauseState === 0)
  {
    //love.kill();
    updateScore();
    displayNumber();
    if(isCorrect)
    {
      //love = game.add.sprite(535, 350 , 'happy');
    }
    else
    {
      //love = game.add.sprite(535, 350 , 'sad');
    if(lifeline === 2)
      {
        livingState.getAt(0).kill();
        deadOne = game.add.sprite(27,180,'dead');
      }
      else if (lifeline === 1)
      {
        livingState.getAt(1).kill();
        deadTwo = game.add.sprite(27,218,'dead');
      }
      else if (lifeline === 0)
      {

        livingState.getAt(2).kill();
        game.add.sprite(27,256,'dead');
        gameOver();
        //var TuxMathAd = game.add.text(246, 327 , '\"Try TuxMath :D  !\"', {font : "17px Arial" , fill : "#ffffff"});

      }
    }
  }
}
var destroy
var replay;
var headingContent;
var instructionContent;
function gameOver()
{
	document.getElementById("finishButtonArea").innerHTML = '';
        pauseState = 1;
        pause.inputEnabled = false;
  game.input.keyboard.removeKey(Phaser.Keyboard.P); 
        destroy = game.add.text(272, 305 , 'Game Over !' , {font : "17px Arial" , fill : "#ec407a"});

  var cummulativeIndex = Math.floor((score/gameSeconds) * (60/750) * 100);
  if(cummulativeIndex > 100)
    cummulativeIndex = 100;
  headingContent = document.getElementById("heading").innerHTML;
  instructionContent = document.getElementById("scoreCard").innerHTML;
  document.getElementById("heading").innerHTML = "<div flex><iron-icon style='color:white' icon='loyalty'></iron-icon><div flex>Score card</div></div>"
  document.getElementById("scoreCard").innerHTML = "<paper-menu><paper-item flex style='position: relative'><paper-ripple style='color: #e91e63'></paper-ripple><iron-icon style='color:#d81b60' icon='flag'></iron-icon><span></span>Score<iron-icon icon='chevron-right'></iron-icon>" + displayScore + "</paper-item><paper-item flex style='position: relative'><paper-ripple style='color: #e91e63'></paper-ripple><iron-icon style='color:#d81b60' icon='alarm-on'></iron-icon><span></span>Time Taken<iron-icon icon='chevron-right'></iron-icon>"+ timeText +"</paper-item><paper-item flex style='position: relative'><paper-ripple style='color: #e91e63'></paper-ripple><iron-icon style='color:#d81b60' icon='thumb-up'></iron-icon><span></span>Game wise cummulative index<iron-icon icon='chevron-right'></iron-icon>"+ cummulativeIndex +"</paper-item><paper-item flex style='position: relative'><paper-ripple style='color: #e91e63'></paper-ripple><iron-icon style='color:#d81b60' icon='redo'></iron-icon><span></span>Click on the Replay button to play again</paper-item><paper-item><img src='assets/images/penguin.jpg'></img><img src='assets/images/PenguinWords.png'></img></paper-item></paper-menu>" ;

  replay = game.add.sprite(game.world.centerX, game.world.centerY, 'replay');
  replay.anchor.set(0.5);
    startGame = 0;
  replay.inputEnabled = true;
  replay.events.onInputUp.add(replayGame);
}

function replayGame()
{
  pause.destroy();
  pause = game.add.sprite(575,455,'pause');
  pause.inputEnabled = true;
   pausekey = game.input.keyboard.addKey(Phaser.Keyboard.P);
  tempText = game.add.text(470, 470 , ' ' , {font : "15px Arial" , fill : "#eceff1"});
  pauseState = 1;
  pauseAndPlay();
  score = 0;
  displayScore = 0;
  myscore.setText('000');
  timer.setText('00:00:00');
  totalSeconds = 0;
  gameSeconds = 0;
  timePaused = 0;

  //playpause.inputEnabled = true;
  //timeText = null;
  startGame = 1;
  finishFlag = 0;
  game.time.reset();
  destroy.setText(" ");

  replay.inputEnabled = false;
  replay.destroy();
  updateLife();
  //displayBirds();
  document.getElementById("heading").innerHTML = headingContent;
  document.getElementById("scoreCard").innerHTML = instructionContent;

}

var displayScore;

function updateScore()
{

  if (answer && (previous < present))
  {
    score += 25;
    isCorrect = 1;
  }
  else if(!answer && (previous > present))
  {
    score += 25;
    isCorrect = 1;
  }
  else
  {
    isCorrect = 0;
    lifeline--;
  }

  if (score < 100)
  {
    displayScore = '00' + score;
  }
  else if (score < 1000)
  {
    displayScore = '0' + score;
  }
  else
  {
    displayScore = score;
  }
  myscore.setText(displayScore);
  updateLevel();
}
function updateLevel()
{
  var levelFlag = level;
  level = Math.floor(score/250) + 1;
  if(level < 10)
  {
    mylevel.setText('0'+level);
  }
  else
  {
    mylevel.setText(level);
  }
  if (levelFlag != level)
  updateLife();
}
function updateLife()
{

  if (lifeline === 3)
  {
    livingState.getAt(0).kill();
    livingState.getAt(1).kill();
    livingState.getAt(2).kill();
  }
  else if (lifeline === 2)
  {
    livingState.getAt(1).kill();
    livingState.getAt(2).kill();
    deadOne.kill();
  }
  else if(lifeline === 1)
  {
    livingState.getAt(2).kill();
    deadOne.kill();
    deadTwo.kill();
  }
  //Now update the lifelines and bring it back again. :)
  lifeline = 3;
  livingState = game.add.group();
  for(var p = 0 ; p < 3 ; p++)
    {
      life = livingState.create(27 , 180 + p*38 , 'living');
    }
}
var flag = 0;
function displayNumber()
{

  if(flag === 0)
  {
    flag = 1;
  }
  else
  {
    previous = present;
  }

  present = game.rnd.integerInRange(1,1000) % 100*level;
  if(present === previous)
  {
    present++;
  }
  boxText.setText(present);
  boxText.alpha = 0;
  game.add.tween(boxText).to({ alpha : 1},200, Phaser.Easing.Linear.easeInOut, true);


}
function pauseAndPlay()
{
  if(pauseState  === 0)
  {
    pauseState = 1;
    tempText.setText('Game Paused');

    //block.scale.setTo(0.5,0.5);
  }
  else
  {
    tempText.setText(' ');
    pauseState = 0;

  }
}
function finishGame()
{
	gameOver();
}
