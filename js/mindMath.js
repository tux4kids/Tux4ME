var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update, render: render });

WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    //  The Google Fonts we want to load.
    google: { families: ['Architects+Daughter::latin'] }
};

function preload() {
	game.load.image('background', 'assets/images/mindMath/background_640_520.jpg');
	game.load.image('living', 'assets/images/highClick/living_30_30.png');
	game.load.image('dead', 'assets/images/highClick/dead_30_30.png');
	game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
  	game.load.image('start_button' , 'assets/images/start_50_50.png');
	game.load.image('pause', 'assets/images/highClick/pause_30_30.png');
	game.load.image('questionBox', 'assets/images/mindMath/questionBox_100_100.png');
	game.load.image('answerBox', 'assets/images/mindMath/answerBox_300_75.png');
	game.load.image('replay' , 'assets/images/replay_100_100.png');


	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

var pauseState = 0;
var level = 1;
var livingState; //create
var life; //create
var score = 0;
var lifeline = 3;
var play;
var pause;
var tempText;
var mylevel;
var myscore;
var questionBox;
var answerBox;
var questionText = [];
var answerText = [];
var startScreen;
var startButton;
var instructionText;



function create() {
	game.add.sprite(0, 0, 'background');
	livingState = game.add.group();
	for (var p = 0; p < 3; p++) {
		life = livingState.create(27, 180 + p * 38, 'living');
	}
	tempText = game.add.text(470, 470, ' ', { font: "15px Arial", fill: "#eceff1" });
	pause = game.add.sprite(575, 455, 'pause');
	pause.inputEnabled = true;
	myscore = game.add.text(80, 43, '000', { font: "15px Arial", fill: "#eceff1" });
	mylevel = game.add.text(311, 43, '01', { font: "15px Arial", fill: "#eceff1" });
	timer = game.add.text(515, 43, '00:00:00', { font: "15px Arial", fill: "#eceff1" });



	var tempBox;
	answerBox = game.add.group();
	for (j = 0; j < 4; j++) {
		tempBox = answerBox.create(170, 110 + (j * 75), 'answerBox');
		tempBox.alpha = 0;
		tempBox.inputEnabled = true;
	}
	questionBox = game.add.group();
	for (p = 0; p < 3; p++) {
		for (var j = 0; j < 3; j++) {
			tempBox = questionBox.create(170 + (j * 100), 110 + (p * 100), 'questionBox');
			tempBox.alpha = 0;
			tempBox.inputEnabled = true;
		}
	}



	createText();
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
  makeQuestion();
}

function createText() {
	for (var j = 0; j < 9; j++) {
		questionText[j] = game.add.text(0, 0, '', { font: "Arial", fontSize: "10px", fill: "#ffffff", wordWrap: true, wordWrapWidth: 100, align: "center" });
		questionText[j].x = Math.floor(questionBox.getAt(j).x + questionBox.getAt(j).width / 2);
		questionText[j].y = Math.floor(questionBox.getAt(j).y + questionBox.getAt(j).height / 2);
		questionText[j].anchor.set(0.45, 0.3);
		questionText[j].font = 'Architects Daughter';
		questionText[j].fontSize = '50px';

	}
	for (var j = 0; j < 4; j++) {
		answerText[j] = game.add.text(0, 0, '', { font: "Arial", fontSize: "10px", fill: "#ffffff", wordWrap: true, wordWrapWidth: 280, align: "center" });
		answerText[j].x = Math.floor(answerBox.getAt(j).x + answerBox.getAt(j).width / 2);
		answerText[j].y = Math.floor(answerBox.getAt(j).y + answerBox.getAt(j).height / 2);
		answerText[j].anchor.set(0.45, 0.3);
		answerText[j].font = 'Architects Daughter';
		answerText[j].fontSize = '50px';

	}
	instructionText = game.add.text(60,467 , ' ', { font: "Arial", fill: "#ffffff"});
	instructionText.fontSize = '16px';
}

var gamePhase = 0;
var questionBoxActive = [0, 0, 0]; //-1 denotes question box not active
var questionBoxEnable = [0,0,0];
var questionBoxValue = [0, 0, 0];
var clueActive = 0;
var answerBoxNumber;
var answerValue;

function update() {
	updateTimer();
	updateBox();
	pause.events.onInputDown.add(pauseAndPlay);

	//console.log(questionBoxActive[0]);
	//console.log(questionBox.getAt(questionBoxActive[0]).inputEnabled);
}

function render()
{




			//questionBox.getAt(questionBoxActive[0]).inputEnabled = true;
			//console.log(' '+questionBoxActive[0]+questionBoxActive[1]+questionBoxActive[2]+' - q1 in update\n'+ questionBoxValue[0]);
			questionBox.getAt(questionBoxActive[0]).events.onInputDown.add(questionBoxOne);
			//console.log('\nend of q1 if');

			//console.log(questionBoxActive[1]+' - q2 input\n');
			questionBox.getAt(questionBoxActive[1]).events.onInputUp.add(questionBoxTwo);

			//console.log(questionBoxActive[2]+' - q3 input\n');
			questionBox.getAt(questionBoxActive[2]).events.onInputUp.add(questionBoxThree);



		answerBox.getAt(1).events.onInputUp.add(answerBoxOne);
		answerBox.getAt(2).events.onInputUp.add(answerBoxTwo);
		answerBox.getAt(3).events.onInputUp.add(answerBoxThree);

}

function makeQuestion() {
	//console.log('start mQ\n');
	var max = 9;
	questionBoxValue[0] = (game.rnd.integerInRange(1, 100) % (max - 2)) + 1;
	if (questionBoxValue[0] === max - 2) {
		questionBoxValue[1] = max - 1;
		questionBoxValue[2] = max;
	}
	else {
		questionBoxValue[1] = 1 + questionBoxValue[0] + (game.rnd.integerInRange(1, 100) % (max - 1 - questionBoxValue[0]));
		if (questionBoxValue[1] === max - 1) {
			questionBoxValue[2] = max;
		}
		else {
			questionBoxValue[2] = 1 + questionBoxValue[1] + (game.rnd.integerInRange(1, 100) % (max - questionBoxValue[1]));
		}
	}
	var tempFlag = 0;
	questionBoxActive[0] = (game.rnd.integerInRange(1, 100) % 9)
	while (tempFlag === 0) {
		questionBoxActive[1] = (game.rnd.integerInRange(1, 100) % 9)
		if (questionBoxActive[0] !== questionBoxActive[1]) {
			tempFlag = 1;
		}
	}
	tempFlag = 0;
	while (tempFlag === 0) {
		questionBoxActive[2] = (game.rnd.integerInRange(1, 100) % 9)
		if ((questionBoxActive[0] !== questionBoxActive[2]) && (questionBoxActive[1] != questionBoxActive[2])) {
			tempFlag = 1;
		}
	}
	makeAnswer();
	//console.log('qba='+questionBoxActive[0]+questionBoxActive[1]+questionBoxActive[2]+'\nqbv='+questionBoxValue[0]+questionBoxValue[1]+questionBoxValue[2]);
	displayQuestion();
	//console.log('qba='+questionBoxActive[0]+questionBoxActive[1]+questionBoxActive[2]+'\nqbv='+questionBoxValue[0]+questionBoxValue[1]+questionBoxValue[2]);
	//console.log('gamePhase='+gamePhase);
}

function boxDisappear(boxNumber) {
	game.add.tween(questionBox.getAt(boxNumber)).to({ alpha : 0}, 1000, Phaser.Easing.Linear.easeInOut, true);
	//questionBox.getAt(boxNumber).alpha = 0;
	questionText[boxNumber].setText(' ');
	//questionBox.getAt(boxNumber).inputEnabled = false;
}

function boxBlink(boxNumber) {
	questionBox.getAt(boxNumber).alpha = 0;
	questionText[boxNumber].alpha=0;
	game.add.tween(questionBox.getAt(boxNumber)).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.easeInOut, true);
	game.add.tween(questionText[boxNumber]).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.easeInOut, true);
}

