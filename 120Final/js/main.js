var game = new Phaser.Game(600, 384, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function(){
        game.load.tilemap('map','assets/tilemaps/start.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tile','assets/tilemaps/gridtiles.png');
        //game.load.image('dude','assets/img/dummy.png');
        game.load.image('dude','assets/img/frame-1.png');
    },

    create: function(){
        game.stage.backgroundColor = '#9b7653';
        var title = game.add.text(game.width/2, game.height/2 , "Stand/By the Time",{font:'Source Sans Pro',fontSize: '50px', fill: '#ffffff'});
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        cursors = game.input.keyboard.createCursorKeys();
    },

    update: function(){
        if (cursors.up.isDown){
            game.state.start('Play');
        } 
    }
}

var dude;
var mStart;
var map;


var Play = function(game) {
    
};
Play.prototype = {
    preload: function(){
        
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('map');
        map.addTilesetImage('tile','tile');

        mStart = map.createLayer('start');
        map.setCollision(132);
        map.setTileIndexCallback(64, this.nextM, this);

        dude = game.add.sprite(160,160,'dude');
        dude.scale.setTo(32/dude.height,32/dude.height);
        game.physics.arcade.enable(dude);
        //dude.body.stopVelocityOnCollide = true;

    },

    update: function(){
        game.physics.arcade.collide(dude, mStart);

        /*if (cursors.up.downDuration(1)){
            dude.body.y-=32;
        } else if (cursors.down.downDuration(1)){
            dude.body.y+=32;
        } else if (cursors.left.downDuration(1)){
            dude.body.x-=32;
        } else if (cursors.right.downDuration(1)){
            dude.body.x+=32;
        }*/

        if (cursors.up.downDuration(1)){
            dude.body.moveTo(100,-32,90);
        } else if (cursors.down.downDuration(1)){
            dude.body.moveTo(100,32,90);
        } else if (cursors.left.downDuration(1)){
            dude.body.moveTo(100,-32,0);
        } else if (cursors.right.downDuration(1)){
            dude.body.moveTo(100,32,0);
        }
        
        /*if (cursors.up.downDuration(1)){
            dude.body.velocity.y = -320;
        } else if (cursors.down.downDuration(1)){
            dude.body.velocity.y = 320;
        } else if (cursors.left.downDuration(1)){
            dude.body.velocity.x = -320;
        } else if (cursors.right.downDuration(1)){
            dude.body.velocity.x = 320;
        }
        game.time.events.add(500, function () {
                dude.body.velocity.x = 0;
                dude.body.velocity.y = 0;
            }, this);﻿*/



    },
    render:function() {
        game.debug.body(dude);
    },
    nextM: function() {
        if (160<dude.body.x<200){
            dude.body.y = 384 - dude.body.y;
        } else {
            dude.body.x = 384 - dude.body.x;
        }
    }
    }


// the game over state
var GameOver = function(game) {};
GameOver.prototype = {
    init: function(score) {
        
    },

    preload: function() {
        
    },

    // make the game over screen
    create: function() {
        
    },

    update: function(){
        
        } 
    }





// Set up the state manager and start from main menu
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');