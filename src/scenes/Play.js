class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    //load images
    this.load.image("test-rune", "./assets/testRune.png");
    this.load.image("ice", "./assets/freeze.png");
    this.load.image("wizard", "./assets/testWizard-1.png");
    this.load.image("scroll", "./assets/scrollUI-1.png");
    this.load.image("fire", "./assets/Fire1.png");
    this.load.image("platform", "./assets/FloorTile-1.png.png");
    //load spritesheets
    this.load.spritesheet("wizardss", "./assets/wizardSpritesheet.png", {
      frameWidth: 16,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 5,
    });
    this.load.spritesheet("runeSymbols", "./assets/runeSymbols.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("box", "./assets/cubes.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 0,
      endFrame: 4,
    });
    this.load.spritesheet("iceBox", "./assets/cubes.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 3,
      endFrame: 0,
    });
    this.load.spritesheet("runes", "./assets/runes.png", {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("plate", "./assets/pressureplate.png", {
      frameWidth: 16,
      frameHeight: 4,
      startFrame: 0,
      endFrame: 1,
    });
    //loading tilemap
    this.load.image("tileset", "./assets/tileset.png");
    this.load.tilemapTiledJSON("tilemap", "./assets/tilemap.json");
  }
  create() {
    //changing cursor
    let canvas = this.sys.canvas;
    canvas.style.cursor = "none";
    this.mySelector = new Selector(this, 100, 200, "test-rune");

    //tilemap stuff
    const map = this.add.tilemap("tilemap");
    const tileset = map.addTilesetImage("tileset", "tileset");
    const baseLayer = map.createLayer("base", tileset, 0, 0);
    baseLayer.setCollisionByProperty({ collision: true });

    //create wizard
    dude = new Character(this, 350, 48, "wizardss", this.mySelector);

    this.physics.world.setFPS(120);

    this.anims.create({
      key: "wizardWalk",
      frames: this.anims.generateFrameNumbers("wizardss", {
        start: 0,
        end: 2,
        first: 0,
      }),
      frameRate: 6,
      repeat: -1,
    });

    //ignore this
    platforms = this.physics.add.staticGroup();
    platforms.create(2000, 2000, "platform");
    this.box = this.physics.add.sprite(550, 500, "box");
    pressurePlate = this.physics.add.staticSprite(2000, 200, "plate");
    this.physics.add.overlap(this.box, pressurePlate, this.whatup, null, this);
    this.physics.add.overlap(dude, pressurePlate, this.whatup, null, this);

    //setting up boxes
    this.boxes = this.physics.add.group({ pushable: true, allowGravity: true });
    this.boxes.add(this.box);

    let newBox = new Box(this, 200, 200, "box", "box", dude, 1000);
    this.boxes.add(newBox);

    //cameras
    this.cameras.main.setBounds(0, 0, 560, 400).setOrigin(0.5);
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(dude);

    //physics
    this.physics.add.collider(dude, platforms);
    this.physics.add.collider(dude, this.box);
    this.physics.add.collider(this.box, platforms);
    this.physics.add.collider(pressurePlate, this.box);
    this.physics.add.collider(this.boxes, this.boxes);
    this.physics.add.collider(baseLayer, this.boxes);
    this.physics.add.collider(dude, baseLayer);

    //add keys
    cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.THREE
    );
    this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyEscape = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    this.keyTab = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.TAB
    );

    //setting up runes
    this.heatRune = new Rune(this, 100, 100, "runes", "heat");
    this.iceRune = new Rune(this, 150, 100, "runes", "ice").setFrame(1);
    this.shapeRune = new Rune(this, 200, 100, "runes", "shape").setFrame(2);
    this.drawRune = new Rune(this, 250, 100, "runes", "draw").setFrame(3);
  }

  update() {
    //get cursor cords
    let mouseX = game.input.mousePointer.worldX;
    let mouseY = game.input.mousePointer.worldY;
    this.mySelector.updatePosition(mouseX, mouseY);

    //keys
    //movement
    if (this.keyA.isDown) {
      dude.setVelocityX(-80);
    } else if (this.keyD.isDown) {
      dude.setVelocityX(80);
    } else if (this.keyS.isDown) {
      dude.setScale(1, 0.5);
      squat = true;
    } else {
      dude.setVelocityX(0);
      dude.setScale(1);
      this.noFall();
    }
    //jumping
    if (this.keyW.isDown && dude.body.blocked.down) {
      dude.setVelocityY(-150);
    }
    //flip character
    if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
      dude.flipX = true;
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
      dude.resetFlip();
    }
    //rune commands
    if (Phaser.Input.Keyboard.JustDown(this.key1)) {
      dude.addRune(this.heatRune);
    }
    if (Phaser.Input.Keyboard.JustDown(this.key2)) {
      dude.addRune(this.iceRune);
    }
    if (Phaser.Input.Keyboard.JustDown(this.key3)) {
      dude.addRune(this.shapeRune);
    }
    if (Phaser.Input.Keyboard.JustDown(this.key4)) {
      dude.addRune(this.drawRune);
    }
    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      dude.castSpell();
    }

    //pause functionality
    if (Phaser.Input.Keyboard.JustDown(this.keyTab)) {
      if (paused) {
        this.physics.resume();
        console.log("unpaused");
        paused = false;
      } else if (!paused) {
        this.physics.pause();
        console.log("paused");
        paused = true;
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyEscape)) {
      if (paused) {
        this.physics.resume();
        console.log("unpaused");
        paused = false;
      } else if (!paused) {
        this.physics.pause();
        console.log("paused");
        paused = true;
      }
    }

    //runes
    displayRunes(dude.x, dude.y, dude.currentSpell);


      this.boxes.children.each(childBox => {
          childBox.setVelocityX(0);
          if(childBox.burning){
              childBox.health -= 1;
              console.log(childBox.health);
              if(childBox.health <= 0){
                childBox.destroy();
                childBox.fire.destroy();
              }
          }
      });





        // if (this.keyA.isDown){
        //     dude.setVelocityX(-160);
        // }
        // else if (this.keyD.isDown){
        //     dude.setVelocityX(160);
        // } 
        // else if (this.keyS.isDown) {
        //     dude.setScale(1, 0.5);
        //     squat = true;
        // }
        // else {
        //     dude.setVelocityX(0);
        //     dude.setScale(1);
        //     this.noFall();
        // }
        // if (this.keyW.isDown && dude.body.touching.down)
        // {
        //     dude.setVelocityY(-250);
        // }
        // if(Phaser.Input.Keyboard.JustDown(this.keyA)){
        //   dude.flipX = true;
        // }
        // if(Phaser.Input.Keyboard.JustDown(this.keyD)){
        //   dude.resetFlip();
        // }

        // if(Phaser.Input.Keyboard.JustDown(this.key1)){
        //     dude.addRune(this.heatRune);
        // }
        // if(Phaser.Input.Keyboard.JustDown(this.key2)){
        //     dude.addRune(this.iceRune);
        // }
        // if(Phaser.Input.Keyboard.JustDown(this.key3)){
        //     dude.addRune(this.shapeRune);
        // }
        // if(Phaser.Input.Keyboard.JustDown(this.key4)){
        //     dude.addRune(this.drawRune);
        // }
        // if(Phaser.Input.Keyboard.JustDown(this.keySpace)){
        //     dude.castSpell();
        // }
        displayRunes(dude.x, dude.y, dude.currentSpell);

        
    
    //boxes
    this.boxes.children.each((childBox) => {
      childBox.setVelocityX(0);
    });
  }

  //pressure plate function
  whatup() {
    console.log("pressure plate activate");
  }

  //not clipping through the ground function
  noFall() {
    if (squat && dude.body.touching.down) {
      dude.setVelocityY(-100);
      squat = false;
    }
  }
}
