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
    this.load.image("spell_list", "./assets/the_dude.jpg");
    this.load.image("pause", "./assets/the_dude.jpg");
    this.load.image("podium", "./assets/podium.png");

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
    //set fps (prevent tunneling)
    this.physics.world.setFPS(120);

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

    //world bounds
    this.physics.world.setBounds(0, 0, 560, 500);
    dude.setCollideWorldBounds(true);

    //animate wizard
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

    //images
    this.spell_list = this.add
      .tileSprite(0, 0, 701, 508, "spell_list")
      .setOrigin(0, 0);
    this.spell_list.setVisible(false);
    this.pause = this.add.tileSprite(0, 0, 701, 508, "pause").setOrigin(0, 0);
    this.pause.setVisible(false);

    //ignore this
    platforms = this.physics.add.staticGroup();
    platforms.create(2000, 2000, "platform");
    this.box = this.physics.add.sprite(2000, 1990, "box");

    //setting up boxes
    this.boxes = this.physics.add.group({ pushable: true, allowGravity: true });
    this.boxes.add(this.box);

    let newBox = null;
    newBox = new Box(this, 200, 200, "box", "box", dude, 1000);
    this.boxes.add(newBox);

    newBox = new Box(this, 300, 200, "box", "box", dude, 1000);
    this.boxes.add(newBox);

    //making doors
    door1 = this.physics.add.staticSprite(312, 128, "door");
    door2 = this.physics.add.staticSprite(104, 368, "door");

    //making pressure plates
    pressurePlate = this.physics.add.staticSprite(400, 142, "plate");
    pressurePlate1 = this.physics.add.staticSprite(10, 382, "plate");

    //making podium
    this.podium = this.physics.add.staticGroup();
    this.podium.create(560 - 24, 400 - 32, "podium");

    //cameras
    this.cameras.main.setBounds(0, 0, 560, 400).setOrigin(0.5);
    this.cameras.main.setZoom(2.75);
    this.cameras.main.startFollow(dude);

    //physics
    this.physics.add.collider(dude, platforms);
    this.physics.add.collider(dude, this.box);
    this.physics.add.collider(this.box, platforms);
    this.physics.add.collider(pressurePlate, this.box);
    this.physics.add.collider(this.boxes, this.boxes);
    this.physics.add.collider(baseLayer, this.boxes);
    this.physics.add.collider(dude, baseLayer);
    collider = this.physics.add.collider(dude, door1);
    collider = this.physics.add.collider(dude, door2);
    this.physics.add.overlap(dude, this.podium, this.whatup2, null, this);
    this.physics.add.overlap(
      this.boxes,
      pressurePlate,
      this.whatup,
      null,
      this
    );
    this.physics.add.overlap(
      this.boxes,
      pressurePlate1,
      this.whatup3,
      null,
      this
    );

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
    this.keyBackspace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.BACKSPACE
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
    // if (Phaser.Input.Keyboard.JustDown(this.key4)) {
    //   dude.addRune(this.drawRune);
    // }
    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      dude.castSpell();
    }

    //pause functionality
    if (Phaser.Input.Keyboard.JustDown(this.keyTab)) {
      if (paused) {
        this.physics.resume();
        this.spell_list.setVisible(false);
        this.pause.setVisible(false);
        paused = false;
      } else if (!paused) {
        this.physics.pause();
        this.spell_list.setVisible(true);
        paused = true;
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyEscape)) {
      if (esc_paused) {
        this.physics.resume();
        this.pause.setVisible(false);
        this.spell_list.setVisible(false);
        esc_paused = false;
      } else if (!esc_paused) {
        this.physics.pause();
        this.pause.setVisible(true);
        esc_paused = true;
      }
    }

    //back to menu when paused
    if (esc_paused) {
      if (Phaser.Input.Keyboard.JustDown(this.keyBackspace)) {
        console.log("whatup");
        esc_paused = false;
        this.scene.start("titleScene");
      }
    }

    //fall catch
    if (dude.y > 420) {
      this.scene.restart();
    }

    //runes
    displayRunes(dude.x, dude.y, dude.currentSpell);

    //boxes
    this.boxes.children.each((childBox) => {
      childBox.setVelocityX(0);
      if (childBox.burning) {
        childBox.health -= 1;
        console.log(childBox.health);
        if (childBox.health <= 0) {
          childBox.destroy();
          childBox.fire.destroy();
        }
      }
    });
    this.boxes.children.each((childBox) => {
      childBox.setVelocityX(0);
    });
  }

  //pressure plate functions
  whatup() {
    this.physics.world.removeCollider(collider);
    door1.destroy();
  }
    whatup3() {
      this.physics.world.removeCollider(collider);
      door2.destroy();
    }

  //end game function
  whatup2() {
    this.scene.start("endScene");
  }

  //not clipping through the ground function
  noFall() {
    if (squat && dude.body.blocked.down) {
      dude.setVelocityY(-50);
      squat = false;
    }
  }
}
