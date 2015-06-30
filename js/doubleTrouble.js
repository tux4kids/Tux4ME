/*
pending : Transition between levels
*/
var game = new Phaser.Game(640, 520, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload()
{
	//Importing the asset(s) required for the game
	game.load.image('background' , 'assets/images/background4_640_520.png');
	game.load.image('pp_button' , 'assets/images/playpause4_120_35.png');

  //Importing game specific assets
	game.load.image('box', 'assets/images/doubleTrouble/displaybox_130_130.png' );
    game.load.image('correct' , 'assets/images/correct_60_60.png');
    game.load.image('wrong' , 'assets/images/wrong_60_60.png');
    game.load.image('living' , 'assets/images/living_30_30.png');
	game.load.image('dead' , 'assets/images/dead_30_30.png');
	//game.load.image('happy' , 'assets/images/happy_100_100.png');
	//game.load.image('sad' , 'assets/images/sad_100_100.png');
}

//Global variables declared
var playPause;
var livingState;
var yes;
var no;
var myScore;
var myLevel;
var ppText;
var timer;
var totalSeconds = 0;
var gameSeconds = 0;
var timePaused = 0;
var timeUpdateFlag = 1;
var pauseState = 0;
var colors = ['Red' , 'Green' , 'Blue'];
var displayColorIndex;
var colorNameIndex;
var textColorIndex;
var textColorStyle;
var dummyText;
var dummystyle;
var displayText;
var level = 1;
var answer;
var score = 0;
var isCorrect;
var displayScore;
var lifeline = 3;
var questionOne;
var questionTwo;

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

    yes = game.add.sprite(225,355, 'correct');
	yes.inputEnabled = true;

	no = game.add.sprite(345,355 , 'wrong');
	no.inputEnabled = true;

    myscore = game.add.text(95, 19 , '000' , {font : "15px Arial" , fill : "white"});
	mylevel = game.add.text(312, 19 , '01' , {font : "15px Arial" , fill : "white"});
	timer = game.add.text(507, 19, '00:00:00' ,{font : "15px Arial" , fill : "white"});
	ppText = game.add.text(272,490,'Click to Pause', {font : "13px Arial" , fill : "white"});

	questionOne = game.add.text (145 , 285 , '\"Color of this Text\"' , {font : "18px Arial" , fill : "#5c6bc0"});
	questionOne.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);

	var versus = game.add.text (300 , 185 , '\"Vs\"' , {font : "18px Arial" , fill : "#5c6bc0"});

	questionTwo = game.add.text(345 , 100 , '\"Meaning of this Text\"' , {font : "18px Arial" , fill : "#5c6bc0"});
	questionTwo.setShadow(3,3, 'rgba(25,25,25,0.3)' , 8);

	var info = game.add.text(40,442,'Are they equal ? Select Yes or No  (Do you know about Stroop effect?)', {font : "14px Arial" , fill : "#6d4c41"});
	//info.game.text.addColor('#b39ddb' , 34 );
	info.setShadow(3,3, 'rgba(25,25,25,0.25)' , 8);
	boxText();
	//love = game.add.sprite(540, 370 , 'happy');
	var block = game.add.group();
	var item;
	for(var i = 0 ; i < 2 ; i++)
	{
		item = block.create(150 + i*200 , 135 , 'box' );
	}
}

// The userdefined function to update the timer.
function updateTimer()
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
		timeText = '0'+hours+':'+modmin+ ':' + modsec ;
		timer.setText(timeText);
	}
	else
	{
		timeUpdateFlag = 0
	}
}

function update()
{
    updateTimer();
	yes.events.onInputDown.add(removeTextYes);
	no.events.onInputDown.add(removeTextNo);

	yes.events.onInputUp.add(updateBox);
	no.events.onInputUp.add(updateBox);

	playPause.events.onInputUp.add(pauseAndPlay);
}

