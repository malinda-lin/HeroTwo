const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 700,
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
  this.load.image('overWorld', './assets/Overworld.png');
  this.load.image('hyptosis', './assets/hyptosis.png');
  this.load.image('grass', './assets/greenery.png');
  this.load.image('tree', './assets/backgroundassets.png');

  this.load.tilemapTiledJSON('heroMap', './assets/heroMap.json');
  // ----------------Sprites------------------
  this.load.spritesheet('pinkManIdle', './assets/PinkMan/Idle(32x32).png', {
    frameWidth: 32,
    frameHeight: 32
  });
}

let heroMap;
let overWorldTiles;
let hyptosisTiles;
let grassTiles;
let treeTiles;
const allTiles = [overWorldTiles, hyptosisTiles, grassTiles, treeTiles];
let layerOne;
let layerTwo;
let layerThree;
let layerFour;
let layerFive;
let layerSix;
let layerSeven;
let layerEight;
let playerOne;

function create() {
  // ----------------Map----------------
  // game.stage.backgroundColor = '#fff';
  heroMap = this.add.tilemap('heroMap');
  // map = game.add.tilemap('heroMap');
  overWorldTiles = heroMap.addTilesetImage('Overworld', 'overWorld');
  hyptosisTiles = heroMap.addTilesetImage('terrainother', 'hyptosis');
  grassTiles = heroMap.addTilesetImage('grass', 'grass');
  treeTiles = heroMap.addTilesetImage('terrain', 'tree');
  layerOne = heroMap
    .createStaticLayer('groundLevel', overWorldTiles)
    .setDepth(-2);
  console.log('hero.tilesets', heroMap.tilesets);
  layerTwo = heroMap
    .createStaticLayer('upperLevel', heroMap.tilesets)
    .setDepth(-1);
  // layerThree = heroMap.createStaticLayer('rocks', allTiles);
  // layerFour = heroMap.createStaticLayer('grasstwo', allTiles);
  // layerFive = heroMap.createStaticLayer('grass', allTiles);
  // layerSix = heroMap.createStaticLayer('structures', allTiles);
  // layerSeven = heroMap.createStaticLayer('entrance', allTiles);
  // layerEight = heroMap.createStaticLayer('propsTopTop', allTiles);
  // ------------PlayerOne--------------
  playerOne = this.physics.add.sprite(100, 450, 'pinkManIdle');
  playerOne.setCollideWorldBounds(true);
  // this.anims.create({
  //   key: 'idle',
  //   frames: this.anims.generateFrameNumbers('pinkManIdle', {start: 1, end: 10}),
  //   frameRate: 10,
  //   repeat: -1
  // });
  // ---------------interactions-----------
  // this.physics.add.collider();
}

function update() {}
