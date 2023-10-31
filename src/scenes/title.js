class Title extends Phaser.Scene {
  constructor() {
    super("titleScene");
  }

  preload() {
    this.load.image("title", "./assets/title.png");
    this.load.image("controls", "./assets/controls.png");
  }

  create() {
    this.title = this.add.tileSprite(0, 0, 800, 600, "title").setOrigin(0, 0);
    this.controls = this.add.tileSprite(0, 0, 800, 600, "controls").setOrigin(0, 0).setVisible(false);
    this.check = false;


    let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        color: '#FFFFFF',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

    this.text = this.add.text(30, 550, 'By Miles Marsh, Adrian Bruce, and Sean Rowley', menuConfig);

    //keybinds
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
  }

  update() {
    //moving to other scenes
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      this.scene.start("playScene");
    }
    if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
      if (!this.check){
        this.controls.setVisible(true);
        this.text.setVisible(false);
        this.check = true;
      }
      else if (this.check){
        (this.controls.setVisible(false));
        this.text.setVisible(true);
        this.check = false;
      }
    }
  }
}
