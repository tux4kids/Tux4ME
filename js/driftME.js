var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update });

function preload()
{
	//Importing the asset(s) required for the game
	game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
	game.load.image('start_button' , 'assets/images/start_50_50.png');
	game.load.image('background' , 'assets/images/background3_640_520.png');
	game.load.image('pp_button' , 'assets/images/playpause_120_35.png');
	game.load.image('info' , 'assets/images/info_35_35.png');

	//Game specific asset(s)
	game.load.image('box' , 'assets/images/driftME/displaybox_130_130.png');
	//game.load.image('smile' , 'assets/images/driftU/smile_261_89.png');
	//game.load.image('happy' , 'assets/images/happy_100_100.png');
	//game.load.image('sad' , 'assets/images/sad_100_100.png');
	game.load.image('correct' , 'assets/images/correct_60_60.png');
	game.load.image('wrong' , 'assets/images/wrong_60_60.png');
	game.load.image('living' , 'assets/images/living_30_30.png');
	game.load.image('dead' , 'assets/images/dead_30_30.png');
	game.load.image('replay' , 'assets/images/replay_100_100.png');

}
// Global variables declared
var block;
var score = 0;
var level = 1;

var isVowel;
var isEven;
var boxNumber;
var boxText;
var xTextPos;
var yTextPos;
var selectedBox;
var yes;
var no;
var answer;
var questionOne;
var questionTwo;
var questionThree;
var x_initial = 0;
var pauseState = 0;
var flag = 0;
var life;
var livingState;
var lifeline = 3;
var timeText;
var playPause;
var isCorrect;
var mylevel;
var myscore;
var startScreen;
var startButton;

var inputcheck; 
var inputcross; 
var pause;

