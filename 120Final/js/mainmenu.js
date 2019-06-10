//the main menu state
var MainMenu = function (game) {
	var bgmusic;
};

MainMenu.prototype = {
	create: function () {
		if (deBug!=1) {level=1;}
		this.playerInput = {};
		
		//add the bgm
		this.bgmusic = this.add.audio('main',0.5,true);
        this.bgmusic.play();

        //add the background img
        var bg = this.add.sprite(0, 0,'bg');
        bg.scale.setTo(1.5,1.2);

        //add the game title
        var title = this.add.sprite(this.camera.width * 0.5, 180,'title');
        title.anchor.setTo(0.5);

        //add the instruction msg
        this.msg = this.add.text(this.camera.width * 0.5, this.camera.height * 0.7,"Press Space to start your adventure",{font:'Arial',fontSize: '30px', fill: '#ffffff'})
        this.msg.anchor.setTo(0.5);

        this.playerInput.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
	},

	update: function () {
		//catch input
		if (this.playerInput.space.downDuration(1)) {
			this.startGame();
		}
	},

	render: function(){

	},

	startGame: function () { 
		//cool cam effect
		var pick = this.add.audio('pick',0.1);	
		pick.play();	

		this.camera.fade('#000000', 500);

		this.camera.onFadeComplete.add(function() {
		  this.bgmusic.stop();
		  this.state.start('Bgstory'); 
		},this);		
	}
};