var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update});

function preload ()
{
	game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
	game.load.image('start_button' , 'assets/images/start_50_50.png');
	game.load.image('background' , 'assets/images/flashBack/background_640_520.png');
	game.load.image('scroll' , 'assets/images/flashBack/scollShape_640_100.png');
	game.load.image('topBar' , 'assets/images/flashBack/topBar_640_64.png');
	game.load.image('box' , 'assets/images/flashBack/box_130_130.png');
	game.load.image('start' , 'assets/images/flashBack/start_50_50.png');
	game.load.spritesheet('shapes', 'assets/images/flashBack/shapes_780_260.png', 130, 130, 12);
	game.load.image('correct' , 'assets/images/flashBack/correct_50_50.png');
	game.load.image('wrong' , 'assets/images/flashBack/wrong_50_50.png');
	game.load.image('living' , 'assets/images/living_30_30.png');
	game.load.image('dead' , 'assets/images/dead_30_30.png');
	game.load.image('pp_button' , 'assets/images/playpause4_120_35.png');
	game.load.image('replay' , 'assets/images/replay_100_100.png');

}
var startGame = 0;
var myscore;
var mylevel;
var yes;
var no;
var previous;
var present;
var start;
var info,helpText;
var score = 0;
var isCorrect = null;
var level = 1;
var life;
var livingState;
var lifeline = 3;
var sprite;
var startScreen;
var startButton;

