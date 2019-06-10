//the transaction between the levels
var levelEnd = function (game) {
	this.bgs;
	this.intro;
	this.bgmusic;
	this.flag;
	this.story;
};

levelEnd.prototype = {
	create: function () {
		console.log("into level end")
		this.playerInput = {};

		//add the background img
        var bg = this.add.sprite(0, 0,'bg');
        bg.scale.setTo(1.5,1.2);

        if (level==5) {
        	//when it's lvl 5, player can see the end of the story
        	this.story = this.add.text(this.camera.width * 0.5, this.camera.height * 0.85,"Lazlo’s has reached the bottom of the dungeon.\n\nBut it is nothing there.\n\nJust an empty throne with layers of dust.\n\nSuddenly, a burst of flames escaped from Lazlo’s body.\n\nAnd thus the sun was born.\n\nDarkness made way for the light.\n\nLazlo’s body becoming the ground underneath.\n\nHumans gained liberty. \n\nYet lost their Immortality,\n\nAnd their hero Lazlo.",{font:'Arial',fontSize: '30px', fill: '#ffffff'});
        	this.story.anchor.x=0.5;
        	this.story.align = "center";

        	this.txt = this.add.text(this.camera.width * 0.5, this.story.y+this.story.height+this.camera.height/2,"You have complete the game!\nThank you for playing.\n The game is from\nZijing Guo & Curry Xu & Shisong Liu(Skylar Liu)\nPress space to keep playing,\nOr press R to restart.",{font:'Arial',fontSize: '30px', fill: '#ffffff'});
        	this.txt.anchor.setTo(0.5);
        	this.txt.align = "center";  
        	level++;
        }else{
        	//when it is not lvl 5, let player procede
        	this.intro = this.add.text(this.camera.width * 0.5, this.camera.height * 0.5,"You have succeed\nlevel "+level+" of the Time Dungeon,\npress space to proceed",{font:'Arial',fontSize: '60px', fill: '#ffffff'});
        	this.intro.anchor.setTo(0.5);
        	this.intro.align = "center";
        	level++;
        }

        //catch player input
        this.playerInput = {};
		this.playerInput.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
		this.playerInput.r = this.input.keyboard.addKey(Phaser.Keyboard.R); 
		this.playerInput.s = this.input.keyboard.addKey(Phaser.Keyboard.S); 
    },

    update: function () {
    	//make the text move if it is showing the end text
		if (level == 6){
			this.story.y -= 0.5;

			if (this.story.y+this.story.height < 0){
				this.story.kill();
				this.flag = 1;
			} else {
				this.txt.y -= 0.5;
			}

			//give player the choice to keep playing or retry
			if (this.playerInput.space.downDuration(1)&&this.flag||this.playerInput.s.downDuration(1)&&deBug) {
				this.startGame();
			} else if (this.playerInput.r.downDuration(1)) {
				var pick = this.add.audio('pick',0.1);	
				pick.play();	

				this.camera.fade('#000000', 500);

				this.camera.onFadeComplete.add(function() {
		  		  this.state.start('MainMenu'); 
				},this);
			}
		} else if (this.playerInput.space.downDuration(1)) {
			//just let player keep playing
			this.startGame();
		} 
	},

	startGame: function () { 
		//level transaction
		var pick = this.add.audio('pick',0.1);	
		pick.play();	

		this.camera.fade('#000000', 500);

		this.camera.onFadeComplete.add(function() {
		  this.state.start('Game'); 
		},this);		
	}
}