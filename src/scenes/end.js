class End extends Phaser.Scene {
  constructor() {
    super("endScene");
  }

  preload() {
    this.load.image("end", "./assets/the_dude.jpg");
  }
  create() {
    let menuConfig = {
      fontFamily: "Courier",
      fontSize: "28px",
      color: "#FFFFFF",
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0,
    };

    //adding text
    this.add.text(225, 250, "Press Space to Restart", menuConfig);

    this.end = this.add.tileSprite(0, 0, 701, 508, "end").setOrigin(0, 0);

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
