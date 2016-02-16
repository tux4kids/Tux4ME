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
  game.load.image('background' , 'assets/images/highClick/background_640_520_2.jpg');
  game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
  game.load.image('start_button' , 'assets/images/start_50_50.png');
  game.load.image('pause' , 'assets/images/highClick/pause_30_30.png');
  game.load.image('equals', 'assets/images/highClick/equal_130_90.png' );
  game.load.image('living' , 'assets/images/highClick/living_30_30.png');
  game.load.image('dead' , 'assets/images/highClick/dead_30_30.png');
  game.load.image('plus' , 'assets/images/highClick/plus_50_50.png');
  game.load.image('minus' , 'assets/images/highClick/minus_50_50.png');
  game.load.image('multiply' , 'assets/images/highClick/multiply_50_50.png');
  game.load.image('divide' , 'assets/images/highClick/divide_50_50.png');

  //game.load.image('happy' , 'assets/images/highClick/happy_75_75.png');
  //game.load.image('sad' , 'assets/images/highClick/sad_75_75.png');
  game.load.image('replay' , 'assets/images/replay_100_100.png');

  //Load the Google WebFont Loader script
  game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}
var boxOneText;
var boxTwoText;
var boxThreeText;

var pauseState = 0;
var level = 1;
var livingState; //create
var life;

var score = 0;
var isCorrect = null;
var lifeline = 3;
var play;
var pause;
var tempText;
var mylevel;
var myscore;
var startScreen;
var startButton;

var plus;
var minus;
var multiply;
var divide;


var pluskey;
var minuskey;
var multiplykey;
var dividekey;
var pausekey;

