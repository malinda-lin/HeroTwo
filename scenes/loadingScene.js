class LoadingScene extends Phaser.Scene {
  constructor() {
    super({key: 'LoadingScene'});
  }

  preload() {}

  create() {
    this.add.text(10, 10, 'Press "s" To Start');
  }

  update() {
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    if (this.keyS.isDown) {
      this.scene.start('GameScene');
    }
  }
}
