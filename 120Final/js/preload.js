//the preloader for everything
var Preloader = function (game) {

};

Preloader.prototype = {
	preload: function () {
		// Load in all the imgs
		this.load.atlas('dude', 'assets/img/dude.png', 'assets/img/sprites.json');	
		this.load.spritesheet('saw','assets/img/saw.png', 64, 32);
		this.load.image('bg', 'assets/img/bg.png');	
		this.load.image('wall', 'assets/img/wall.png');
		this.load.image('ground', 'assets/img/ground.png');						
		this.load.image('exit', 'assets/img/exit.png');	
		this.load.image('title', 'assets/img/title.png');	
		this.load.image('gr', 'assets/img/realground.png');
		this.load.image('bar', 'assets/img/white.png');

		// Load in the game audio
		this.load.audio('walk','assets/audio/Walk.mp3');
		this.load.audio('pick','assets/audio/Pickup.mp3');
		this.load.audio('bgm1','assets/audio/simple.mp3');
		this.load.audio('bgm2','assets/audio/complicate.mp3');
		this.load.audio('main','assets/audio/main.mp3');
		this.load.audio('blink','assets/audio/blink.mp3');
		this.load.audio('hit','assets/audio/hit.mp3');
	},

	create: function () {
		console.log('pass preload');
	},

	update: function () {
		this.state.start('MainMenu'); 
	}
};
