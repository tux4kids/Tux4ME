var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update });

function preload ()
{
	game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
	game.load.image('start_button' , 'assets/images/start_50_50.png');

	game.load.image('background' , 'assets/images/CatchTheFlow/background_640_520.png');

	game.load.image('left' , 'assets/images/CatchTheFlow/left_50_50.png');
	game.load.image('right' , 'assets/images/CatchTheFlow/right_50_50.png');
	game.load.image('up' , 'assets/images/CatchTheFlow/up_50_50.png');
	game.load.image('down' , 'assets/images/CatchTheFlow/down_50_50.png');

	game.load.spritesheet('downBrown', 'assets/images/CatchTheFlow/down_brown_400_50.png', 50, 50, 8);
	game.load.spritesheet('upBrown', 'assets/images/CatchTheFlow/up_brown_400_50.png', 50, 50, 8);
	game.load.spritesheet('downGreen', 'assets/images/CatchTheFlow/down_green_400_50.png', 50, 50, 8);
	game.load.spritesheet('upGreen', 'assets/images/CatchTheFlow/up_green_400_50.png', 50, 50, 8);

	game.load.spritesheet('rightBrown', 'assets/images/CatchTheFlow/right_brown_420_50.png', 60, 50, 7);
	game.load.spritesheet('leftBrown', 'assets/images/CatchTheFlow/left_brown_420_50.png', 60, 50, 7);
	game.load.spritesheet('rightGreen', 'assets/images/CatchTheFlow/right_green_420_50.png', 60, 50, 7);
	game.load.spritesheet('leftGreen', 'assets/images/CatchTheFlow/left_green_420_50.png', 60, 50, 7);


    game.load.image('living' , 'assets/images/living_30_30.png');
	game.load.image('dead' , 'assets/images/dead_30_30.png');
	game.load.image('playPause' , 'assets/images/CatchTheFlow/playpause_50_50.png');
	game.load.image('replay' , 'assets/images/replay_100_100.png');
}

var left;
var right;
var up;
var right;
var playpause;

var startGame =0;
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

var keyleft;
var keyright;
var keyup;
var keydown;
var pause;

function create()
{
	game.add.sprite(0 , 0 , 'background');

	left = game.add.sprite(242 , 385 , 'left');
	left.inputEnabled = true;
	right = game.add.sprite(347,  385 , 'right');
	right.inputEnabled = true;
	up = game.add.sprite(294 , 340 , 'up');
	up.inputEnabled = true;
	down = game.add.sprite(294 , 430 , 'down');
	down.inputEnabled = true;

	playpause = game.add.sprite(585 , 465 , 'playPause');
	playpause.inputEnabled = true;
	ppText = game.add.text(480, 495 , ' ' , {font : "15px Arial" , fill : "#eceff1"});
	ppText.setText('Pause game ');

	livingState = game.add.group();
	for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 200 + p*35 , 'living');
	}

	timer = game.add.text(550, 19, '00:00:00' ,{font : "18px Arial" , fill : "#ffffff"});
	myscore = game.add.text(80-34, 19 , '000' , {font : "18px Arial" , fill : "#ffffff"});
  	mylevel = game.add.text(308, 19 , '01' , {font : "18px Arial" , fill : "#ffffff"});

        
     keyleft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
     
     keyright = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
     
     keyup = game.input.keyboard.addKey(Phaser.Keyboard.UP);
     
     keydown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
     
     pause= game.input.keyboard.addKey(Phaser.Keyboard.P);
  	//leftGreen = game.add.tileSprite(100,100,440,200,'leftGreen');
  	//leftGreen.autoScroll(-40,0);
  	displayLeaves();

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