// The predefined function to create the Gaming area
function create()
{
	//Adding the background images
	game.add.sprite(0 , 0 , 'background');
	playPause = game.add.sprite(255 , 475 , 'pp_button');
	playPause.inputEnabled = true;
	info_button = game.add.sprite(5, 430 , 'info');

	livingState = game.add.group();
	for(var p = 0 ; p < 3 ; p++)
	{
		life = livingState.create(7 , 150 + p*35 , 'living');
	}

	renderBox();

	//game.add.sprite(183 , 314, 'smile');
	yes = game.add.sprite(230,355, 'correct');
	yes.inputEnabled = true;

	no = game.add.sprite(350,355 , 'wrong');
	no.inputEnabled = true;

	myscore = game.add.text(90, 19 , '000' , {font : "15px Arial" , fill : "white"});
	mylevel = game.add.text(312, 19 , '01' , {font : "15px Arial" , fill : "white"});
	timer = game.add.text(505, 19, '00:00' ,{font : "15px Arial" , fill : "white"});
	ppText = game.add.text(275,488,'Click to Pause', {font : "15px Arial" , fill : "white"});
	info = game.add.text(40,445,'Select yes or No as per the Question', {font : "14px Arial" , fill : "#a1887f"});
	info.setShadow(3,3, 'rgba(25,25,25,0.25)' , 8);
	boxText = game.add.text(xTextPos, yTextPos , '' ,{ font : '50px Arial' , fill : "black"}  );
	initialize();
       inputcross = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    inputcheck = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    pause = game.input.keyboard.addKey(Phaser.Keyboard.P);

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

var item;
//The user defined function that renders the box in the appropriate area as per the level.
function renderBox()
{
	if (level < 6)
	{
		boxNumber = 2;
		x_initial = 150 ;
	}
	else
	{
		boxNumber = 3;
		x_initial = 55;
		if(level===6)
		{
			questionOne.setText(' ');
			questionTwo.setText(' ');
			//questionThree.setText(' ');
			block.destroy();
		}
	}

	block = game.add.group();

	for(var i = 0 ; i < boxNumber ; i++)
	{
		item = block.create(x_initial + i*200 , 135 , 'box' );
		if(i === 0)
		{
			questionOne = game.add.text (x_initial + i*200 - 13 , 285 , 'Is the number even ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionOne.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);

		}
		else if (i === 1)
		{
			questionTwo = game.add.text (x_initial + i*200 - 13 , 100 , 'Is the letter a vowel ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionTwo.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
		else if (i === 2)
		{
			questionThree = game.add.text (x_initial + i*200 - 13 , 285 , 'Is the number odd ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionThree.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
	}
}

// The predefined function to be called at the rate of 10 frames per second.
function update()
{

     updateTimer();
       
        game.input.enabled=true; 
   	
        inputcheck.onDown.add(removeTextYes,this);
        inputcheck.onUp.add(updateBox);

        inputcross.onDown.add(removeTextNo,this);
        inputcross.onUp.add(updateBox);

        yes.events.onInputDown.add(removeTextYes);
	no.events.onInputDown.add(removeTextNo);

	yes.events.onInputUp.add(updateBox);
	no.events.onInputUp.add(updateBox);

	playPause.events.onInputUp.add(pauseAndPlay);
        pause.onUp.add(pauseAndPlay,this);
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
//The user defined function to retrive the value to be displayed in the box.
function boxValue()
{
	return getAlphabet()+getNumber();
}

//The userdefined function generating random alphabet
function getAlphabet()
{
	var vowels =['A','E',' I','O','U'];
	var constnants =['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','X','Y','Z'];
	if ((game.rnd.integerInRange(1,100)%2)==0)
	{
	isVowel=1;
	return vowels[(game.rnd.integerInRange(1,100)% vowels.length)];
	}
	else
	{
	isVowel=0;
	return constnants[(game.rnd.integerInRange(1,100)% constnants.length)];
	}
}

//The userdefined function generating random number
function getNumber()
{
	var a = (game.rnd.integerInRange(1,100)%9)+1;
	if (a%2 === 0)
	{
	isEven = 1;
	}
	else
	{
	isEven = 0;
	}
	return a;
}

// The userdefined function to select a random box.
function selectBox()
{
	if(boxNumber === 2)
	{
		if ((game.rnd.integerInRange(1,100)%2)==0)
		 {
		 	xTextPos = 185;
		 	yTextPos = 175;
		 	selectedBox = 1;
		 	//boxText.game.text.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' ,{ font : '50px Arial' , fill : "white"}  );
		 	//console.log(selectedBox);
		 }
		 else
		 {
		 	xTextPos = 385;
		 	yTextPos = 175;
		 	selectedBox = 2;
		 	//boxText.game.text.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 	//console.log(selectedBox);
		 }
	}
	else if(boxNumber === 3)
	{
		var random = game.rnd.integerInRange(1,100)%3;
		//console.log(random);
		if (random === 0)
		 {
		 	xTextPos = 90;
		 	yTextPos = 175;
		 	selectedBox = 1;
		 	//boxText.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 }
		else if (random === 1)
		 {
		 	xTextPos = 290;
		 	yTextPos = 175;
		 	selectedBox = 2;
		 	//boxText.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 }
		else
		 {
		 	xTextPos = 490;
		 	yTextPos = 175;
		 	selectedBox = 3;
		 	//boxText.reset(xTextPos , yTextPos);
		 	boxText = game.add.text(xTextPos, yTextPos , '' , { font : '50px Arial' , fill : "white"} );
		 }
	}
}


//The user defined function to initialize.
function initialize()
{
	var text = boxValue();
	selectBox();
	boxText.setText(text);
	//love = game.add.sprite(540, 370 , 'happy');
}


//The userdefined function that updates the box value everytime.
function updateBox()
{
	if(pauseState === 0)
	{
		//var loosu = ' ';
		//boxText.setText(loosu);
		//love.kill();
		updateScore();
		var text = boxValue();
		selectBox();
		boxText.setText(text);
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
				gameOver();
			}
			/*else if (lifeline === -1)
			{
				game.destroy();
			}
			*/
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
	playPause.inputEnabled = false;
          game.input.keyboard.removeKey(Phaser.Keyboard.P);
	destroy = game.add.text(272, 325 , 'Game Over !' , {font : "17px Arial" , fill : "#ec407a"});

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
	playPause.destroy();
	playPause = game.add.sprite(255 , 475 , 'pp_button');
	playPause.inputEnabled = true;
        pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
	ppText = game.add.text(275,488,'Click to Pause', {font : "15px Arial" , fill : "white"});

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


//Helper functions : Refer render()
function removeTextYes()
{
	if(pauseState === 0)
	{
		answer = 1;
		var empty = ' ';
		boxText.setText(empty);
	}
}
//Helper functions : Refer render()
function removeTextNo()
{
	if(pauseState === 0)
	{
		answer = 0;
		var empty = ' ';
		boxText.setText(empty);
	}
}

// The user defined function to update the score
function updateScore()
{

	if(level < 6)
	{

		if(level % 2 == 0)
		{
			if(selectedBox === 2)
			{
				if(isEven && answer)
				{
					score += 25;
					isCorrect = 1;
				}
				else if (!isEven && !answer)
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
			else if(selectedBox === 1)
			{
				if(isVowel && answer)
				{
					score += 25;
					isCorrect = 1;
				}
				else if (!isVowel && !answer)
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
			else if(selectedBox === 3)
			{
				if(!isEven && answer)
				{
					score += 25;
					isCorrect = 1;
				}
				else if (isEven && !answer)
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

		}
		else
		{
			if(selectedBox === 1)
			{
				if(isEven && answer)
				{
					score += 25;
					isCorrect = 1;
				}
				else if (!isEven && !answer)
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
			else if(selectedBox === 2)
			{
				if(isVowel && answer)
				{
					score += 25;
					isCorrect = 1;
				}
				else if (!isVowel && !answer)
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
			else if(selectedBox === 3)
			{
				if(!isEven && answer)
				{
					score += 25;
					isCorrect = 1;
				}
				else if (isEven && !answer)
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
		}
	}
	else
	{

		if(selectedBox === 1)
		{
			if(isEven && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (!isEven && !answer)
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
		else if(selectedBox === 2)
		{
			if(isVowel && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (!isVowel && !answer)
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
		else if(selectedBox === 3)
		{
			if(!isEven && answer)
			{
				score += 25;
				isCorrect = 1;
			}
			else if (isEven && !answer)
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

//The userdefined function to update the level
function updateLevel()
{
	var levelFlag = level;
	level = Math.floor(score/250) + 1;
	mylevel.setText('0'+level);
	if (levelFlag != level)
	updateLife();
	if(level<6)
	{
		if(level%2 === 0)
		{
			questionOne.setText(' ');
			questionTwo.setText(' ');
			questionOne = game.add.text (150 - 13 , 100 , 'Is the letter a vowel ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionOne.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
			questionTwo = game.add.text (150 + 1*200 - 13 , 285 , 'Is the number even ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionTwo.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
		else
		{
			questionTwo.setText(' ');
			questionOne.setText(' ');
			questionOne = game.add.text (150 + 0*200 - 13 , 285 , 'Is the number even ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionOne.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
			questionTwo = game.add.text (150 + 1*200 - 13 , 100 , 'Is the letter a vowel ?' , {font : "18px Arial" , fill : "#00bfa5"});
			questionTwo.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);
		}
	}
	else
	{
		if(level===6 && flag === 0)
		{
			renderBox();
			flag = 1
		}
	}
}

function pauseAndPlay()
{
	if(pauseState  === 0)
	{
		pauseState = 1;
		ppText.setText('     Paused   ');
		boxText.setText(' ');


	}
	else
	{
		pauseState = 0;
		ppText.setText('Click to Pause');
		boxText.setText(' ');
		var text = boxValue();
		selectBox();
		boxText.setText(text);

	}
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
//If u find any bugs, please send us a pull request. Thankyou ! :)
