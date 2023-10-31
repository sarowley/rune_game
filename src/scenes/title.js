class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }
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