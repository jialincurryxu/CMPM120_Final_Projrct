var game = new Phaser.Game(1200, 1200, Phaser.AUTO);
var title;
var MainMenu = function(game) {};
MainMenu.prototype = {
	//the one and only preload
    preload: function(){
        game.load.tilemap('mStart','assets/tilemaps/mStart.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('mLvl1','assets/tilemaps/mLvl1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('mLvl2','assets/tilemaps/mLvl2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tile','assets/tilemaps/ver2.png');
        game.load.image('dude','assets/img/dummy.png');
        game.load.image('play','assets/img/play.png');
        game.load.image('help','assets/img/help.png');
        game.load.image('sword','assets/img/sword.png');
        game.load.image('shield','assets/img/shield.png');
        game.load.image('monster','assets/img/monster.png');
        game.load.image('trophy','assets/img/golden_trophy.png');
        game.load.audio('bg','assets/audio/bg_1.mp3');

        //rescale the game
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    create: function(){
    	//give thestart screen a color
        game.stage.backgroundColor = '#9b7653';
        //the title
        title = game.add.text(game.width/2, game.height/3 , "Time Tower",{font:'Source Sans Pro',fontSize: '50px', fill: '#ffffff',wordWrap: true, wordWrapWidth: game.width - 240});
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        //enable input & create the buttons
        cursors = game.input.keyboard.createCursorKeys();
        var playB = game.add.button(game.width/3, 2*game.height/3, 'play',this.next,this);
        playB.anchor.set(0.5);
        var helpB = game.add.button(2*game.width/3, 2*game.height/3, 'help',this.helpT,this);
        helpB.anchor.set(0.5);
        //play the music!
        var bgmusic = game.add.audio('bg',0.5,true);
        bgmusic.play();
    },

    update: function(){
    	//catch the next level request
        if (cursors.up.isDown){
            game.state.start('Start',true,false,600,600,true);
        } 
    },
    next: function(){
    	//catch the next level request
    	game.state.start('Start',true,false,600,600,true);
    },
    helpT: function(){
    	//Waiting for more detailed story to replace it with a proper state
    	title.text = 'This is the place holder for background story, use arrow keys to move the character, picking any power will reduce the total time you have left. You lose when you have no time left'
    }
}

//init all the global vars
var dude;
var mbg;
var mcollision;
var map;
var mobj;
var mLvl1;
var doors;
var time;
var timeText;
var def=5;
var atk=5;
var trophy;

var Start = function(game) {
	this.doors;
	this.bodyX;
    this.bodyY;
    this.first;
};
Start.prototype = {
    init: function(bodyX,bodyY,first) {
    	//hanlde the situation when the first and !first time enter the room
    	this.bodyX = 600;
    	this.bodyY = 600;
    	this.first = false;
    	this.first = first;
    	console.log(bodyX+'  '+bodyY);
    	if (!this.first){
        if (500<bodyX<700){
            this.bodyY = 1100 - bodyY;
            this.bodyX = bodyX;
        } else {
            this.bodyX = 1150 - bodyX;
            this.bodyY = bodyY;
        }
    }else {
    	time = 10000;
    }
        console.log(this.bodyX+'  '+this.bodyY);
    
    },

    preload: function(){

    },

    create: function(){
        def=5;
        atk=5;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //add the map
        map = game.add.tilemap('mStart');
        map.addTilesetImage('tile','tile');
        mbg = map.createLayer('bg');
        mcollision = map.createLayer('collision');
        map.setCollision(2,true,'collision');
        //add the player 
        dude = new Dude(game,'dude',this.bodyX,this.bodyY);
        game.add.existing(dude);
        //add the doors
        doors = game.add.group();
        doors.enableBody = true;
        map.createFromObjects('door', 3, null, 0, true, false, doors);
        //add the info text
        timeText = game.add.text(100,100,"Your time: "+time+'\n'+'Atk: '+atk+'\n'+'Def: '+def,{font:'Source Sans Pro',fontSize: '30px', fill: '#ffffff'});

        console.log(doors.countLiving());
    },

    update: function(){
    	//catch the collision
        game.physics.arcade.collide(dude, mcollision);
        game.physics.arcade.overlap(dude, doors, this.nextM, null, this);

        //reduce time when walking
        if (dude.body.deltaX()!=0||dude.body.deltaY()!=0){
        	time -= 10;
        	timeText.text = "Your time: "+time+'\n'+'Atk: '+atk+'\n'+'Def: '+def;
        }
        if (time<=0){
        	game.state.start('GameOver',true,false,true);
        }
    },

    render:function() {
        //game.debug.body(dude);
    },

    nextM: function(dude, doors) {
        console.log('door!');
        //enter the next room
        game.state.start('Map1',true,false,dude.body.x,dude.body.y-100);
    }
    } 

    var Map1 = function(game) {
    	this.bodyX;
    	this.bodyY;
    	this.sword;
    	this.shield;
    };
    Map1.prototype = {
    init: function(bodyX,bodyY) {
    	
            this.bodyY = 1100 - bodyY;
            this.bodyX = bodyX;
        
        
    },

    preload: function() {
        
    },

    // make the game over screen
    create: function() {
    	//create the map & all items
        map = game.add.tilemap('mLvl1');
        map.addTilesetImage('tile','tile');
        mbg = map.createLayer('bg');
        mcollision = map.createLayer('collision');
        map.setCollision(2,true,'collision');
        doors = game.add.group();
        doors.enableBody = true;
        map.createFromObjects('door', 3, null, 0, true, false, doors);
        shield = game.add.group();
        shield.enableBody = true;
        map.createFromObjects('powerup', 4, 'shield', 0, true, false, shield);
        sword = game.add.group();
        sword.enableBody = true;
        map.createFromObjects('powerup', 5, 'sword', 0, true, false, sword);
        console.log(doors.countLiving()+'  '+sword.countLiving()+'  '+shield.countLiving());

        //new dude every room
        dude = new Dude(game,'dude',this.bodyX,this.bodyY);
        game.add.existing(dude);
        game.world.bringToTop(dude);

        //new text
        timeText = game.add.text(100,100,"Your time: ",{font:'Source Sans Pro',fontSize: '30px', fill: '#ffffff'});
    	timeText.text += time; 
    },

    render:function() {
        //game.debug.body(dude);
    },

    update: function(){
    	// handle all kinds of collision
        game.physics.arcade.collide(dude, mcollision);
        game.physics.arcade.overlap(dude, doors, this.nextM, null, this);
        game.physics.arcade.overlap(dude, shield, this.defup, null, this);
        game.physics.arcade.overlap(dude, sword, this.atkup, null, this);

        if (dude.body.deltaX()!=0||dude.body.deltaY()!=0){
        	//you walk, you lose time
        	time -= 10;
        	
        }

        //update the time
        timeText.text = "Your time: "+time+'\n'+'Atk: '+atk+'\n'+'Def: '+def;

        if (time<=0){
        	game.state.start('GameOver',true,false,true);
        }
    },
    nextM: function() {
        /*if (600<dude.body.x<800){
            dude.body.y = 1100 - dude.body.y;
        } 
        if (500<dude.body.y<700){
            dude.body.x = 1100 - dude.body.x;
        }*/
        if (dude.body.y<500){
        	game.state.start('Start',true,false,dude.body.x,dude.body.y,false);
    	} else {
    		game.state.start('Map2',true,false,dude.body.x,dude.body.y);
    	}
    },
    defup:function(player, shield){
    	shield.kill();
    	time -= 500;
    	def += 5;
    },
    atkup:function(player, sword){
    	sword.kill();
    	time -= 500;
    	atk += 5;
    }
    }


var Map2 = function(game) {
    	this.bodyX;
    	this.bodyY;
    	this.sword;
    	this.shield;
    };
    Map2.prototype = {
    init: function(bodyX,bodyY) {
    	this.bodyY = 1200 - bodyY;
        this.bodyX = bodyX;
    	
    },

    preload: function() {
        
    },

    // make the game over screen
    create: function() {
    	//create the map & all items
        map = game.add.tilemap('mLvl2');
        map.addTilesetImage('tile','tile');
        mbg = map.createLayer('bg');
        mcollision = map.createLayer('collision');
        map.setCollision(2,true,'collision');
        doors = game.add.group();
        doors.enableBody = true;
        map.createFromObjects('door', 3, null, 0, true, false, doors);
        monster = game.add.group();
        monster.enableBody = true;
        map.createFromObjects('monster', 4, 'monster', 0, true, false, monster);

        console.log(doors.countLiving()+'  '+monster.countLiving());

        //new dude every room
        dude = new Dude(game,'dude',this.bodyX,this.bodyY);
        game.add.existing(dude);
        game.world.bringToTop(dude);

        //new text
        timeText = game.add.text(100,100,"Your time: ",{font:'Source Sans Pro',fontSize: '30px', fill: '#ffffff'});
    	timeText.text += time; 
    },

    render:function() {
        //game.debug.body(dude);
    },

    update: function(){
    	// handle all kinds of collision
        game.physics.arcade.collide(dude, mcollision);
        game.physics.arcade.overlap(dude, doors, this.nextM, null, this);
        game.physics.arcade.overlap(dude, monster, this.ifKill, null, this);

        if (dude.body.deltaX()!=0||dude.body.deltaY()!=0){
        	//you walk, you lose time
        	time -= 10;
        	
        }

        //update the time
        timeText.text = "Your time: "+time+'\n'+'Atk: '+atk+'\n'+'Def: '+def;

        //if the player beat the monster
    	if (monster.countLiving()==0){
        	//game.state.start('GameOver',true,false,false);
            trophy = game.add.sprite(game.width/2,2*game.height/3,'trophy');
            trophy.scale.setTo(0.2,0.2);
            trophy.anchor.set(0.5);
            game.physics.arcade.enable(trophy);
            game.physics.arcade.overlap(dude, trophy, this.ifKilled, null, this);
        }
        //if the player run out of time
        if (time<=0){
        	game.state.start('GameOver',true,false,true);
        }
    },
    nextM: function() {
        /*if (600<dude.body.x<800){
            dude.body.y = 1100 - dude.body.y;
        } 
        if (500<dude.body.y<700){
            dude.body.x = 1100 - dude.body.x;
        }*/
        
    		game.state.start('Map1',true,false,dude.body.x,dude.body.y);
    	
    },

    ifKilled:function(player,trophy){
        game.state.start('GameOver',true,false,false);
    },
    //test if the player can kill the monster
    ifKill:function(player, monster){
    	if(this.battle(atk,def,15,10,100)){
            
    		monster.kill();
    		return true;
    	}else{
    	console.log('no kill')
    	if (cursors.up.isDown){
        dude.position.y+=50;
    	} else if (cursors.down.isDown){
        dude.position.y-=50;
    	}

    	if (cursors.left.isDown){
        dude.position.x+=50;
    	} else if (cursors.right.isDown){
        dude.position.x-=50;
    	}

    	var killtext = game.add.text(game.width/2,game.height/2,"You cannot kill this monster now",{font:'Source Sans Pro',fontSize: '50px', fill: '#ffffff'});
    	killtext.anchor.set(0.5);
    	game.time.events.add(2000, function() {    
    		game.add.tween(killtext).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    
    		game.add.tween(killtext).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
    	

    		return false;
    	}
    },
    //the actual battle state
    battle:function(atk,def, matk,mdef,mhp){
    	if (atk<mdef){
    		return false;
    	}else{
    		while(mhp>0){
    			mhp -= (atk-mdef);
    			time -= (matk-def);
    			return true;
    		}
    	} 	
    }
    }


// the game over state
var GameOver = function(game) {
	this.die;
};
GameOver.prototype = {
    init: function(die) {
        this.die=false;
        this.die=die;
    },

    preload: function() {
        
    },

    // make the game over screen
    create: function() {
    	if (!this.die){
        var endtext = game.add.text(game.width/2,game.height/2,"You have killed the one and only monster in the game now. Use the button to retry.",{font:'Source Sans Pro',fontSize: '50px', fill: '#ffffff',wordWrap: true, wordWrapWidth: game.width - 240});
        endtext.anchor.set(0.5);
    	}else{
    	var endtext = game.add.text(game.width/2,game.height/2,"You have run out the time! Use the button to retry.",{font:'Source Sans Pro',fontSize: '50px', fill: '#ffffff',wordWrap: true, wordWrapWidth: game.width - 240});
        endtext.anchor.set(0.5);
    	}

    	var playB = game.add.button(game.width/2, 2*game.height/3, 'play',this.next,this);
        playB.anchor.set(0.5);
    },
    next: function(){
    	//catch the next level request
    	game.state.start('Start',true,false,600,600,true);
    },

    update: function(){
        
        } 
    }
//place holder functions for future update
var Help = function(game) {};
Help.prototype = {
    init: function() {
        
    },

    preload: function() {
        
    },

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

    create: function() {
        
    },

    update: function(){
        
        } 
    }




// Set up the state manager and start from main menu
game.state.add('MainMenu', MainMenu);
game.state.add('Start', Start);
game.state.add('Map1', Map1);
game.state.add('Map2', Map2);
game.state.add('GameOver', GameOver);
game.state.add('Help', Help);
game.state.add('Statsup', Statsup);
game.state.start('MainMenu');