function questionBoxOne() {
	//console.log('qbox1');
	if(gamePhase === 1)
	{
		if(questionBoxEnable[0]===1)
		{
	//console.log(questionBoxEnable[0]+' - q1 input t1\n');
	boxDisappear(questionBoxActive[0]);
	questionBoxEnable[0] = 0;
	//console.log(questionBoxEnable[0]+' - q1 input t2\n');
		}
	}
}

function questionBoxTwo() {
	//console.log('qbox2');
	if(gamePhase === 1)
	{
	if(questionBoxEnable[1]===1)
		{
	//console.log(questionBoxEnable[1]+' - q2 input t1\n');
	if (questionBoxEnable[0] === 0) {
		boxDisappear(questionBoxActive[1]);
		questionBoxEnable[1] = 0;
	}
	else {
		boxBlink(questionBoxActive[1]);
	}
	//console.log(questionBoxEnable[1]+' - q2 input t2\n');
		}
	}
}

function questionBoxThree() {
	//console.log('qbox3');
	if(gamePhase === 1)
	{
		if(questionBoxEnable[2]===1)
		{
	//console.log(questionBoxEnable[2]+' - q3 input t1\n');
	if (questionBoxEnable[1] === 0) {
		boxDisappear(questionBoxActive[2]);
		questionBoxEnable[2] = 0;
		displayAnswer();
	}
	else {
		boxBlink(questionBoxActive[2]);
	}
	//console.log(questionBoxEnable[2]+' - q3 input t2\n');
		}
	}
}

