function Dude(game, key, posX, posY, time) {
	Phaser.Sprite.call(this, game, posX, posY, key);

	game.physics.arcade.enable(this);
	this.anchor.set(0.5);
	this.body.setSize(0.6*this.width, 0.8*this.height, 0.2*this.width, 0.1*this.height);
	this.time = time;
}


Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;

Dude.prototype.update = function() {
	this.body.velocity.y = 0;
	this.body.velocity.x = 0;

	if (cursors.up.isDown){
        this.body.velocity.y = -500;
    } else if (cursors.down.isDown){
        this.body.velocity.y = 500;
    }

    if (cursors.left.isDown){
        this.body.velocity.x = -500;
        this.scale.setTo(1,1);
    } else if (cursors.right.isDown){
        this.body.velocity.x = 500;
        this.scale.setTo(-1,1);
    }

    if (this.body.deltaX()>10){
    	this.time-=10;
    }
}