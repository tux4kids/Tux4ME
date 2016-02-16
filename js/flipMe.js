/*


Incomplete eleventh game
probelm faced : Couldn't find a easy way to tween a sprite object by a function call. If
you could find that, finishing this game will just take few hours.

*/
/*var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update });

function preload()
{
	//Importing the asset(s) required for the game
	game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
	game.load.image('start_button' , 'assets/images/start_50_50.png');
	game.load.image('background' , 'assets/images/background4_640_520.png');
	game.load.image('pp_button' , 'assets/images/playpause4_120_35.png');
	game.load.image('flipper' , 'assets/images/flipMe/flipper_70_70.png');



	game.load.image('living' , 'assets/images/living_30_30.png');
	game.load.image('dead' , 'assets/images/dead_30_30.png');
	game.load.image('replay' , 'assets/images/replay_100_100.png');
}

var block;


function create()
{
  //Adding the background images
	game.add.sprite(0 , 0 , 'background');
	playPause = game.add.sprite(255 , 476 , 'pp_button');
	playPause.inputEnabled = true;

    livingState = game.add.group();
	for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 150 + p*35 , 'living');
	}

	myscore = game.add.text(95, 19 , '000' , {font : "15px Arial" , fill : "white"});
	mylevel = game.add.text(312, 19 , '01' , {font : "15px Arial" , fill : "white"});
	timer = game.add.text(507, 19, '00:00:00' ,{font : "15px Arial" , fill : "white"});
	ppText = game.add.text(272,490,'Click to Pause', {font : "13px Arial" , fill : "white"});

	 block = game.add.group();
	for(var i = 0 ; i < 3 ; i++)
	{
		for(var j = 0 ; j < 3 ; j++)
		{
			var item = block.create(225 + i*90 , 140 + j*90 , 'flipper' );
			item.inputEnabled = true ;
			item.anchor.setTo(0.5, 0.5);
    //game.add.tween(sprite).to( { angle: 45 }, 2000, Phaser.Easing.Linear.None, true);

		}
	}

}
function update()
{
    updateTimer();

   	block.getAt(0).events.onInputDown.add(blockOneClicked);


	//playPause.events.onInputUp.add(pauseAndPlay);
}
var tween;
function blockOneClicked()
{

	//tween = game.add.tween(block.getAt(0)).to( { x: -1, y: 1 }, 200, Phaser.Easing.Linear.None, true);
	//var tween = game.add.tween(block.getAt(0).scale).to( { x: -1, y: 1 }, 200, Phaser.Easing.Linear.None, true, 20, 20, true).loop(true);
	//tween.repeat(20);
	tween.update();
}

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
	}
}

function updateBox()
{
	if(pauseState === 0)
	{
		//love.kill();
		updateScore();
		displayNext();
		if(isCorrect)
		{
			//love = game.add.sprite(540, 370 , 'happy');
		}
		else
		{
		//love = game.add.sprite(540, 370 , 'sad');
		if(lifeline === 2)
			{
				livingState.getAt(0).kill();
				game.add.sprite(7,150,'dead');
			}
			else if (lifeline === 1)
			{
				livingState.getAt(1).kill();
				game.add.sprite(7,185,'dead');
			}
			else if (lifeline === 0)
			{
				livingState.getAt(2).kill();
				game.add.sprite(7,220,'dead');
				pauseState = 1;
				playPause.inputEnabled = false;
				destroy = game.add.text(272, 325 , 'Game Over !' , {font : "17px Arial" , fill : "#ec407a"});
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
	playPause = game.add.sprite(255 , 476 , 'pp_button');
	playPause.inputEnabled = true;
	ppText = game.add.text(272,490,'Click to Pause', {font : "13px Arial" , fill : "white"});
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
	if(true)
	{
		score += 25;
		isCorrect = 1;
	}
	else if(false)
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
	lifeline = 3;
	livingState = game.add.group();
	for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 150 + p*35 , 'living');
	}
}
function finishGame()
{
	gameOver();
}
*/
