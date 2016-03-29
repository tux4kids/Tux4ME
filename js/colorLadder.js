var colorLadder= function(){
	//To scale the svg container 
	var scale=window.innerHeight*0.75/520;
	var svgBox = document.getElementById("svgBox");
	svgBox.style.height=svgBox.offsetHeight*scale+'px';
	svgBox.style.width=svgBox.offsetWidth*scale+'px';
	//To load svg
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "../assets/images/colorLadder/colorLadder.svg", true);
	ajax.send();
	ajax.onload = function(e) {
  		svgBox.innerHTML = ajax.responseText;
  		//start game once svg is loaded 
  		game =new Game();
  		game.setEventListeners();
	}

	//Creates score object
	function Score() {
		this.score = 0;
		this.set = function(i) {
			this.score = i;
			this.refresh();
		};
		this.add = function(i) {
			this.score += i;
			this.refresh();
		};
		//Changes render of score
		this.refresh = function() {
			document.getElementById('score_text').innerHTML="Score: "+this.score;
		};
	}

	//Creates Bird Object
	function Bird(id){
		this.birdId=id;
		//Stores all the elements with light and dark colors of respective birds
		this.lightElems = document.getElementsByClassName('b'+id+'0');
		this.darkElems = document.getElementsByClassName('b'+id+'1');
		this.html=document.getElementById('bird'+id);
		this.setEventListeners = function(){
			this.html.addEventListener("click",this.checkValid);
		}
		this.changeColor = function(colorId){
			if(colorId<4){
				this.html.setAttribute("color",colorId)
			}
			for(var i=0;i<this.lightElems.length;i++){
				this.lightElems[i].style.fill=game.colorList[colorId][0];
			}
			for(var i=0;i<this.darkElems.length;i++){
				this.darkElems[i].style.fill = game.colorList[colorId][1];
			}
		}
		this.checkValid= function(){
			if(game.currentTime==11){
				for(var i=0;i<4;i++){
					if(game.colorOrder[i]==this.getAttribute("color")) break;
				}
				//add 10 if answer is correct
				if(i==game.clickNumber){
					game.score.add(10);
					game.clickNumber++;
					if(game.clickNumber==4){
						game.init(1);
					}
				}else{
					game.end();
				}
			}
		}
	}

	function ColorCircle(id){
		this.html=document.getElementById('circle'+id);
		this.changeColor= function(colorId){
			this.html.style.fill=game.colorList[colorId][0];
		}
	}

	//Source of all the fun
	function Game(){
		//init variables
		this.birds=new Array();
		this.colorCircles=new Array();
		this.colorOrder=[0,1,2,3];
		this.birdColors=[0,1,2,3];
		this.colorList=[["#2AB1D6","#22697D"],["#B8D357","#84A11A"],["#FF5E49","#DE3721"],["#7C3B80","#561C59"],["#958572","#231F1F"]];
		this.score = new Score();
		this.timeLimit=10;
		this.currentTime;
		for(var i=0;i<4;i++){
			this.birds[i]=new Bird(i);
			this.colorCircles[i]=new ColorCircle(i);
		}

		this.init= function(state){
			document.getElementById('end-overlay').style.display = 'none';
			document.getElementById('box').style.display = 'none';		
			document.getElementById('timer_text').style.display="block";
			for(var i=0;i<4;i++){
				this.birds[i].html.style.cursor="default";
			}
			if(state==0){
				this.score.set(0);			
			}
			this.clickNumber=0;
			this.setColorOrder();
			this.currentTime=0;
			this.animationLoop();	
		}

		this.hideOverlay =function(state){
			if(state==0){
				document.getElementById('start-overlay').style.display = 'none';		
			}else{
				document.getElementById('end-overlay').style.display = 'none';	
			}
			this.init(0);			
		}

		this.setEventListeners = function(){
			//Setting up event listeners 
			document.getElementById('start-button').addEventListener("click", function(){
				game.hideOverlay(0);
			});
			document.getElementById('end-button').addEventListener("click", function(){
				game.hideOverlay(1);
			});
			for(var i=0;i<4;i++){
				this.birds[i].setEventListeners();
			}
		}

		//Shuffle the color order 
		this.setColorOrder= function(){
			shuffle(this.colorOrder);
			shuffle(this.birdColors);
			for(var i=0;i<4;i++){
				this.colorCircles[i].changeColor(this.colorOrder[i]);
				this.birds[i].changeColor(this.birdColors[i]);
			}
		}

		this.animationLoop= function(){
			if(game.currentTime++ < game.timeLimit){
				document.getElementById('timer_text').innerHTML='00:'+game.currentTime+' sec';
				setTimeout(game.animationLoop, 1000);
			}else{
				document.getElementById('timer_text').style.display="none";
				document.getElementById('box').style.display="block";
				for(var i=0;i<4;i++){
					game.birds[i].changeColor(4);
					game.birds[i].html.style.cursor="pointer";
				}
			}
		}

		this.end= function(){
			document.getElementById('end-overlay').style.display = 'block';	
		}
	}
	
	//Utility functions
	function shuffle(array) {
  		var currentIndex = array.length, temporaryValue, randomIndex;
		
  		// While there remain elements to shuffle...
  		while (0 !== currentIndex) {
		
    		// Pick a remaining element...
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;
		
    		// And swap it with the current element.
    		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  		}
		
  		return array;
	}
}

window.onload=function(){
	colorLadder();
};