class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("test-rune","./assets/testRune.png");
    }
    create() {

        dude = this.physics.add.sprite(100, 450, 'image');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'image').setScale(2).refreshBody();

        platforms.create(100, 600, 'image');
        platforms.create(200, 600, 'image');
        platforms.create(300, 550, 'image');
        platforms.create(600, 450, 'image');

        //dude.setBounce(0.2);
        dude.setCollideWorldBounds(true);

        this.physics.add.collider(dude, platforms);

        cursors = this.input.keyboard.createCursorKeys();

        this.heatRune = new Rune(this, 100, 100, 'test-rune', "heat");
        this.iceRune = new Rune(this, 150, 100, 'test-rune', "ice");
        this.shapeRune = new Rune(this, 200, 100, 'test-rune', "shape");
        this.drawRune = new Rune(this, 250, 100, 'test-rune', "draw");

        runeScript(this.heatRune, this.iceRune);
        this.heatRune.displayRune();
        this.iceRune.displayRune();
        this.shapeRune.displayRune();
        this.drawRune.displayRune();
        
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