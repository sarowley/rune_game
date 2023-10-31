class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.image("title", "./assets/title.png");
    }

    create() {
        this.title = this.add
      .tileSprite(0, 0, 800, 600, "title")
      .setOrigin(0, 0);

        //keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //moving to other scenes
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('playScene');    
        }
      }
}