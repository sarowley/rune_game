class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }
<<<<<<< HEAD
    preload(){
        this.load.image("titlescreen", "./assets/RuneomancyMenu.png");
    }
    create() {
        this.add.sprite(game.config.width/2, game.config.height/2, 'titlescreen').setOrigin(0.5, 0.5)
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

        //adding text
        //this.add.text(300, 200, 'temp title', menuConfig);
        //this.add.text(225, 250, 'Press Space to Start', menuConfig);
    
=======

    preload() {
        this.load.image("title", "./assets/title.png");
    }

    create() {
        this.title = this.add
      .tileSprite(0, 0, 800, 600, "title")
      .setOrigin(0, 0);
>>>>>>> e38385004b29992e586f9bc048924104e7ec796b

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