function update()
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
		leaf.destroy();
		displayLeaves();
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

	leaf.destroy();
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
	ppText.setText(' ');
	playpause.destroy();
	playpause = game.add.sprite(585 , 465 , 'playPause');
	playpause.inputEnabled = true;
         pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
	ppText = game.add.text(480, 495 , ' ' , {font : "15px Arial" , fill : "#eceff1"});

	pauseState = 1;
	pauseAndPlay();
	score = 0;
	displayScore = 0;
	myscore.setText('000');
	timer.setText('00:00:00');
	mylevel.setText('01');
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
	displayLeaves();
	document.getElementById("heading").innerHTML = headingContent;
	document.getElementById("scoreCard").innerHTML = instructionContent;

}

var displayScore;
function updateScore()
{
	if(randomChoice === 0)
	{
		if ((answer === 0) && (randomSprite === 0))
		{
			score += 25;
			isCorrect = 1;
		}
		else if((answer === 1) && (randomSprite === 1))
		{
			score += 25;
			isCorrect = 1;
		}
		else if((answer === 2) && (randomSprite === 2))
		{
			score += 25;
			isCorrect = 1;
		}
		else if((answer === 3) && (randomSprite === 3))
		{
			score += 25;
			isCorrect = 1;
		}
		else
		{
			isCorrect = 0;
			lifeline--;
		}
	}
	else
	{
		if ((answer === 0) && (randomDirection === 0))
		{
			score += 25;
			isCorrect = 1;
		}
		else if((answer === 1) && (randomDirection === 1))
		{
			score += 25;
			isCorrect = 1;
		}
		else if((answer === 2) && (randomDirection === 2))
		{
			score += 25;
			isCorrect = 1;
		}
		else if((answer === 3) && (randomDirection === 3))
		{
			score += 25;
			isCorrect = 1;
		}
		else
		{
			isCorrect = 0;
			lifeline--;
		}
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

var leaf;
var randomDirection;
var randomSprite;
var randomChoice;

function displayLeaves()
{

	randomChoice = game.rnd.integerInRange(1,100) % 2;
	randomSprite = game.rnd.integerInRange(1,100) % 4;
	randomDirection = game.rnd.integerInRange(1,100) % 4;
	if(randomChoice === 0)
	{
		if(randomSprite === 0)
		{
			leaf = game.add.tileSprite(100,100,440,200,'leftGreen');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
		else if(randomSprite === 1)
		{
			leaf = game.add.tileSprite(100,100,440,200,'downGreen');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
		else if(randomSprite === 2)
		{
			leaf = game.add.tileSprite(100,100,440,200,'rightGreen');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
		else if(randomSprite === 3)
		{
			leaf = game.add.tileSprite(100,100,440,200,'upGreen');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
	}
	else
	{
		if(randomSprite === 0)
		{
			leaf = game.add.tileSprite(100,100,440,200,'leftBrown');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
		else if(randomSprite === 1)
		{
			leaf = game.add.tileSprite(100,100,440,200,'downBrown');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
		else if(randomSprite === 2)
		{
			leaf = game.add.tileSprite(100,100,440,200,'rightBrown');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
		else if(randomSprite === 3)
		{
			leaf = game.add.tileSprite(100,100,440,200,'upBrown');
			if(randomDirection === 0)
			{
				leaf.autoScroll(-40,0);
  			}
			else if(randomDirection === 1)
			{
				leaf.autoScroll(0,40);
			}
			else if(randomDirection === 2)
			{
				leaf.autoScroll(40,0);
			}
			else if(randomDirection === 3)
			{
				leaf.autoScroll(0,-40);
			}
		}
	}
	//console.log("randomChoice" + randomChoice);
		//console.log("randomSprite" + randomSprite);
			//console.log("randomDirection" + randomDirection);


}

function pauseAndPlay()
{
	if(pauseState  === 0)
	{
		pauseState = 1;
		ppText.setText(' ');
		ppText.setText('Game Paused');
		leaf.alpha = 0;

	}
	else
	{
		pauseState = 0;
		ppText.setText(' ');
		ppText.setText('Pause game ');
		leaf.alpha = 1;

	}
}
function finishGame()
{
	gameOver();
}
