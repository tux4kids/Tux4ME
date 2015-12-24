//For more information, check phaser documentation
//If you have learned to use phaser, then you  can easily underatnd the following content.

//Declaring the game object

var game = new Phaser.Game(640, 520, Phaser.AUTO, 'gamingArea', { preload: preload, create: create, update: update });

function preload()
{
	//Importing the asset(s) required for the game
	//For example: 
	//game.load.image('start_screen' , 'assets/images/startScreen_640_520.jpg');
	//game.load.image('Name of your image for further reference goes here' , 'relative location of your image/spritesheet');
	//You can also import spritesheets
}

// Declare your global variables here

// The predefined function to create the Gaming area
function create()
{
	//Adding the preloaded content in the game area.
	//You can reuse the code from previous games for commonly used assets.(eg: Play pause buttons, LifeLine smileys etc.,)
	//Next line will display timer in the mentioned absolute position. 505,19
	//timer = game.add.text(505, 19, '00:00' ,{font : "15px Arial" , fill : "white"});	
}

// The predefined function to be called at the rate of 10 frames per second.
function update()
{
	//updateTimer();
}

//The above mentioned are the predefined functions.

//User defined functions

/*

You can reuse the code of the following fucntions with their variables declared
or
Make your own function with a similar functionality.

(The below mentioned functiions are found in all the 10 games. You can refer the code of them and make necessary changes as applicable)

Resuable functions list:
startingGame(); //Will start the game. Invoked by clicking the start game button.
updateTimer(); //Will update the timer. Many variables involved. Reuse it carefully.
updateBox(); //Updates the game content for each action.
updateScore(); //Make necessary changes to the logic of updating score as per your game.
updateLevel(); //Make necessary changes to the logic of increasing complexity with level as per your game.
updateLife(); 
pauseAndPlay();
replayGame();
gameOver();

*/

//The remaining functions will carry the logic of your game and be linked with the above functions.

