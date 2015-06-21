var game = new Phaser.Game(640, 520, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload()
{
  //Importing the asset(s) required for the game
  game.load.image('background' , 'assets/images/highClick/background_640_520.jpg');
  game.load.image('play' , 'assets/images/highClick/play_30_30.png');
  game.load.image('pause' , 'assets/images/highClick/pause_30_30.png');
  game.load.image('box', 'assets/images/highClick/displaybox_130_130.png' );
  game.load.image('equals', 'assets/images/highClick/equal_130_90.png' );
  game.load.image('living' , 'assets/images/highClick/living_30_30.png');
  game.load.image('dead' , 'assets/images/highClick/dead_30_30.png');
}
var pauseState = 0;
var level = 1;
var livingState; //create
var life; //create
var block; //create
var numberOne;
var numberTwo;
var numberTwoDisplay;
function create()
{
  game.add.sprite(0 , 0 , 'background');
  livingState = game.add.group();
  for(var p = 0 ; p < 3 ; p++)
  {
    life = livingState.create(27 , 180 + p*38 , 'living');
  }
  block = game.add.group();
  var item;
  for(var i = 0 ; i < 2 ; i++)
  {
    item = block.create(145 + i*215 , 165 , 'box' );
    item.inputEnabled = true;
  }
  game.add.sprite(255,335,'equals');
  pause = game.add.sprite(575,460,'pause');
  pause.inputEnabled = true;
  myscore = game.add.text(80, 43 , '000' , {font : "15px Arial" , fill : "#eceff1"});
  mylevel = game.add.text(311, 43 , '01' , {font : "15px Arial" , fill : "#eceff1"});
  timer = game.add.text(515, 43, '00:00:00' ,{font : "15px Arial" , fill : "#eceff1"});
  boxText();
}
function update()
{
  updateTimer();
}
var timer;
var totalSeconds = 0;
var gameSeconds = 0;
var timePaused = 0;
var timeUpdateFlag = 1;
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

function createNumberTwo()
{
  var num;
  var random = game.rnd.integerInRange(1,100)% 6;

  if(random === 0)
  {
    num = numberOne - 1;
  }
  else if(random === 1)
  {
    num = numberOne + 1;
  }
  else if(random === 2)
  {
    num = numberOne;
  }
  else if(random === 3)
  {
    num = numberOne;
  }
  else if(random === 4)
  {
    num = numberOne + 2;
  }
  else
  {
    num = numberOne - 2;
  }

  console.log(num + 'num');

  var randomOperation = game.rnd.integerInRange(1,100)% 4;
  var tempOne;
  var tempTwo;

  if(randomOperation === 0)//addition
  {
    var randomAdd = game.rnd.integerInRange(1,100)% 4;
    if(randomAdd === 0) //In terms of num/2 + num/2
    {
      tempOne = Math.floor(num/2);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
    else if(randomAdd === 1) //in terms of num/3 + (num - num/3)
    {
      tempOne = Math.floor(num/3);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
    else if(randomAdd === 2)
    {
      tempOne = Math.floor(num/4);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
    else
    {
      tempOne = Math.floor(num/5);
      tempTwo = num - tempOne;
      numberTwo = tempOne + tempTwo;
      numberTwoDisplay = tempOne + ' + ' + tempTwo;
    }
  }
  else if(randomOperation === 1)//subtraction
  {
    var randomSub = game.rnd.integerInRange(1,100)% 3;
    if(randomSub === 0)
    {
      tempOne = num * 2;
      tempTwo = tempOne - num;
      numberTwo = tempOne - tempTwo;
      numberTwoDisplay = tempOne + ' - ' + tempTwo;
    }
    else if(randomSub === 1)
    {
      tempOne = num * 3;
      tempTwo = tempOne - num;
      numberTwo = tempOne - tempTwo;
      numberTwoDisplay = tempOne + ' - ' + tempTwo;
    }
    else
    {
      tempOne = num * 4;
      tempTwo = tempOne - num;
      numberTwo = tempOne - tempTwo;
      numberTwoDisplay = tempOne + ' - ' + tempTwo;
    }
  }
  else if(randomOperation === 2)//Multiplication
  {
    //var randomMul = game.rnd.integerInRange(1,100)% 4;
    if(num % 7 === 0)
    {
      tempOne = num/7;
      numberTwo = tempOne*7; //or simply numberTwo = num;
      numberTwoDisplay = tempOne + ' x ' + '7';
    }
    else if(num % 5 === 0)
    {
      tempOne = num/5;
      numberTwo = tempOne*5; //or simply numberTwo = num;
      numberTwoDisplay = tempOne + ' x ' + '5';
    }
    else if(num % 3 === 0)
    {
      tempOne = num/3;
      numberTwo = tempOne*3; //or simply numberTwo = num;
      numberTwoDisplay = tempOne + ' x ' + '3';
    }
    else
    {
      tempOne = Math.floor(num/2);
      numberTwo = tempOne*2; //num may or may not be equal to numberTwo;
      numberTwoDisplay = tempOne + ' x ' + '2';
    }
  }
  else //Division
  {
    //var randomDiv =
    tempOne = num*2;
    numberTwo = Math.floor(tempOne/2);
    numberTwoDisplay = tempOne + ' / ' + '2';
  }
  console.log(numberTwo + 'numberTwo');

}

function boxText()
{
  var x = ((game.rnd.integerInRange(1,100)) % (level*10))+5;
  console.log(x);
  numberOne = ((game.rnd.integerInRange(1,100)) % (level*10))+5 ;
  console.log(numberOne + 'numberOne');
  numberTwo = createNumberTwo();
  console.log(numberTwoDisplay + 'numberTwoDisplay');
}