//var inputcheck; 
//var inputcross; 
var pause;
//var startkey;
function create ()
{

	game.add.sprite(0,0,'background');
	for (var i = 0; i < 6; i++)
	{
	var scrolling = game.add.tileSprite(0,(-50+(i*100)),640,100,'scroll');
	scrolling.autoScroll(Math.pow(-1,i)*5,0);
	scrolling.alpha = 0.14;
	}
	livingState = game.add.group();
	for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 130 + p*35 , 'living');
	}
	playpause = game.add.sprite(255 , 475 , 'pp_button');
	playpause.inputEnabled = true;

	game.add.sprite(0,-3,'topBar');
	timer = game.add.text(544, 19, '00:00:00' ,{font : "18px Arial" , fill : "#ffffff"});
	myscore = game.add.text(80-34, 19 , '000' , {font : "18px Arial" , fill : "#ffffff"});
  	mylevel = game.add.text(311-10, 19 , '01' , {font : "18px Arial" , fill : "#ffffff"});
  	start = game.add.sprite(285,300,'start');
  	start.inputEnabled = true;

  	helpText = game.add.text(150,260,'              Remember this image !', {font : "18px Arial" , fill : "#01579b"});
  	helpText.setShadow(3,3, 'rgba(25,25,25,0.5)' , 8);
  	info = game.add.text(40,440,'Click to start :)', {font : "18px Arial" , fill : "#01579b"});
	ppText = game.add.text(269,488,'Click to Pause', {font : "15px Arial" , fill : "white"});


	yes = game.add.sprite(235,350,'correct');
	yes.inputEnabled = true;
	yes.alpha = 0;
	no = game.add.sprite(335,350,'wrong');
	no.inputEnabled = true;
	no.alpha = 0;

	game.add.sprite(235,100,'box');
	sprite = game.add.sprite(245, 110, 'shapes');
	previous = game.rnd.integerInRange(1,100) % 6 ;
	sprite.frame = previous;

    sprite.alpha = 0;
    game.add.tween(sprite).to({ alpha : 1}, 1000, Phaser.Easing.Linear.easeInOut, true);
    //game.add.tween(sprite).to({ alpha : 0}, 5000, Phaser.Easing.Linear.easeInOut,true, 5000);
    //initialize();
     //inputcross = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    //inputcheck = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
 //    startkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
   //startkey.onUp.add(initialize,this);
   start.events.onInputUp.add(initialize);
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
{  updateTimer();
         
         game.input.enabled=true; 

       // inputcheck.onDown.add(answeredYes,this);
        //inputcheck.onUp.add(updateBox);

       // inputcross.onDown.add(answeredNo,this);
       // inputcross.onUp.add(updateBox);

	yes.events.onInputDown.add(answeredYes);
	no.events.onInputDown.add(answeredNo);

	yes.events.onInputUp.add(updateBox);
	no.events.onInputUp.add(updateBox);

        pause.onDown.add(pauseAndPlay,this);
	playpause.events.onInputUp.add(pauseAndPlay);
}
var answer = null;
function answeredYes()
{
	if(pauseState === 0)
	{
		answer = 1;
	}
}
function answeredNo()
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
function initialize()
{
	if(pauseState === 0)
	{
	helpText.setText('Does this image match the previous one ?');
	helpText.alpha = 0;
	game.add.tween(helpText).to({ alpha : 1}, 1000, Phaser.Easing.Linear.easeInOut, true);
	info.setText('Click Yes or No :)');
	start.destroy();

	game.add.tween(yes).to({ alpha : 1}, 1000, Phaser.Easing.Linear.easeInOut, true);

	game.add.tween(no).to({ alpha : 1}, 1000, Phaser.Easing.Linear.easeInOut, true);
	present = game.rnd.integerInRange(1,100) % 6 ;
	sprite.frame = present;
	sprite.alpha = 0;
	game.add.tween(sprite).to({ alpha : 1}, 1000, Phaser.Easing.Linear.easeInOut, true);
	}
}
var deadOne;
var deadTwo;
function updateBox()
{
	if(pauseState === 0)
	{
		updateScore();
		displayShape();
		if(!isCorrect)
	    {
	    if(lifeline === 2)
	      {
	        livingState.getAt(0).kill();
	        deadOne = game.add.sprite(7,130,'dead');
	      }
	      else if (lifeline === 1)
	      {
	        livingState.getAt(1).kill();
	        deadTwo = game.add.sprite(7,165,'dead');
	      }
	      else if (lifeline === 0)
	      {
	        livingState.getAt(2).kill();
	        game.add.sprite(7,200,'dead');
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
	        //playpause.destroy();
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
	playpause = game.add.sprite(255 , 475 , 'pp_button');
	playpause.inputEnabled = true;
         pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
	ppText = game.add.text(269,488,'Click to Pause', {font : "15px Arial" , fill : "white"});

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

	if (answer && (previous === present))
	{
		score += 25;
		isCorrect = 1;
	}
	else if(!answer && (previous !== present))
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
		life = livingState.create(7 , 130 + p*35 , 'living');
	}
}
function displayShape()
{
	previous = present;
	var dispRandom = game.rnd.integerInRange(1,100) % 5;
	if(dispRandom === 0)
	{
		//present = present;
	}
	else if(dispRandom === 1)
	{
		present = game.rnd.integerInRange(1,100) % 6;
	}
	else if(dispRandom === 2)
	{
		present = (game.rnd.integerInRange(1,100) % 6) + 6;
	}
	else if(dispRandom === 3)
	{
		//present = present;
	}
	else if (dispRandom === 4)
	{
		present = game.rnd.integerInRange(1,100) % 8;
	}
	animateSprite();
	//animatingSprite.kill();
	sprite.frame = present;
	sprite.alpha = 0;
	game.add.tween(sprite).to({ alpha : 1}, 1000, Phaser.Easing.Linear.None, true);
}
var animatingSprite;
function animateSprite()
{
	animatingSprite = game.add.sprite(245, 110, 'shapes');
	animatingSprite.animations.add('runThrough');
	animatingSprite.animations.play('runThrough', 36, false,true);
}
function pauseAndPlay()
{
	if(pauseState  === 0)
	{
		pauseState = 1;
		ppText.setText('     Paused   ');
		sprite.alpha = 0;
	}
	else
	{
		pauseState = 0;
		ppText.setText('Click to Pause');
		sprite.alpha = 1;

	}
}
function finishGame()
{
	gameOver();
}
