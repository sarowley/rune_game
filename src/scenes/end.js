class End extends Phaser.Scene {
  constructor() {
    super("endScene");
  }

  preload() {
    this.load.image("end", "./assets/end.png");
  }
  create() {

    this.end = this.add.tileSprite(0, 0, 800, 600, "end").setOrigin(0, 0);

    //keybinds
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    //moving to other scenes
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      this.scene.start("titleScene");
    }
  }
}
