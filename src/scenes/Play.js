class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    this.load.image("test-rune", "./assets/testRune.png");
    this.load.image("wizard", "./assets/testWizard-1.png");
  }
  create() {

    dude = new Character(this, 450, 450, "wizard").setScale(2);

    platforms = this.physics.add.staticGroup();

    boxes = this.physics.add.sprite(550, 500, "image");
    boxes.setPushable(true);

    pressurePlate = this.physics.add.staticSprite(750, 590, "image");

    this.physics.add.overlap(boxes, pressurePlate, this.whatup, null, this);
    this.physics.add.overlap(dude, pressurePlate, this.whatup, null, this);

    this.cameras.main.setBounds(-500, -500, 1600, 1200);
    this.cameras.main.startFollow(dude);

    platforms.create(400, 980, "image").setScale(25).refreshBody();

    platforms.create(700, 500, "image");
    platforms.create(200, 450, "image");
    platforms.create(300, 550, "image");
    platforms.create(600, 450, "image");
    platforms.create(400, 350, "image");

    this.physics.add.collider(dude, platforms);
    this.physics.add.collider(dude, boxes);
    this.physics.add.collider(boxes, platforms);
    this.physics.add.collider(pressurePlate, boxes);

    cursors = this.input.keyboard.createCursorKeys();

    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
        } else if (cursors.down.isDown) {
      dude.setScale(2, 1.5);
      squat = true;
    }
        else {
            dude.setVelocityX(0);
          dude.setScale(2);
      this.noFall();
      
    }
        if (cursors.up.isDown && dude.body.touching.down)
        {
            dude.setVelocityY(-250);
        }
        if(Phaser.Input.Keyboard.JustDown(this.key1)){
            dude.addRune(this.heatRune);
        }
        if(Phaser.Input.Keyboard.JustDown(this.key2)){
            dude.addRune(this.iceRune);
        }
        if(Phaser.Input.Keyboard.JustDown(this.key3)){
            dude.addRune(this.shapeRune);
        }
        if(Phaser.Input.Keyboard.JustDown(this.key4)){
            dude.addRune(this.drawRune);
        }
        if(Phaser.Input.Keyboard.JustDown(this.keySpace)){
            dude.castSpell();
        }
        displayRunes(dude.x, dude.y, dude.currentSpell);

        if (cursors.up.isDown && dude.body.touching.down) {
        dude.setVelocityY(-250);
        }
    
  }

  whatup() {
    console.log("pressure plate activate");
  }

  noFall() {
    if (squat && dude.body.touching.down) {
        dude.setVelocityY(-100);
        squat = false;
    }
  }
}
