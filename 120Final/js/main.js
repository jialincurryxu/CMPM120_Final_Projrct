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
var mbg;
var mcollision;
var map;
var mobj;
var mLvl1;
var doors;

var Start = function(game) {
	this.doors;
};
Start.prototype = {
    init: function(){
        
    },

    preload: function(){

    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('mStart');
        map.addTilesetImage('tile','tile');
        mbg = map.createLayer('bg');
        mcollision = map.createLayer('collision');
        map.setCollision(2,true,'collision');

        dude = new Dude(game,'dude',600,600);
        game.add.existing(dude);

        doors = game.add.group();
        doors.enableBody = true;
        map.createFromObjects('door', 3, null, 0, true, false, doors);
        console.log(doors.countLiving());
    },

    update: function(){
        game.physics.arcade.collide(dude, mcollision);
        game.physics.arcade.overlap(dude, doors, this.nextM, null, this);
    },

    render:function() {
        game.debug.body(dude);
    },

    nextM: function(dude, doors) {
        /*if (600<dude.body.x<800){
            dude.body.y = 1100 - dude.body.y;
        } 
        if (500<dude.body.y<700){
            dude.body.x = 1100 - dude.body.x;
        }*/
        console.log('door!');
        game.state.start('Map1',true,false,dude.body.x,dude.body.y);
    }
    } 

    var Map1 = function(game) {
    	this.bodyX;
    	this.bodyY;
    };
    Map1.prototype = {
    init: function(bodyX,bodyY) {
    	this.bodyX = 0;
    	this.bodyY = 0;
    	console.log(bodyX+'  '+bodyY);
        if (500<bodyX<700){
            this.bodyY = 1100 - bodyY;
            this.bodyX = bodyX;
        } else {
            this.bodyX = 1150 - bodyX;
            this.bodyY = bodyY;
        }
        console.log(this.bodyX+'  '+this.bodyY);
    },

    preload: function() {
        
    },

    // make the game over screen
    create: function() {
        map = game.add.tilemap('mLvl1');
        map.addTilesetImage('tile','tile');
        mbg = map.createLayer('bg');
        mcollision = map.createLayer('collision');
        map.setCollision(2,true,'collision');
        doors = game.add.group();
        doors.enableBody = true;
        map.createFromObjects('door', 3, null, 0, true, false, doors);
        console.log(doors.countLiving());

        dude = new Dude(game,'dude',this.bodyX,this.bodyY);
        game.add.existing(dude);
        game.world.bringToTop(dude);
    },

    render:function() {
        game.debug.body(dude);
    },

    update: function(){
        game.physics.arcade.collide(dude, mcollision);

        
    },
    nextM: function() {
        /*if (600<dude.body.x<800){
            dude.body.y = 1100 - dude.body.y;
        } 
        if (500<dude.body.y<700){
            dude.body.x = 1100 - dude.body.x;
        }*/
        
        game.state.start('Start');
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
game.state.add('Map1', Map1);
//game.state.add('Map2', Map2);
game.state.add('GameOver', GameOver);
game.state.add('Help', Help);
game.state.add('Statsup', Statsup);
game.state.start('MainMenu');