function create()
{
  game.add.sprite(0 , 0 , 'background');
  livingState = game.add.group();
  for(var p = 0 ; p < 3 ; p++)
  {
    life = livingState.create(27 , 180 + p*38 , 'living');
  }

  tempText = game.add.text(470, 470 , ' ' , {font : "15px Arial" , fill : "#eceff1"});
  pause = game.add.sprite(575,455,'pause');
  pause.inputEnabled = true;
  myscore = game.add.text(80, 43 , '000' , {font : "15px Arial" , fill : "#eceff1"});
  mylevel = game.add.text(311, 43 , '01' , {font : "15px Arial" , fill : "#eceff1"});
  timer = game.add.text(515, 43, '00:00:00' ,{font : "15px Arial" , fill : "#eceff1"});

  plus = game.add.sprite(150 , 350 , 'plus');
  minus = game.add.sprite(250 , 350 , 'minus');
  multiply = game.add.sprite(350 , 350 , 'multiply');
  divide = game.add.sprite(450 , 350 , 'divide');

  plus.inputEnabled = true;
  minus.inputEnabled = true;
  multiply.inputEnabled = true;
  divide.inputEnabled = true;

  
 minuskey = game.input.keyboard.addKey(Phaser.Keyboard.S);
 pluskey =  game.input.keyboard.addKey(Phaser.Keyboard.A);
  dividekey = game.input.keyboard.addKey(Phaser.Keyboard.D);
  multiplykey = game.input.keyboard.addKey(Phaser.Keyboard.M);
  pausekey = game.input.keyboard.addKey(Phaser.Keyboard.P);

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

 function createText()
{

  boxOneText = game.add.text(100, 220,'88',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 120, align: "center" });
  boxOneText.font = 'Architects Daughter';
  boxOneText.fontSize = '50px';

  var tempText = game.add.text(200, 220,'\"_\"',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 120, align: "center" });
  tempText.font = 'Architects Daughter';
  tempText.fontSize = '50px';


  boxTwoText = game.add.text(300, 220,'88',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 120, align: "center" });
  boxTwoText.font = 'Architects Daughter';
  boxTwoText.fontSize = '50px';

  var tempText = game.add.text(400, 220,' = ',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 120, align: "center" });
  tempText.font = 'Architects Daughter';
  tempText.fontSize = '50px';

  boxThreeText = game.add.text(500, 220,'88',{ font: "20px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 120, align: "center" });
  boxThreeText.font = 'Architects Daughter';
  boxThreeText.fontSize = '50px';

  displayNumbers();

}

function update()
{
  	updateTimer();

         game.input.enabled=true; 

        pluskey.onDown.add(answeredPlus,this);
        pluskey.onUp.add(updateBox);

        minuskey.onDown.add(answeredMinus,this);
        minuskey.onUp.add(updateBox);


        dividekey.onDown.add(answeredDivide,this);
        dividekey.onUp.add(updateBox);

        multiplykey.onDown.add(answeredMultiply,this);
        multiplykey.onUp.add(updateBox);
 
  	plus.events.onInputDown.add(answeredPlus);
	plus.events.onInputUp.add(updateBox);

	minus.events.onInputDown.add(answeredMinus);
	minus.events.onInputUp.add(updateBox);

	multiply.events.onInputDown.add(answeredMultiply);
	multiply.events.onInputUp.add(updateBox);

	divide.events.onInputDown.add(answeredDivide);
	divide.events.onInputUp.add(updateBox);

        pausekey.onUp.add(pauseAndPlay,this);   
  	pause.events.onInputUp.add(pauseAndPlay);
}
var answer = null;
function answeredPlus()
{
	if(pauseState === 0)
	{
		answer = 0;
	}
}
function answeredMinus()
{
	if(pauseState === 0)
	{
		answer = 1;
	}
}

function answeredMultiply()
{
	if(pauseState === 0)
	{
		answer = 2;
	}
}
function answeredDivide()
{
	if(pauseState === 0)
	{
		answer = 3;
	}
}

var deadOne;
var deadTwo;

function updateBox()
{
  if (pauseState === 0)
  {
    //love.kill();
    updateScore();
    displayNumbers();
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

	var cummulativeIndex = Math.floor((score/gameSeconds) * (60/500) * 100);
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

  if((answer === 0)&&(randomChoice === 0))
    {
      score+=25;
      isCorrect = 1;
    }
    else if((answer === 1)&&(randomChoice === 1))
    {
      score+=25;
      isCorrect = 1;
    }
    else if((answer === 2)&&(randomChoice === 2))
    {
      score+=25;
      isCorrect = 1;
    }
    else if((answer === 3)&&(randomChoice === 3))
    {
      score+=25;
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
  mylevel.setText('0'+level);
  if(levelFlag !== level)
  {
    updateLife();
  }
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
var randomChoice;
function displayNumbers()
{
	var num = (game.rnd.integerInRange(1,100)% (5*level)) + 5;
	boxThreeText.setText(num);
	randomChoice = game.rnd.integerInRange(1,100)% 4;
	var tempOne;
	var tempTwo;
	//randomChoice = 3; //use this check individual operation
	if(randomChoice === 0)
	{
		var randomAdd = game.rnd.integerInRange(1,100)% 4;
		if(randomAdd === 0)
		{
			tempOne = Math.floor(num/2);
	      	tempTwo = num - tempOne;
	      	boxOneText.setText(tempOne);
	      	boxTwoText.setText(tempTwo);
		}
		else if(randomAdd === 1) //in terms of num/3 + (num - num/3)
    	{
	      	tempOne = Math.floor(num/3);
	      	tempTwo = num - tempOne;
	     	boxOneText.setText(tempOne);
	      	boxTwoText.setText(tempTwo);
		}
		else if(randomAdd === 2)
    	{
      		tempOne = Math.floor(num/4);
      		tempTwo = num - tempOne;
      		boxOneText.setText(tempOne);
	      	boxTwoText.setText(tempTwo);
  		}
  		else
    	{
      		tempOne = Math.floor(num/5);
      		tempTwo = num - tempOne;
      		boxOneText.setText(tempOne);
	      	boxTwoText.setText(tempTwo);
  		}
    }
    else if(randomChoice === 1)//subtraction
	{
	    var randomSub = game.rnd.integerInRange(1,100)% 3;
	    if(randomSub === 0)
	    {
	      tempOne = num * 2;
	      tempTwo = tempOne - num;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText(tempTwo);
	    }
	    else if(randomSub === 1)
	    {
	      tempOne = num * 3;
	      tempTwo = tempOne - num;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText(tempTwo);
	    }
	    else
	    {
	      tempOne = num * 4;
	      tempTwo = tempOne - num;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText(tempTwo);
		}
  	}
  	else if(randomChoice === 2)//Multiplication
	{
	    //var randomMul = game.rnd.integerInRange(1,100)% 4;
	    if(num % 7 === 0)
	    {
	      tempOne = num/7;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText('7');
	    }
	    else if(num % 5 === 0)
	    {
	      tempOne = num/5;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText('5');
	    }
	    else if(num % 3 === 0)
	    {
	      tempOne = num/3;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText('3');
	    }
	    else if(num % 2 === 0)
	    {
	      tempOne = num/2;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText('2');
	    }
	    else
	    {
	    	tempOne = num/1;
	    	boxOneText.setText(tempOne);
	      	boxTwoText.setText('1');
	    }
	}
	else //Division
	{
	    var randomDiv = game.rnd.integerInRange(1,100)% 2 ;
	    if(randomDiv === 0)
	    {
	      tempOne = num*2;
	      boxOneText.setText(tempOne);
	      boxTwoText.setText('2');
	    }
	    else
	    {
	      tempOne = num*5;
	     boxOneText.setText(tempOne);
	      boxTwoText.setText('5');
	    }
	}
}

function pauseAndPlay()
{
  if(pauseState  === 0)
  {
    pauseState = 1;
    tempText.setText('Game Paused');
    boxTwoText.setText('00');
    boxOneText.setText('00');
    boxThreeText.setText('00');
  }
  else
  {
    tempText.setText(' ');
    pauseState = 0;
    displayNumbers();
  }
}
function finishGame()
{
	gameOver();
}
/*
* Tux4ME is developed under Google summer of code - 2015.
* 10 games using Phaser and a Web app using Polymer has been completed by August,21 2015.
* Any changes made to this project after this period is by self-interest and the same will
NOT be included in the submission to Google summer of code team.
*/
