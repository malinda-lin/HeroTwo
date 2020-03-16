/* eslint-disable no-use-before-define */
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  // TODO: make and add LoadingScene & EndScene
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // --------------audio--------
  this.load.audio('SuTurno', '/assets/audio/Su Turno.ogg');

  // ---------------tileMap--------------
  this.load.image('greenery', '/assets/greenery.png');
  this.load.tilemapCSV('heroMapCollider', '/assets/csv/heroMapCollider.csv');
  // TODO: collision with grass?
  // ---------------images---------------
  this.load.image('wholeGame', '/assets/heroMapGame.png');
  this.load.image('flag', '/assets/heroMapFlag.png');
  this.load.image('grass', '/assets/heroMapGrassLayer.png');
  this.load.image('top', '/assets/heroMapTop.png');
  this.load.spritesheet('pinkMan', '/assets/pinkMan.png', {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.spritesheet('virtualGuy', '../assets/virtualGuy.png', {
    frameWidth: 32,
    frameHeight: 32
  });
}

let playerOne;
let playerTwo;
let map;
let music;

function create() {
  // ---------audio---------
  music = this.sound.add('SuTurno');
  music.setVolume(0.1); // volume: 0 to 1
  music.setLoop(true); // loop: true/false
  music.play();
  // ----------------map----------------
  map = this.make.tilemap({
    key: 'heroMapCollider',
    tileWidth: 32,
    tileHeight: 32
  });
  const tileset = map.addTilesetImage('greenery');
  const gameLayer = map.createStaticLayer(0, tileset);
  gameLayer.setDepth(-2);
  map.setCollisionBetween(0, 5);
  // ---------------images--------------
  this.add.image(640, 480, 'wholeGame').setDepth(-1);
  this.add.image(640, 480, 'flag').setDepth(1);
  this.add.image(640, 480, 'grass').setDepth(1);
  this.add.image(640, 480, 'top').setDepth(1);
  // ------------playerOne--------------
  playerOne = this.physics.add.sprite(100, 450, 'pinkMan');
  playerOne.setDepth(0);
  playerOne.setCollideWorldBounds(true);
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('pinkMan', {start: 7, end: 17}),
    frameRates: 5,
    repeat: -1
  });
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('pinkMan', {start: 18, end: 29}),
    frameRates: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'hit',
    frames: this.anims.generateFrameNumbers('pinkMan', {start: 2, end: 6}),
    frameRates: 10
  });

  playerTwo = this.physics.add.sprite(200, 550, 'virtualGuy');
  playerTwo.setCollideWorldBounds(true);
  this.anims.create({
    key: 'idle2',
    frames: this.anims.generateFrameNumbers('virtualGuy', {
      start: 7,
      end: 17
    }),
    frameRates: 5,
    repeat: -1
  });
  this.anims.create({
    key: 'run2',
    frames: this.anims.generateFrameNumbers('virtualGuy', {
      start: 18,
      end: 29
    }),
    frameRates: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'hit2',
    frames: this.anims.generateFrameNumbers('virtualGuy', {start: 2, end: 6}),
    frameRates: 10
  });
  // ------------static collide--------
  this.physics.add.collider(playerOne, gameLayer);
  this.physics.add.collider(playerTwo, gameLayer);
  // ---------------interactions-----------
  this.physics.add.collider(playerOne, playerTwo);

  this.cameras.main.startFollow(playerOne, true, 0.08, 0.08);
}
// TODO: chatbox typing needs to be seperate from game keys
function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  // -------playerOne controls--------------
  if (cursors.up.isDown) {
    playerOne.setVelocityY(-160);
    playerOne.anims.play('run', true);
  } else if (cursors.down.isDown) {
    playerOne.setVelocityY(160);
    playerOne.anims.play('run', true);
  } else if (cursors.left.isDown) {
    playerOne.setFlipX(true);
    playerOne.setVelocityX(-160);
    playerOne.anims.play('run', true);
  } else if (cursors.right.isDown) {
    playerOne.resetFlip();
    playerOne.setVelocityX(160);
    playerOne.anims.play('run', true);
  } else {
    playerOne.setVelocityY(0);
    playerOne.setVelocityX(0);
    playerOne.anims.play('idle', true);
  }
  // --------playerTwo controls-----------
  this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  if (this.keyW.isDown) {
    playerTwo.setVelocityY(-160);
    playerTwo.anims.play('run2', true);
  } else if (this.keyS.isDown) {
    playerTwo.setVelocityY(160);
    playerTwo.anims.play('run2', true);
  } else if (this.keyA.isDown) {
    playerTwo.setFlipX(true);
    playerTwo.setVelocityX(-160);
    playerTwo.anims.play('run2', true);
  } else if (this.keyD.isDown) {
    playerTwo.resetFlip();
    playerTwo.setVelocityX(160);
    playerTwo.anims.play('run2', true);
  } else {
    playerTwo.setVelocityY(0);
    playerTwo.setVelocityX(0);
    playerTwo.anims.play('idle2', true);
  }
}