function answerBoxOne() {
	//console.log('abox1');
	if(gamePhase === 2)
	{
	if (answerBoxNumber === 1) {
		correctAnswer();
	}
	else {
		//console.log('q disp1 called'+'gamePhase='+gamePhase);
		answerText[0].setText(questionBoxValue[0] + ' + ' + questionBoxValue[1] + ' + ' + questionBoxValue[2] + ' = ');
		if (clueActive === 1) {
			lifeline--;
		}
		clueActive = 1;
	}
	}

}

function answerBoxTwo() {
	//console.log('abox2');
	if(gamePhase === 2)
	{
	if (answerBoxNumber === 2) {
		correctAnswer();
	}
	else {
		//console.log('q disp2 called'+'gamePhase='+gamePhase);
		answerText[0].setText(questionBoxValue[0] + ' + ' + questionBoxValue[1] + ' + ' + questionBoxValue[2] + ' = ');
		if (clueActive === 1) {
			lifeline--;
		}
		clueActive = 1;
	}
	}
}

function answerBoxThree() {
	//console.log('abox3');
	if(gamePhase === 2)
	{
	if (answerBoxNumber === 3) {
		correctAnswer();
	}
	else {
		//console.log('q disp3 called'+'gamePhase='+gamePhase);
		answerText[0].setText(questionBoxValue[0] + ' + ' + questionBoxValue[1] + ' + ' + questionBoxValue[2] + ' = ');
		if (clueActive === 1) {
			lifeline--;
		}
		clueActive = 1;
	}
	}
}

function makeAnswer() {
	answerValue = questionBoxValue[0] + questionBoxValue[1] + questionBoxValue[2];
	answerBoxNumber = 1 + (game.rnd.integerInRange(1, 100) % 2);
}

function correctAnswer() {
	score += 25;
	clearAnswer();
	makeQuestion();
}

function clearAll() {
	clearAnswer();
	clearQuestion();
}
function clearQuestion() {
	for (var i = 0; i < 9; i++) {
		questionBox.getAt(i).alpha = 0;
		questionText[i].setText(' ');
		//questionBox.getAt(i).inputEnabled = false;
	}

}

function clearAnswer() {
	for (var i = 0; i < 4; i++) {
		answerBox.getAt(i).alpha = 0;
		answerText[i].setText(' ');
		//answerBox.getAt(i).inputEnabled = false;
	}

}

function displayQuestion() {

	answerBox.destroy();
	questionBox.destroy();
	var tempBox;
	answerBox = game.add.group();
	for (j = 0; j < 4; j++) {
		tempBox = answerBox.create(170, 110 + (j * 75), 'answerBox');
		tempBox.alpha = 0;
		tempBox.inputEnabled = true;
	}
	questionBox = game.add.group();
	for (p = 0; p < 3; p++) {
		for (var j = 0; j < 3; j++) {
			tempBox = questionBox.create(170 + (j * 100), 110 + (p * 100), 'questionBox');
			tempBox.alpha = 0;
			tempBox.inputEnabled = true;
		}
	}
	instructionText.setText('Click the numbers in ascending order and calculate the sum');
	gamePhase = 1;
	questionBoxEnable[0]=1;
	questionBoxEnable[1]=1;
	questionBoxEnable[2]=1;
	clearAll();
	for (var i = 0; i < 3; i++) {
		questionBox.getAt(questionBoxActive[i]).alpha = 1;
		questionText[questionBoxActive[i]].setText(questionBoxValue[i]);
		//questionBox.getAt(questionBoxActive[i]).inputEnabled = true;
	}
}

