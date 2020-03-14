const config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 1200,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // ---------------TileMap--------------
  game.load.tilemap(
    'heroMap',
    './assets/heroMap.json',
    null,
    Phaser.Tilemap.TILED_JSON
  );
  game.load.image('overWorld', './assets/Overworld.png');
  game.load.image('hyptosis', './assets/hyptosis.png');
  game.load.image('grass', './assets/greenery_4.png');
  game.load.image('tree', './assets/backgroundassets.png');
  // ----------------Sprites------------------
}

let map;
let overWorldTiles;
let hyptosisTiles;
let grassTiles;
let treeTiles;
let layerOne;
let layerTwo;

function create() {
  game.stage.backgroundColor = '#fff';
  map = this.make.tilemap({key: 'heroMap'});
  // map = game.add.tilemap('heroMap');
  overWorldTiles = map.addTilesetImage('Overworld', 'overWorld');
  hyptosisTiles = map.addTilesetImage('terrainother', 'hyptosis');
  grassTiles = map.addTilesetImage('grass', 'grass');
  treeTiles = map.addTilesetImage('terrain', 'tree');
  layerOne = map.createDynamicLayer('Tile Layer 1', [overWorldTiles]);
  layerTwo = map.createDynamicLayer('Tile Layer 2', [
    overWorldTiles,
    hyptosisTiles,
    treeTiles
  ]);
}

function update() {}
