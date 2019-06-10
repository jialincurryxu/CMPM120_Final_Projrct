//the player prefab
theVoid.player = function() {
    this.speed = 200;
}

theVoid.player.prototype = {
    createPlayer: function(playerX, playerY) {
    	//set up the main body for the player
        theVoid.playerBody = Mygame.phaser.add.sprite( playerX, playerY, 'dude', "stand");
        theVoid.playerBody.scale.setTo(0.5);
        theVoid.playerBody.anchor.setTo(0.5);
        Mygame.phaser.physics.enable(theVoid.playerBody, Phaser.Physics.ARCADE);
        theVoid.playerBody.body.collideWorldBounds = true;
        theVoid.playerBody.body.setSize(0.6*theVoid.playerBody.width/Math.abs(theVoid.playerBody.scale.x), 0.8*theVoid.playerBody.height/Math.abs(theVoid.playerBody.scale.y), 0.2*theVoid.playerBody.width/Math.abs(theVoid.playerBody.scale.x), 0.1*theVoid.playerBody.height/Math.abs(theVoid.playerBody.scale.y));
        Mygame.phaser.camera.follow(theVoid.playerBody, Phaser.Camera.FOLLOW_LOCKON, 0.2, 0.2);

        //add animation for player
        theVoid.playerBody.animations.add('stand',['stand'],1,true);
        theVoid.playerBody.animations.add('walk',['walk1','walk2'],7,true);
        this.walk = Mygame.phaser.add.audio('walk',0.1);  
        this.blink = Mygame.phaser.add.audio('blink',0.1);  
    },

    playerUpdate: function() {
    	//handle the collision for player
        Mygame.phaser.physics.arcade.collide(theVoid.playerBody, theVoid.levelMap.walls);
        Mygame.phaser.physics.arcade.overlap(theVoid.playerBody, theVoid.levelExit, this.exitLevel, null, theVoid);

        //handle the player input
        if (theVoid.playerInput.cursors.left.isDown) {
            theVoid.playerBody.scale.x=0.5;
            theVoid.playerBody.body.velocity.x = this.speed * -1;
            this.checkBlink(1);
        } else if (theVoid.playerInput.cursors.right.isDown) {
            theVoid.playerBody.scale.x=-0.5;
            theVoid.playerBody.body.velocity.x = this.speed; 
            this.checkBlink(2);
        } else {
            theVoid.playerBody.body.velocity.x = 0; 
        }
        
        if (theVoid.playerInput.cursors.up.isDown) {
            theVoid.playerBody.body.velocity.y = this.speed * -1;            
            this.checkBlink(3);
        } else if (theVoid.playerInput.cursors.down.isDown) {
            theVoid.playerBody.body.velocity.y = this.speed;             
            this.checkBlink(4);
        } else {
            theVoid.playerBody.body.velocity.y = 0;
        }

        if (theVoid.playerBody.body.velocity.x!=0||theVoid.playerBody.body.velocity.y!=0){
            theVoid.playerBody.animations.play('walk');
            this.walk.play('',0,1,false,false);
            nowTime -= 5;
        } else {
            theVoid.playerBody.animations.play('stand');
        }
        
    },

    checkBlink: function(flag) {
    	//handle the blink skill input
        if (theVoid.playerInput.space.downDuration(1)){
            theVoid.playerBody.body.enable=false;
            switch(flag){
                case 1:
                theVoid.playerBody.body.moveTo(50, 400, 180);
                break;

                case 2:
                theVoid.playerBody.body.moveTo(50, 400, 0);
                break;

                case 3:
                theVoid.playerBody.body.moveTo(50, 400, 270);
                break;

                case 4:
                theVoid.playerBody.body.moveTo(50, 400, 90);
                break;
            }
            theVoid.playerBody.body.enable=true;
            nowTime -= 500;
            this.blink.play('',0,1,false,false);
        }
    },

    killPlayer: function(){
    	//the game should end the the player run out of time
      	nowTime = 0;
      	theVoid.playerBody.body.velocity.x = 0;
      	theVoid.playerBody.body.velocity.y = 0;
      	theVoid.playerBody.kill();

      	//some cool camera effects
      	Mygame.phaser.camera.fade('#F41111', 500);

      	Mygame.phaser.camera.onFadeComplete.add(function() {
        	Mygame.phaser.state.start('oot'); 
      		},this);        
    },

    exitLevel: function(){
    	//let player go into next level when hit the exit
        Mygame.phaser.camera.fade('#000000', 300);
        theVoid.playerBody.body.velocity.x = 0;
        theVoid.playerBody.body.velocity.y = 0;
        theVoid.bgmusic.stop();

        Mygame.phaser.camera.onFadeComplete.add(function() {
          Mygame.phaser.state.start('levelEnd'); 
        },this);  
    }

}