function displayAnswer() {
	clueActive = 0;
	answerBox.destroy();
	questionBox.destroy();
	var tempBox;
	questionBox = game.add.group();
	for (p = 0; p < 3; p++) {
		for (var j = 0; j < 3; j++) {
			tempBox = questionBox.create(170 + (j * 100), 110 + (p * 100), 'questionBox');
			tempBox.alpha = 0;
			tempBox.inputEnabled = true;
		}
	}

	answerBox = game.add.group();
	for (j = 0; j < 4; j++) {
		tempBox = answerBox.create(170, 110 + (j * 75), 'answerBox');
		tempBox.alpha = 0;
		tempBox.inputEnabled = true;
	}

	instructionText.setText('Click the calculated sum from the given options');
	gamePhase = 2;
	clearAll();
	for (var i = 0; i < 4; i++) {
		answerBox.getAt(i).alpha = 1;
		//answerBox.getAt(i).inputEnabled = true;
	}
	answerText[0].setText('Find the sum:');
	answerText[0].fontSize = '32px';
	if (answerBoxNumber === 1) {
		answerText[1].setText(answerValue);
		answerText[2].setText(answerValue + 1);
		answerText[3].setText(answerValue + 2);
	}
	else if (answerBoxNumber === 2) {
		answerText[2].setText(answerValue);
		answerText[1].setText(answerValue - 1);
		answerText[3].setText(answerValue + 1);
	}
	else if (answerBoxNumber === 3) {
		answerText[3].setText(answerValue);
		answerText[2].setText(answerValue - 1);
		answerText[1].setText(answerValue - 2);
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
var destroy
var replay;
var headingContent;
var instructionContent;
function gameOver()
{
	document.getElementById("finishButtonArea").innerHTML = '';
	        pauseState = 1;
        pause.inputEnabled = false;
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

function updateScore() {

	if (score < 100) {
		displayScore = '00' + score;
	}
	else if (score < 1000) {
		displayScore = '0' + score;
	}
	else {
		displayScore = score;
	}
	myscore.setText(displayScore);
	updateLevel();
}

function updateLevel() {
	var levelFlag = level;
	level = Math.floor(score / 250) + 1;
	mylevel.setText('0' + level);
	if (levelFlag !== level) {
		updateLife();
	}
}
function updateLife() {
	if (lifeline === 3) {
		livingState.getAt(0).kill();
		livingState.getAt(1).kill();
		livingState.getAt(2).kill();
	}
	else if (lifeline === 2) {
		livingState.getAt(1).kill();
		livingState.getAt(2).kill();
		deadOne.kill();
	}
	else if (lifeline === 1) {
		livingState.getAt(2).kill();
		deadOne.kill();
		deadTwo.kill();
	}
	//Now update the lifelines and bring it back again. :)
	lifeline = 3;
	livingState = game.add.group();
	for (var p = 0; p < 3; p++) {
		life = livingState.create(27, 180 + p * 38, 'living');
	}
}

var timer;
var totalSeconds = 0;
var gameSeconds = 0;
var timePaused = 0;
var timeUpdateFlag = 1;
var startGame = 1;
var timeText;
// The userdefined function to update the timer.
function updateTimer() {
	if (startGame === 1) {
		//To find and display the elapsed time.
		if (pauseState === 0) {
			if (timeUpdateFlag === 0) {
				timeUpdateFlag = 1;
				timePaused = timePaused + (Math.floor(game.time.totalElapsedSeconds()) - totalSeconds);
			}
			totalSeconds = Math.floor(game.time.totalElapsedSeconds());
			gameSeconds = totalSeconds - timePaused;
			var minutes = Math.floor(gameSeconds / 60);
			var hours = Math.floor(minutes / 60);
			var modmin = minutes % 60;
			if (modmin < 10) {
				modmin = '0' + modmin;
			}
			var modsec = gameSeconds % 60;
			if (modsec < 10) {
				modsec = '0' + modsec;
			}
			//Hour display in two digits ! will be like 002.
			timeText = '0' + hours + ':' + modmin + ':' + modsec;
			timer.setText(timeText);
		}
		else {
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

function pauseAndPlay() {
	if (pauseState === 0) {
		pauseState = 1;
		tempText.setText('Game Paused');
		for (var i = 0; i < 9; i++) {
		//questionBox.getAt(i).alpha = 0;
		questionText[i].alpha = 0;
		}
		for(i = 0; i<4; i++)
		{
			answerText[i].alpha =0;
		}
		gamePhase = 0;
	}
	else {
		tempText.setText(' ');
		for (var i = 0; i < 9; i++) {
		//questionBox.getAt(i).alpha = 1;
		questionText[i].alpha = 1;
		}
		for(i = 0; i<4; i++)
		{
			answerText[i].alpha =1;
		}
		makeQuestion();
		pauseState = 0;
	}
}
function finishGame()
{
	gameOver();
}
