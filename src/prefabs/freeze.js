class Freeze extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, name){
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.name = name;
        this.handlePhysicsColliders(scene, this);
        scene.frozen.add(this);

    }


    handlePhysicsColliders(scene, object){
        scene.physics.add.collider(object, platforms);
    }

    
}