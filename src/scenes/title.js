class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {
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
        let smallConfig = {
            fontFamily: 'Courier',
            fontSize: '23px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //adding text
        this.add.text(300, 200, 'temp title', menuConfig);
        this.add.text(225, 250, 'Press Space to Start', menuConfig);
    

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