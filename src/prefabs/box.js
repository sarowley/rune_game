class Box extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, name, character, health){
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.name = name;
        this.health = health;
        this.burning = false;
        scene.boxes.add(this);
        this.fire = null;

    }

    applyFire(fire){
        this.fire = fire;
    }

    
}