//Helper functions : Refer update()
function removeTextYes()
{
	if(pauseState === 0)
	{
		answer = 1;
		textInBoxOne.destroy();
		textInBoxTwo.destroy();
	}
}
//Helper functions : Refer update()
function removeTextNo()
{
	if(pauseState === 0)
	{
		answer = 0;
		textInBoxOne.destroy();
		textInBoxTwo.destroy();
	}
}

function updateBox()
{
	if(pauseState === 0)
	{
		//love.kill();
		updateScore();
		boxText();
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
				var destroy = game.add.text(272, 325 , 'Game Over !' , {font : "17px Arial" , fill : "#ec407a"});
			}
		}
	}
}

function updateScore()
{
	if((textColorIndex === colorNameIndex) && (answer === 1))
	{
		score += 25;
		isCorrect = 1;
	}
	else if((textColorIndex !== colorNameIndex) && (answer === 0))
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
	mylevel.setText('0'+level);
	if (levelFlag != level)
	{
		updateLife();
		if(level %2 === 0)
		{
			questionOne.setText(' ');
			questionOne.setText('\"Meaning of this text\"');
			questionTwo.setText(' ');
			questionTwo.setText('\"Color of this text\"');
		}
		else
		{
			questionTwo.setText(' ');
			questionTwo.setText('\"Meaning of this text\"');
			questionOne.setText(' ');
			questionOne.setText('\"Color of this text\"');
		}
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

function colorName()
{
	colorNameIndex = (game.rnd.integerInRange(1,100)% colors.length);
	displayText = colors[colorNameIndex];
	if (colorNameIndex === 0)
	{
		displayText = '  '+displayText;
	}
	else if (colorNameIndex === 2)
	{
		displayText = ' '+displayText;
	}
	var temp = [{font : "25px Arial" , fill : "#f44336"} , {font : "25px Arial" , fill : "#009688"} , {font : "25px Arial" , fill : "#2196f3"}];
	dummystyle = temp[(game.rnd.integerInRange(1,100)% temp.length)];
}

function textColor()
{
	textColorIndex = (game.rnd.integerInRange(1,100)% colors.length);
	if (textColorIndex === 0)
	{
		textColorStyle = {font : "25px Arial" , fill : "#f44336"}; //Red
	}
	if (textColorIndex === 1)
	{
		textColorStyle = {font : "25px Arial" , fill : "#009688"}; //Green
	}
	if (textColorIndex === 2)
	{
		textColorStyle = {font : "25px Arial" , fill : "#2196f3"}; //Blue
	}

	dummyText = colors[(game.rnd.integerInRange(1,100)% colors.length)];
	if (dummyText === 'Red')
	{
		dummyText = '  '+dummyText;
	}
	else if (dummyText === 'Blue')
	{
		dummyText = ' '+dummyText;
	}
}

var textInBoxOne;
var textInBoxTwo;
function boxText()
{
	if(level%2 === 0)
	{
		//Box 1 = ColorName and Box 2 = textColor
		colorName();
		textInBoxOne = game.add.text(180,185,displayText,dummystyle);
		textColor();
		textInBoxTwo = game.add.text(380,185,dummyText,textColorStyle);
	}
	else
	{
		//Box1 = textColor and Box2 = colorName
		textColor();
		textInBoxTwo = game.add.text(180,185,dummyText,textColorStyle);
		colorName();
		textInBoxOne = game.add.text(380,185,displayText,dummystyle);
	}

}
function pauseAndPlay()
{
	if(pauseState  === 0)
	{
		pauseState = 1;
		ppText.setText('     Paused   ');
	}
	else
	{
		pauseState = 0;
		ppText.setText('Click to Pause');
	}
}

// Thankyou!
// A small unresolved error found! If the color of the word in the left box is equal to the meaning of the word in the right box and
//if the color of the word in the right box is equal to meaning of the word in the left box, the condition evalutates to true ONLY. The 
//probability of this to occur is more closer to 0.
