class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    this.load.image("test-rune", "./assets/testRune.png");
    this.load.image("ice", "./assets/freeze.png");
    this.load.image("wizard", "./assets/testWizard-1.png");
    this.load.image("scroll", "./assets/scrollUI-1.png");
    this.load.image("fire", "./assets/Fire1.png");
    this.load.image("platform", "./assets/FloorTile-1.png.png");
    this.load.spritesheet("wizardss", "./assets/wizardSpritesheet.png", {frameWidth: 16, frameHeight: 32, startFrame: 0, endFrame: 5});
    this.load.spritesheet("runeSymbols", "./assets/runeSymbols.png", {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 3});
    this.load.spritesheet("box", "./assets/cubes.png", {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 4});
    this.load.spritesheet("runes", "./assets/runes.png", {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 3});
    this.load.spritesheet("plate", "./assets/pressureplate.png", {frameWidth: 16, frameHeight: 4, startFrame: 0, endFrame: 1});
  }
  create() {
    
    let canvas = this.sys.canvas;
    canvas.style.cursor = 'none';


    this.mySelector = new Selector(this, 100, 200, "test-rune");


   
    dude = new Character(this, 450, 450, "wizardss", this.mySelector).setScale(2);

    this.anims.create({
      key: 'wizardWalk',
      frames: this.anims.generateFrameNumbers('wizardss', {start: 0, end: 2, first: 0}),
      frameRate: 6,
      repeat: -1
  });

    platforms = this.physics.add.staticGroup();

    boxes = this.physics.add.sprite(550, 500, "box").setScale(2);
    boxes.setPushable(true);

    pressurePlate = this.physics.add.staticSprite(750, 582, "plate").setOrigin(1,1).setScale(2);

    this.physics.add.overlap(boxes, pressurePlate, this.whatup, null, this);
    this.physics.add.overlap(dude, pressurePlate, this.whatup, null, this);

    this.cameras.main.setBounds(-500, -500, 1600, 1200);
    this.cameras.main.startFollow(dude);


    platforms.create(400, 980, "image").setScale(25).refreshBody();

    platforms.create(700, 500, "platform").setScale(2);
    platforms.create(200, 450, "platform").setScale(2);
    platforms.create(300, 550, "platform").setScale(2);
    platforms.create(600, 450, "platform").setScale(2);
    platforms.create(400, 350, "platform").setScale(2);

    this.physics.add.collider(dude, platforms);
    this.physics.add.collider(dude, boxes);
    this.physics.add.collider(boxes, platforms);
    this.physics.add.collider(pressurePlate, boxes);

    cursors = this.input.keyboard.createCursorKeys();

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    
    this.heatRune = new Rune(this, 100, 100, "runes", "heat");
    this.iceRune = new Rune(this, 150, 100, "runes", "ice").setFrame(1);
    this.shapeRune = new Rune(this, 200, 100, "runes", "shape").setFrame(2);
    this.drawRune = new Rune(this, 250, 100, "runes", "draw").setFrame(3);


  //   this.add.particles(400, 200, 'wizard', {
  //     frequency:10,
  //     speed: 50,
  //     lifespan: 30000,
  //     gravityY: 20
  // });

  }

    update() {


      let mouseX = game.input.mousePointer.worldX;
      let mouseY = game.input.mousePointer.worldY;

      this.mySelector.updatePosition(mouseX, mouseY);


        boxes.setVelocityX(0);
        if (this.keyA.isDown){
            dude.setVelocityX(-160);
        }
        else if (this.keyD.isDown){
            dude.setVelocityX(160);
        } 
        else if (this.keyS.isDown) {
            dude.setScale(2, 1.5);
            squat = true;
        }
        else {
            dude.setVelocityX(0);
            dude.setScale(2);
            this.noFall();
        }
        if (this.keyW.isDown && dude.body.touching.down)
        {
            dude.setVelocityY(-250);
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyA)){
          dude.flipX = true;
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyD)){
          dude.resetFlip();
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

