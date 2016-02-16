var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update });

function preload ()
{
	game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
	game.load.image('start_button' , 'assets/images/start_50_50.png');
	game.load.image('background' , 'assets/images/migratingFlocks/background_640_520.png');

  //Importing game specific assets
    game.load.image('left' , 'assets/images/migratingFlocks/left.png');
    game.load.image('right' , 'assets/images/migratingFlocks/right.png');
    game.load.image('up' , 'assets/images/migratingFlocks/up.png');
    game.load.image('down' , 'assets/images/migratingFlocks/down.png');
    game.load.image('clouds' , 'assets/images/migratingFlocks/clouds.png');
    game.load.spritesheet('birds', 'assets/images/migratingFlocks/birdsSpriteOne_320_80.png', 80, 80, 4);
    //game.load.spritesheet('birdsTwo', 'assets/images/migratingFlocks/birdsSpriteTwo_320_80.png', 80, 80, 4);

    game.load.image('living' , 'assets/images/living_30_30.png');
	game.load.image('dead' , 'assets/images/dead_30_30.png');
	game.load.image('playPause' , 'assets/images/migratingFlocks/pause_30_30.png');

	game.load.image('replay' , 'assets/images/replay_100_100.png');



}
var left;
var right;
var up;
var right;
var playpause;

var startGame = 1;
var myscore;
var mylevel;


var score = 0;
var isCorrect = null;
var level = 1;
var life;
var livingState;
var lifeline = 3;

var startScreen;
var startButton;
var birdOne;
var birdTwo;
var birdThree;
var birdFour;
var birdFive;

var keyup;
var keyleft;
var keyright;
var keydown;
var pause;


function create()
{
	game.add.sprite(0 , 0 , 'background');
	var clouds = game.add.tileSprite(0,25,640,150,'clouds');
	clouds.autoScroll(5,0);
	clouds.alpha = 0.7;

	left = game.add.sprite(242 , 385 , 'left');
	left.inputEnabled = true;
	right = game.add.sprite(347,  385 , 'right');
	right.inputEnabled = true;
	up = game.add.sprite(294 , 340 , 'up');
	up.inputEnabled = true;
	down = game.add.sprite(294 , 430 , 'down');
	down.inputEnabled = true;

	playpause = game.add.sprite(595 , 475 , 'playPause');
	playpause.inputEnabled = true;
	ppText = game.add.text(460, 485 , 'Click here to Pause' , {font : "15px Arial" , fill : "#eceff1"});

	birdOne = game.add.sprite(294, 160, 'birds');
	birdTwo = game.add.sprite(374, 160, 'birds');
	birdThree = game.add.sprite(454, 160, 'birds');
	birdFour = game.add.sprite(374, 80, 'birds');
	birdFive = game.add.sprite(374,240, 'birds');





	livingState = game.add.group();
	for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 200 + p*35 , 'living');
	}



	timer = game.add.text(538, 19, '00:00:00' ,{font : "18px Arial" , fill : "#0097a7"});
	myscore = game.add.text(80-34, 19 , '000' , {font : "18px Arial" , fill : "#0097a7"});
  	mylevel = game.add.text(311, 19 , '01' , {font : "18px Arial" , fill : "#00bfa5"});

  	displayBirds();
         keyleft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
     keyright = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
     keyup = game.input.keyboard.addKey(Phaser.Keyboard.UP);
     keydown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
     pause= game.input.keyboard.addKey(Phaser.Keyboard.P);

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

function update ()
{
	updateTimer();

           game.input.enabled=true; 
   
        keyleft.onDown.add(answeredLeft,this);
        keyleft.onUp.add(updateBox);

        keyright.onDown.add(answeredRight,this);
        keyright.onUp.add(updateBox);

        keyup.onDown.add(answeredUp,this);
        keyup.onUp.add(updateBox); 

        keydown.onDown.add(answeredDown,this);
        keydown.onUp.add(updateBox);  
       
        pause.onUp.add(pauseAndPlay);

	up.events.onInputDown.add(answeredUp);
	up.events.onInputUp.add(updateBox);

	down.events.onInputDown.add(answeredDown);
	down.events.onInputUp.add(updateBox);

	left.events.onInputDown.add(answeredLeft);
	left.events.onInputUp.add(updateBox);

	right.events.onInputDown.add(answeredRight);
	right.events.onInputUp.add(updateBox);

	playpause.events.onInputUp.add(pauseAndPlay);
}
var answer = null;
function answeredUp()
{
	if(pauseState === 0)
	{
		answer = 3; //up = 3
	}
}
function answeredDown()
{
	if(pauseState === 0)
	{
		answer = 1; //Down = 1
	}
}
function answeredLeft()
{
	if(pauseState === 0)
	{
		answer = 0; //left = 0
	}
}
function answeredRight()
{
	if(pauseState === 0)
	{
		answer = 2; //Right = 2
	}
}

