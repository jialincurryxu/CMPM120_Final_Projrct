//imported & modded from https://github.com/anthony-mills/procedural_dungeon/blob/master/src/dungeon_generator.js
//change from a phaser plugin to a js function for simplier useage

theVoid.Dungeon = function() {
    theVoid.levelMap = {};

    this.roomMaxSize = 10;
    this.roomMinSize = 4;
    this.maxRooms = 15;
    
    this.lastRoomCenter = {x: 0, y: 0};
    this.numRooms = 0;
    this.numTiles = 0;
    this.tileSize = 64;

    this.numEnemies = 0;
    this.maxEnemies = 20+((level-1)*5);

    this.floorCount = 0;
    this.lastEnemy = 0;

    this.player = {};

    this.mapSize = { x: 4000, y: 4000 }

    this.mapLocations = {};
    this.mapLocations.enemies = [];
};

theVoid.Dungeon.prototype = {

    /**
    * Set the size of the map
    *
    * @param object mapSize
    */
    setMapSize: function ( mapSize )
    {
      this.mapSize = mapSize;
    }, 

    /**
    * Get the size of the map
    */
    getMapSize: function ()
    {
      return this.mapSize;
    },

    /**
    * Spawn the level exit point
    *
    * param integer xLoc
    * param integer yLoc
    **/
    spawnExitPoint: function ( xLoc, yLoc ) {
      this.mapLocations.exit = { 'x': xLoc, 'y': yLoc }

      theVoid.levelExit = Mygame.phaser.add.sprite( xLoc, yLoc, 'exit');
      Mygame.phaser.physics.arcade.enable( theVoid.levelExit );
    },

    /**
    * Create the level map
    *
    */
    createMap: function(){
      // Increase the enemy number with the level
      this.maxEnemies = Math.round(this.maxEnemies * level);

      theVoid.levelMap.walls = Mygame.phaser.add.group();
      theVoid.levelMap.walls.enableBody = true;
            
      theVoid.levelMap.floors = Mygame.phaser.add.group();      

      for (var y=0; y<this.mapSize.y; y+= this.tileSize) {
          for (var x=0; x<this.mapSize.x; x+=this.tileSize) {
              var wall = theVoid.levelMap.walls.create(x, y, "wall");
              wall.body.immovable = true;
          }
      }
      
      for (var r=0; r<this.maxRooms; r++) {
          var w = this.getRandom(this.roomMinSize, this.roomMaxSize) * this.tileSize;
          var h = this.getRandom(this.roomMinSize, this.roomMaxSize) * this.tileSize;
          
          x = this.getRandom(1, ((this.mapSize.x) / this.tileSize) - (w/this.tileSize + 1)) * this.tileSize;
          y = this.getRandom(1, ((this.mapSize.y) / this.tileSize) - (w/this.tileSize + 1)) * this.tileSize;
                          
          this.createRoom(x, x+w, y, y+h);
          
          var spawnX = x + (w/2);
          var spawnY = y + (h/2); 

          if (this.numRooms == 0) {                
              this.mapLocations.player = { 'x' : spawnX, 'y' : spawnY };
          } else {

              if ( (this.numRooms != this.lastEnemy) && (this.numEnemies < this.maxEnemies) ) {
                this.lastEnemy = this.numRooms;
                this.numEnemies++;

                var enemyData = {
                  'x' : spawnX, 
                  'y' : spawnY 
                }

                this.mapLocations.enemies.push( enemyData );
              }
              var newX = Mygame.phaser.math.snapToFloor(x + (w/2), this.tileSize);
              var newY = Mygame.phaser.math.snapToFloor(y + (h/2), this.tileSize);
              
              var prevX = Mygame.phaser.math.snapToFloor(this.lastRoomCoords.x, this.tileSize);
              var prevY = Mygame.phaser.math.snapToFloor(this.lastRoomCoords.y, this.tileSize);

              // If its the 5th room spawn an exit
              if (this.numRooms === 5) {
                this.spawnExitPoint( prevX, prevY );
              }

              this.createHTunnel(prevX, newX, prevY, prevY);
              this.createVTunnel(prevY, newY, newX);
          }
          
          this.lastRoomCoords = { x: x + (w/2), y: y + (h/2) };
          this.numRooms++;
      }

      Mygame.phaser.physics.game.world.setBounds(0,0,this.mapSize.x,this.mapSize.y);;

      return this.mapLocations;     
    },

    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    Room: function(x, y, w, h) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;
        
        var center_x = (this.x1 + this.x2) / 2;
        var center_y = (this.y1 + this.y2) / 2;
        this.center_coords = {x: center_x, y: center_y};
    },
    
    createFloor: function(x, y) {
        fl = theVoid.levelMap.floors.create(x, y, "ground");
        Mygame.phaser.physics.arcade.enable(fl);

        Mygame.phaser.physics.arcade.overlap(fl, theVoid.levelMap.walls, function(floor, wall) {
            wall.destroy();
        });

        this.floorCount++;

        fl.destroy();

    },
    
    createRoom: function(x1, x2, y1, y2) {
        for (var x = x1; x<x2; x+=this.tileSize) {
            for (var y = y1; y<y2; y+=this.tileSize) {
                this.createFloor(x, y);
            }
        }
    },
    
    createHTunnel: function(x1, x2, y) {
        var min = Math.min(x1, x2);
        var max = Math.max(x1, x2);
        for (var x = min; x<max+8; x+=8) {
            this.createFloor(x, y);
        }
    },
    
    createVTunnel: function(y1, y2, x) {
        var min = Math.min(y1, y2);
        var max = Math.max(y1, y2);
        for (var y = min; y<max+8; y+=8) {
            this.createFloor(x, y);
        }
    }   
};
