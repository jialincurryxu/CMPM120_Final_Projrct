//the state showing player the story
var Bgstory = function (game) {
	this.bgs;
	this.intro;
	this.bgmusic;
	this.flag;
};

Bgstory.prototype = {
	create: function () {
		this.playerInput = {};

		//add the music
		this.bgmusic = this.add.audio('bgm1',0.5,true);
        this.bgmusic.play();

        //add the background img
        var bg = this.add.sprite(0, 0,'bg');
        bg.scale.setTo(1.5,1.2);

        //create the text for story and instruction
        this.bgs = this.add.text(this.camera.width * 0.5, this.camera.height * 0.85,"Legend has it that the world was once pitch black.\n\nOnly the God ‘Tempo’ Existed.\n\nAnd its puppets, ‘Mankind’.\n\nHumans were granted eternal life.\n\nYet stripped of their freedom.\n\nLiving humbly under absolute authority.\n\nA courageous warrior, Lazlo.\n\nVoiced the desire to be free.\n\nIn return receiving the fury of God Tempo.\n\nThis instigated hostility from the contented.\n\nBut Lazlo decides to rise and defy destiny.\n\nDetermined to come to the tower where God lives \nand challenge authority.\n\nThis is the story of ‘The Time Dungeon’.",{font:'Arial',fontSize: '30px', fill: '#ffffff'});
        this.bgs.anchor.x=0.5;
        this.bgs.align = "center";
        
        this.intro = this.add.text(this.camera.width * 0.5, this.bgs.y+this.bgs.height+this.camera.height/2,"Use arrow keys to move and space to dash\nYou will loss when your time bar goes empty\nPress Space to start the game",{font:'Arial',fontSize: '30px', fill: '#ffffff'});
        this.intro.anchor.setTo(0.5);
        this.intro.align = "center";

        //handle the player input
        this.playerInput.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        this.playerInput.s = this.input.keyboard.addKey(Phaser.Keyboard.S); 
        this.flag = 0;
	},

	update:function() {
		//make the text moving
		this.bgs.y -= 0.5;

		if (this.bgs.y+this.bgs.height < 0){
			this.bgs.kill();
			this.flag = 1;
		} else {
			this.intro.y -= 0.5;
		}

		//handle the player input to procede
		if (this.playerInput.space.downDuration(1)&&this.flag||this.playerInput.s.downDuration(1)&&deBug) {
			this.startGame();
		}
	},

	startGame: function () { 
		//state transaction
		var pick = this.add.audio('pick',0.1);	
		pick.play();	

		this.camera.fade('#000000', 500);

		this.camera.onFadeComplete.add(function() {
		  this.bgmusic.stop();
		  this.state.start('Game'); 
		},this);		

	}
}