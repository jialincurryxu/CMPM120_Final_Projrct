var game = new Phaser.Game(1200, 1200, Phaser.AUTO);
var title;
var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function(){
        game.load.tilemap('mStart','assets/tilemaps/mStart.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('mLvl1','assets/tilemaps/mLvl1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tile','assets/tilemaps/ver2.png');
        game.load.image('dude','assets/img/dummy.png');
        game.load.image('play','assets/img/play.png');
        game.load.image('help','assets/img/help.png');
        game.load.audio('bg','assets/audio/bg_1.mp3');

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    create: function(){
        game.stage.backgroundColor = '#9b7653';
        title = game.add.text(game.width/2, game.height/3 , "Stand/By the Time",{font:'Source Sans Pro',fontSize: '80px', fill: '#ffffff',wordWrap: true, wordWrapWidth: game.width - 240});
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        cursors = game.input.keyboard.createCursorKeys();
        var playB = game.add.button(game.width/3, 2*game.height/3, 'play',this.next,this);
        playB.anchor.set(0.5);
        var helpB = game.add.button(2*game.width/3, 2*game.height/3, 'help',this.helpT,this);
        helpB.anchor.set(0.5);

        var bgmusic = game.add.audio('bg',0.5,true);
        bgmusic.play();
    },

    update: function(){
        if (cursors.up.isDown){
            game.state.start('Start');
        } 
    },
    next: function(){
    	game.state.start('Start');
    },
    helpT: function(){
    	title.text = 'This is the place holder for background story, use cursors to move the character.'
    }
}

var dude;
var mStart;
var map;
var mLvl1;

var Start = function(game) {};
Start.prototype = {
    init: function(){
        
    },

    preload: function(){

    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('mStart');
        map.addTilesetImage('tile','tile');
        mStart = map.createLayer('bg');
        mStart = map.createLayer('collision');
        map.setCollision(2,true,'collision');
        //map.setTileIndexCallback(3, this.nextM, this);


        dude = new Dude(game,'dude',600,600);
        game.add.existing(dude);
        
    },

    update: function(){
        game.physics.arcade.collide(dude, mStart);
    },

    render:function() {
        game.debug.body(dude);
    },

    nextM: function() {
        if (600<dude.body.x<800){
            dude.body.y = 1100 - dude.body.y;
        } 
        if (500<dude.body.y<700){
            dude.body.x = 1100 - dude.body.x;
        }
        game.state.start('Map1',false,false);
    }
    }

    var startMap = function(game) {};
startMap.prototype = {
    init: function() {
        
    },

    preload: function() {
        
    },

    create: function() {
        map = game.add.tilemap('mStart');
        map.addTilesetImage('tile','tile');

        mStart = map.createLayer('level');
        map.setCollision(2,'level');
        map.setTileIndexCallback(3, this.nextM, this);
        game.world.bringToTop(dude);
    },
    render:function() {
        game.debug.body(dude);
    },

    update: function(){
        game.physics.arcade.collide(dude, mLvl1);

        
    },
    nextM: function() {
        if (600<dude.body.x<800){
            dude.body.y = 1100 - dude.body.y;
        } 
        if (500<dude.body.y<700){
            dude.body.x = 1100 - dude.body.x;
        }
        game.state.start('Map1',false,false);
    }
    } 
    

    var Map1 = function(game) {};
    Map1.prototype = {
    init: function() {
        
    },

    preload: function() {
        
    },

    // make the game over screen
    create: function() {
        map = game.add.tilemap('mLvl1');
        map.addTilesetImage('tile','tile');

        mLvl1 = map.createLayer('level');
        map.setCollision(2,'level');
        map.setTileIndexCallback(3, this.nextM, this);
        game.world.bringToTop(dude);
    },

    render:function() {
        game.debug.body(dude);
    },

    update: function(){
        game.physics.arcade.collide(dude, mLvl1);

        
    },
    nextM: function() {
        if (600<dude.body.x<800){
            dude.body.y = 1100 - dude.body.y;
        } 
        if (500<dude.body.y<700){
            dude.body.x = 1100 - dude.body.x;
        }
        map.setCollision(2,false,'level');
        game.state.start('startMap',false,false);
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

var Help = function(game) {};
Help.prototype = {
    init: function() {
        
    },

    preload: function() {
        
    },

    // make the game over screen
    create: function() {
        
    },

    update: function(){
        
        } 
    }

var Statsup = function(game) {};
Statsup.prototype = {
    init: function() {
        
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
game.state.add('Start', Start);
game.state.add('startMap', startMap);
game.state.add('Map1', Map1);
//game.state.add('Map2', Map2);
game.state.add('GameOver', GameOver);
game.state.add('Help', Help);
game.state.add('Statsup', Statsup);
game.state.start('MainMenu');

