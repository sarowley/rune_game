class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    this.load.image("test-rune", "./assets/testRune.png");
  }
  create() {
    dude = this.physics.add.sprite(450, 550, "image");

    platforms = this.physics.add.staticGroup();

    boxes = this.physics.add.sprite(550, 500, "image");
    boxes.setPushable(true);

    pressurePlate = this.physics.add.staticSprite(750, 590, "image");

    this.physics.add.overlap(boxes, pressurePlate, this.whatup, null, this);

    this.cameras.main.setBounds(-500, -500, 1600, 1200);
    this.cameras.main.startFollow(dude);

    platforms.create(400, 980, "image").setScale(25).refreshBody();

    // function getRandom(min, max) {
    //     return Math.random() * (max - min) + min;
    // }

    // for (let x = 0; x < 30; x++){
    //     platforms.create(getRandom(0, 800), getRandom(0, 600), 'image');
    // }

    platforms.create(700, 500, "image");
    platforms.create(200, 450, "image");
    platforms.create(300, 550, "image");
    platforms.create(600, 450, "image");

    this.physics.add.collider(dude, platforms);
    this.physics.add.collider(dude, boxes);
    this.physics.add.collider(boxes, platforms);
    this.physics.add.collider(pressurePlate, platforms);
    this.physics.add.collider(pressurePlate, boxes);

    cursors = this.input.keyboard.createCursorKeys();

    this.heatRune = new Rune(this, 100, 100, "test-rune", "heat");
    this.iceRune = new Rune(this, 150, 100, "test-rune", "ice");
    this.shapeRune = new Rune(this, 200, 100, "test-rune", "shape");
    this.drawRune = new Rune(this, 250, 100, "test-rune", "draw");

        runeScript(this.heatRune, this.iceRune);
        this.heatRune.setVisible(true);
        this.iceRune.setVisible(true);
        this.shapeRune.setVisible(true);
        this.drawRune.setVisible(true);
        
    }
    update() {
        boxes.setVelocityX(0);
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
        displayRune(dude.x, dude.y, this.heatRune);
    }

    whatup() {
        if (pressureCheck){
            console.log("pressure plate activate");
            pressureCheck = false;
        }
    }
}