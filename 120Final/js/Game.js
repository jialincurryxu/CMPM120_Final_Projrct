//the main game state
theVoid.Game = function (game) {
	theVoid.bgmusic;
	theVoid.hitSound;
	this.playerInput = {};
	Mygame.phaser = game;
};

theVoid.Game.prototype = {
	create: function () {
		console.log('into game');

		//set up time for each level
		maxTime = 60000 - 10000 * level + (1000000000 * deBug);
		nowTime = maxTime;
		console.log(nowTime);

		//add the bottom ground img
		this.add.sprite(0, 0,'gr');

		theVoid.playerInput = {};
		this.classes = {};

		//add the music
		theVoid.bgmusic = this.add.audio('bgm2',0.5,true);
        theVoid.bgmusic.play();

        //add the sound effect
        theVoid.hitSound = this.add.audio('hit',0.1);  

        //create the map
		this.classes.mapClass = new theVoid.Dungeon();
		this.mapLocations = this.classes.mapClass.createMap();

		//handle the player input
		theVoid.playerInput.cursors = Mygame.phaser.input.keyboard.createCursorKeys();
		theVoid.playerInput.space = Mygame.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
		theVoid.playerInput.S = Mygame.phaser.input.keyboard.addKey(Phaser.Keyboard.S); 

		//add the player
		this.classes.playerClass = new theVoid.player();
		this.classes.playerClass.createPlayer(this.mapLocations.player.x, this.mapLocations.player.y);

		//add the enemies
		this.classes.enemyClass = new theVoid.saw();
        this.classes.enemyClass.createSaw(); 
        this.mapLocations.enemies.forEach(function ( enemyObj ) {
            this.classes.enemyClass.sawSpawn( enemyObj.x, enemyObj.y );
        }, this);
		
		//set up the time bar
		this.classes.timeClass = {};
		this.classes.timeClass.text = this.add.text(50,30,"Time Left",{font:'Arial',fontSize: '25px', fill: '#ffffff'});
		this.classes.timeClass.text.fixedToCamera = true;
		this.classes.timeClass.bar = this.add.sprite(200,30,'bar');
		this.classes.timeClass.bar.fixedToCamera = true;
		this.classes.timeClass.bar.originalWidth = this.classes.timeClass.bar.width;

		//start the physics
		this.physics.startSystem( Phaser.Physics.ARCADE );
	},

	update: function() {
		//normal update habdle
		this.classes.playerClass.playerUpdate();
		this.classes.enemyClass.updateSaw();
		Mygame.phaser.physics.arcade.collide(theVoid.playerBody,theVoid.enemies,this.hit,null,theVoid);

		//change the time bar length based on the time left
		this.classes.timeClass.bar.width = (nowTime / maxTime) * this.classes.timeClass.bar.originalWidth;
		
		// end the game when time = 0
		if (nowTime<=0){
			theVoid.bgmusic.stop();
			this.classes.playerClass.killPlayer();
		}

		//debug options
		if (deBug && theVoid.playerInput.S.downDuration(1)) {
			nowTime = 100;
		}

	},

    render: function(){
    	//debug options
    	if (deBug) {
    		this.game.debug.text(nowTime+'\n'+maxTime, 2, 14, "#00ff00");
    		this.game.debug.body(theVoid.levelExit);
    	}
    },

    hit:function(){
    	//set up the knock back for the enemies
    	if (theVoid.playerInput.cursors.up.isDown){
        	theVoid.playerBody.position.y+=75;
    	} else if (theVoid.playerInput.cursors.down.isDown){
        	theVoid.playerBody.position.y-=75;
    	}

    	if (theVoid.playerInput.cursors.left.isDown){
        	theVoid.playerBody.position.x+=75;
    	} else if (theVoid.playerInput.cursors.right.isDown){
        	theVoid.playerBody.position.x-=75;
    	}

    	//set the time penalty
    	nowTime -= 1000;
    	theVoid.hitSound.play();
    }
}