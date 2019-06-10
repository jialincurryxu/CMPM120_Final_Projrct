//oot = out of time, the end screen when you run out of time
var oot = function (game) {

};

oot.prototype = {
	create: function () {
		console.log("into oot")
		this.playerInput = {};

		//add the background img
        var bg = this.add.sprite(0, 0,'bg');
        bg.scale.setTo(1.5,1.2);

        //the text shows the player the game ends
        this.endLine = this.add.text(this.camera.width * 0.5, this.camera.height * 0.5,"You have ran out of time!\nPress space to retry.",{font:'Arial',fontSize: '60px', fill: '#ffffff'});
        this.endLine.anchor.setTo(0.5);
        this.endLine.align = "center";
        this.playerInput.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
    },

    update: function () {
    	//handle the input
    	if (this.playerInput.space.downDuration(1)) {
			var pick = this.add.audio('pick',0.1);	
			pick.play();	

			this.camera.fade('#000000', 500);

			this.camera.onFadeComplete.add(function() {
		  	  this.state.start('Game'); 
			},this);
		}
	}
}