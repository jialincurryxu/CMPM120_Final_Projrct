//set up global var.
var game;
var level = 1;
var theVoid = {};
var Mygame = {};
var maxTime = 0;
var nowTime = 0;

//if you are trying to debug/ run through the game as fast as possible
//change this to 1 and press S for most skips and shows the physics body
//--skip the scorlling storys
//--set the time to a very low level
var deBug = 0;

window.onload= function(){

	var game = new Phaser.Game(960, 640, Phaser.AUTO, 'myGame');
	//set states
	game.state.add('Preloader', Preloader);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Bgstory', Bgstory);
	game.state.add('Game', theVoid.Game);
	game.state.add('levelEnd', levelEnd);
	game.state.add('oot', oot);
	
	//start the game
	game.state.start('Preloader');
}