var timer;
var totalSeconds = 0;
var gameSeconds = 0;
var timePaused = 0;
var timeUpdateFlag = 1;
var pauseState = 0;
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
	if(pauseState === 0)
	{
		updateScore();
		displayBirds();
		if(!isCorrect)
	    {
	    if(lifeline === 2)
	      {
	        livingState.getAt(0).kill();
	        deadOne = game.add.sprite(7,200,'dead');
	      }
	      else if (lifeline === 1)
	      {
	        livingState.getAt(1).kill();
	        deadTwo = game.add.sprite(7,235,'dead');
	      }
	      else if (lifeline === 0)
	      {
	        livingState.getAt(2).kill();
	        game.add.sprite(7,270,'dead');
		 	gameOver();
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
	        playpause.inputEnabled = false;
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
	playpause.destroy();
	playpause = game.add.sprite(595 , 475 , 'playPause');
	playpause.inputEnabled = true;
          pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
	ppText = game.add.text(460, 485 , ' ' , {font : "15px Arial" , fill : "#eceff1"});

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
	displayBirds();
	document.getElementById("heading").innerHTML = headingContent;
	document.getElementById("scoreCard").innerHTML = instructionContent;

}

var displayScore;
function updateScore()
{

	if ((answer === 0) && (oddDirection === 0))
	{
		score += 25;
		isCorrect = 1;
	}
	else if((answer === 1) && (oddDirection === 1))
	{
		score += 25;
		isCorrect = 1;
	}
	else if((answer === 2) && (oddDirection === 2))
	{
		score += 25;
		isCorrect = 1;
	}
	else if((answer === 3) && (oddDirection === 3))
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
		life = livingState.create(7 , 200 + p*35 , 'living');
	}
}
var oddDirection;
function displayBirds()
{
	var commonDirection = game.rnd.integerInRange(1,100) % 4;
	oddDirection = game.rnd.integerInRange(1,100) % 4;
	var randomBird = game.rnd.integerInRange(1,100) % 5;
	if(randomBird === 0)
	{
		birdOne.frame = oddDirection;
		birdTwo.frame = commonDirection;
		birdThree.frame = commonDirection;
		birdFour.frame = commonDirection;
		birdFive.frame = commonDirection;
	}
	else if(randomBird === 1)
	{
		birdOne.frame = commonDirection;
		birdTwo.frame = oddDirection;
		birdThree.frame = commonDirection;
		birdFour.frame = commonDirection;
		birdFive.frame = commonDirection;
	}
	else if(randomBird === 2)
	{
		birdOne.frame = commonDirection;
		birdTwo.frame = commonDirection;
		birdThree.frame = oddDirection;
		birdFour.frame = commonDirection;
		birdFive.frame = commonDirection;
	}
	else if(randomBird === 3)
	{
		birdOne.frame = commonDirection;
		birdTwo.frame = commonDirection;
		birdThree.frame = commonDirection;
		birdFour.frame = oddDirection;
		birdFive.frame = commonDirection;
	}
	else if(randomBird === 4)
	{
		birdOne.frame = commonDirection;
		birdTwo.frame = commonDirection;
		birdThree.frame = commonDirection;
		birdFour.frame = commonDirection;
		birdFive.frame = oddDirection;
	}

}





function pauseAndPlay()
{
	if(pauseState  === 0)
	{
		pauseState = 1;
		ppText.setText('Game Paused');
		birdOne.alpha = 0;
		birdTwo.alpha = 0;
		birdThree.alpha = 0;
		birdFour.alpha = 0;
		birdFive.alpha = 0;

	}
	else
	{
		pauseState = 0;
		ppText.setText('Click here to Pause');
		birdOne.alpha = 1;
		birdTwo.alpha = 1;
		birdThree.alpha = 1;
		birdFour.alpha = 1;
		birdFive.alpha = 1;
		displayBirds();
	}
}
function finishGame()
{
	gameOver();
}
