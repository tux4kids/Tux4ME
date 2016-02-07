document.addEventListener('WebComponentsReady', function () {
    var template = document.querySelector('template[is="dom-bind"]');
    template.page = 0; // selected is an index by default
  });

//Following functions are used to load game using iframe within the <id="gamesPage">
//This is done to make the navigation easy and work like ajax request
//And also to save the new loading time of the page form pressing the back button
var gamesPage;
var toolBarContent;
function gameLoader(number)
{
	var num = number;
	//console.log("onclick function working");
	gamesPage = document.getElementById('GamesPage').innerHTML;
	toolBarContent = document.getElementById('toolBar_content').innerHTML;
	//console.log(gamesPage);
	document.getElementById('drawerPanel').setAttribute("force-narrow", "true");
	//console.log('force-narrow="true"');
	if(num === 1)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/migratingFlocks.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#01579b"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#01579b" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Attention</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Migrating flocks</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 2)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/catchTheFlow.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#01579b"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#01579b" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Attention</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Catch the flow</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 3)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/highOrLow.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#00796b"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#00796b" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Memory</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">High or Low</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 4)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/mindMath.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#00796b"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#00796b" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Memory</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Mind math</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 5)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/passiveOn.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#e91e63"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#e91e63" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Reasoning</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Passive On</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 6)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/highClick.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#e91e63"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#e91e63" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Reasoning</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">High click</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 7)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/flashBack.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#673ab7"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#673ab7" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Speed</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Flash back</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 8)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/mathOperations.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#673ab7"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#673ab7" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Speed</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Math operations</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 9)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/doubleTrouble.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#ff5722"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#ff5722" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Flexibiltiy</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Double trouble</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 10)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/driftME.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#ff5722"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#ff5722" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Flexibiltiy</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Drift ME</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else if(num === 11)
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/motioncommotion.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#01579b"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#01579b" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Attention</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Motion Commotion</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	else
	{
	var putContent = '<iframe src="http://tux4me.azurewebsites.net/motioncommotion.html" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading Please wait</iframe> ';
	document.getElementById('GamesPage').innerHTML = putContent;

	var puttoolbarContent = '<paper-toolbar style="background-color:#ff5722"><paper-fab onclick="goBack()"  style="background-color:#ffffff; color:#ff5722" icon="arrow-back" mini></paper-fab><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><div style="font-family:Georgia;font-style: italic;font-size: 15px">Tux4Me</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Flexibiltiy</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Motion Commotion</div><iron-icon icon="chevron-right"></iron-icon><div style="font-family:Georgia;font-style: italic;font-size: 15px">Play</div></paper-toolbar>'
	document.getElementById('toolBar_content').innerHTML = puttoolbarContent;
	}
	

}
function goBack()
{
	//console.log("Go Back clicked");
	document.getElementById('GamesPage').innerHTML = gamesPage;
	document.getElementById('toolBar_content').innerHTML = toolBarContent;
	document.getElementById('drawerPanel').removeAttribute("force-narrow");
}
