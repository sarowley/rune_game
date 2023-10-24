class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {}
    create() {

        dude = this.physics.add.sprite(450, 550, 'image');

        platforms = this.physics.add.staticGroup();

        this.cameras.main.setBounds(-500, -500 , 1600, 1200)
        this.cameras.main.startFollow(dude);

        platforms.create(400, 980, 'image').setScale(25).refreshBody();

        // function getRandom(min, max) {
        //     return Math.random() * (max - min) + min;
        // }

        // for (let x = 0; x < 30; x++){
        //     platforms.create(getRandom(0, 800), getRandom(0, 600), 'image');
        // }

        platforms.create(700, 500, 'image');
        platforms.create(200, 450, 'image');
        platforms.create(300, 550, 'image');
        platforms.create(600, 450, 'image');



        this.physics.add.collider(dude, platforms);

        cursors = this.input.keyboard.createCursorKeys();

        this.heatRune = new Rune("heat");
        this.iceRune = new Rune("ice");
        this.shapeRune = new Rune("shape");
        this.drawRune = new Rune("draw");

        runeScript(this.heatRune, this.iceRune);
        this.heatRune.displayRune(this, 100, 100, 'image');
        
    }
    update() {
        if (cursors.left.isDown){
            dude.setVelocityX(-160);
        }
        else if (cursors.right.isDown){
            dude.setVelocityX(160);
        }
        else {
            dude.setVelocityX(0);
        }
        if (cursors.up.isDown && dude.body.touching.down)
        {
            dude.setVelocityY(-250);
        }
    }
}