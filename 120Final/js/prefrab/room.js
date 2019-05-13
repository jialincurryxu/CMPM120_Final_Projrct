/*map = game.add.tilemap('mStart');
        map.addTilesetImage('tile','tile');

        mStart = map.createLayer('level');
        map.setCollision(2,'level');
        map.setTileIndexCallback(3, this.nextM, this);
*/
//name without '',refer with ''
function newRoom(game, key, refer, wayIn) {
	this.map = this.game.add.tilemap(refer);
	this.map.addTilesetImage('tile','tile');
	name = map.createLayer('bg');
	this.name = map.createLayer('collision');
	this.map = setCollision(2,'collision');
}
