

var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update });

function preload()
{
	game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
	game.load.image('start_button' , 'assets/images/start_50_50.png');
    game.load.image('background' , 'assets/images/motionCommotion/background_640_520.png');
	game.load.image('scroll' , 'assets/images/motionCommotion/scollShape_640_100.png');
	game.load.image('figure' , 'assets/images/motionCommotion/shape1.png');
	game.load.image('left' , 'assets/images/motionCommotion/left.png');
    game.load.image('right' , 'assets/images/motionCommotion/right.png');
    game.load.image('living' , 'assets/images/living_30_30.png');
	game.load.image('dead' , 'assets/images/dead_30_30.png');
	game.load.image('playPause' , 'assets/images/motionCommotion/playpause_50_50.png');
	game.load.image('replay' , 'assets/images/replay_100_100.png');
}

var left;
var right;
var startGame = 0;

var figOne;
var figTwo;
var figThree;
var figFour;
var figFive;
var figSix;
var figSeven;
var decider=[];
var sprites=[];
var currSprite;
var rotLeft = 0;
var rotRight = 0;

var answer;
var answered;
var myscore;
var score = 0;
var isCorrect = null;
var level = 1;
var mylevel;
var life;
var livingState;
var lifeline = 3;
var startScreen;
var startButton;
var playpause;
var ppText;

var keyleft;
var keyright;
var pause; 
function create()
{
	game.add.sprite(0,0,'background');
	for (var i = 0; i < 6; i++)
	{
	var scrolling = game.add.tileSprite(0,(-50+(i*100)),640,100,'scroll');
	scrolling.autoScroll(Math.pow(-1,i)*5,0);
	scrolling.alpha = 0.14;
	}
	
	left = game.add.sprite(242 , 385 , 'left');
	left.inputEnabled = true;
	right = game.add.sprite(347, 385 , 'right');
	right.inputEnabled = true;

	spriteCreation();

	livingState = game.add.group();
	for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 200 + p*35 , 'living');
	}

	playpause = game.add.sprite(585 , 480 , 'playPause');
	playpause.scale.setTo(0.7,0.7);
	playpause.inputEnabled = true;

	ppText = game.add.text(480, 495 , ' ' , {font : "15px Arial" , fill : "#0097a7"});
	ppText.setText('Pause game ');

	timer = game.add.text(538, 19, '00:00:00' ,{font : "18px Arial" , fill : "#0097a7"});
	myscore = game.add.text(46, 19 , '000' , {font : "18px Arial" , fill : "#0097a7"});
  	mylevel = game.add.text(311, 19 , '01' , {font : "18px Arial" , fill : "#00bfa5"});
	
	updateRotations();
        keyleft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
     keyright = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        pause    = game.input.keyboard.addKey(Phaser.Keyboard.P);
	startScreen = game.add.sprite(0,0,'start_screen');
    startButton = game.add.sprite(560,465,'start_button');
    startButton.inputEnabled = true;
    startButton.events.onInputUp.add(startingGame);
}

function spriteCreation()
{
	game.physics.startSystem(Phaser.Physics.P2JS);
	figOne = game.add.sprite(265, 130, 'figure');
	figTwo = game.add.sprite(375, 130, 'figure');
	figThree = game.add.sprite(210, 215, 'figure');
	figFour = game.add.sprite(320, 215, 'figure');
	figFive = game.add.sprite(430, 215, 'figure');
	figSix = game.add.sprite(265, 290, 'figure');
	figSeven = game.add.sprite(375, 290, 'figure');

	sprites=[figOne, figTwo, figThree, figFour, figFive, figSix, figSeven];
	

	for (var i = 0; i < 7; i++) {
        currSprite = sprites[i];
        currSprite.scale.setTo(0.65,0.65);
        game.physics.p2.enable(currSprite);
		currSprite.anchor.setTo(.5, .5);		
	}

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

         keyleft.onDown.add(answeredAntiClockwise,this);
        keyleft.onUp.add(updateBox);

         keyright.onDown.add(answeredClockwise,this);
        keyright.onUp.add(updateBox);

	left.events.onInputDown.add(answeredAntiClockwise);
	left.events.onInputUp.add(updateBox);


	right.events.onInputDown.add(answeredClockwise);
	right.events.onInputUp.add(updateBox);

         pause.onUp.add(pauseAndPlay);
	playpause.events.onInputUp.add(pauseAndPlay);


	for (var j = 0; j < 7; j++) {
        currSprite = sprites[j];
		if (decider[j]===0) {
			currSprite.body.rotateRight(150);
			rotRight += 1;
		}
		else {
			currSprite.body.rotateLeft(150);
			rotLeft += 1;
		}		
	}	
}


function answeredAntiClockwise()
{	
	answered = 0;	
}

function answeredClockwise()
{
	answered = 1;	
}

function updateRotations()
{
	rotLeft=0;
	rotRight=0;
	answer=10;
	answered=19;

	for (var i = 0; i < 7; i++) 
	{
		decider[i] = game.rnd.integerInRange(1,100) % 2 ;
	}
}


function getCorrectAnswer()
{
	if ( rotLeft > rotRight ) 
	{
		answer = 0;
	}
	else 
	{
		answer = 1;
	}
}

var displayScore;

function updateScore()
{
	if (answered === answer) 
	{
		score += 25;
		isCorrect = 1;
	}
	else 
	{

		lifeline--;
		isCorrect = 0;
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

var timer;
var totalSeconds = 0;
var gameSeconds = 0;
var timePaused = 0;
var timeUpdateFlag = 1;
var pauseState = 0;
var timeText;

function updateTimer()
{
	if(startGame === 1)
	{
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

	 for (var i = 0; i < 7; i++) 
	 {
        currSprite = sprites[i];
        currSprite.destroy();	
	}

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
	startGame = 1;
	finishFlag = 0;
	game.time.reset();
	destroy.setText(" ");

	replay.inputEnabled = false;
	replay.destroy();

	spriteCreation();
	updateLife();
	updateRotations();
	document.getElementById("heading").innerHTML = headingContent;
	document.getElementById("scoreCard").innerHTML = instructionContent;

}

var finishFlag = 0;
var deadOne;
var deadTwo;

function updateBox()
{
	

	if(pauseState === 0)
	{
		getCorrectAnswer();
	    updateScore();
	    updateRotations();

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
  lifeline = 3;
  livingState = game.add.group();
  for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 200 + p*35 , 'living');
	}
}

function pauseAndPlay()
{
	if(pauseState  === 0) {
		pauseState = 1;
		ppText.setText(' ');
		ppText.setText('Game Paused');
		for (var i = 0; i < 7; i++) {
        currSprite = sprites[i];
        currSprite.alpha = 0;		
	    }
		
	}

	else {
		pauseState = 0;
		ppText.setText(' ');
		ppText.setText('Pause game ');
		for (var i = 0; i < 7; i++) {
        currSprite = sprites[i];
        currSprite.alpha = 1;		
	    }
	}
}

function finishGame()
{
	gameOver();
}





