//the prefab for the enemies in the game
theVoid.saw = function() {
    this.speed = 100;
}

theVoid.saw.prototype = {
    createSaw: function() {
        theVoid.enemies = Mygame.phaser.add.group();
    },

    sawSpawn: function(xLoc, yLoc) {
    	//set up the main body of the saw
        var sawBody = Mygame.phaser.add.sprite( xLoc, yLoc, 'saw');
        Mygame.phaser.physics.enable(sawBody, Phaser.Physics.ARCADE);
        sawBody.body.collideWorldBounds = true;
        sawBody.animations.add('spin',[0,1,2,3],10,true);
        sawBody.animations.play('spin');
        sawBody.body.immovable = true;

        //random direction
        sawBody.dir = Mygame.phaser.rnd.integerInRange(1, 4);
        switch (sawBody.dir){
            case 1:
            sawBody.body.velocity.x = this.speed * -1;
            break;

            case 2:
            sawBody.body.velocity.x = this.speed * 1;
            break;

            case 3:
            sawBody.body.velocity.y = this.speed * -1;
            break;

            case 4:
            sawBody.body.velocity.y = this.speed * 1;
            break;
        }

        theVoid.enemies.add( sawBody );
    },

    updateSaw: function() {
    	//collision dection for saw when it hits the walls
      	theVoid.enemies.forEachAlive(function( activeEnemy ) {
        	Mygame.phaser.physics.arcade.collide( activeEnemy, theVoid.levelMap.walls, this.turn, null, this);
        	},this);
    },

    turn: function(activeEnemy, walls){
    	//turn the swa when it hits a wall
        switch(activeEnemy.dir){
            case 1:
            activeEnemy.body.velocity.x = this.speed;
            activeEnemy.dir = 2;
            break;

            case 2:
            activeEnemy.body.velocity.x = -this.speed;
            activeEnemy.dir = 1;
            break;

            case 3:
            activeEnemy.body.velocity.y = this.speed;
            activeEnemy.dir = 4;
            break;

            case 4:
            activeEnemy.body.velocity.y = -this.speed;
            activeEnemy.dir = 3;
            break;
        }
    }
}