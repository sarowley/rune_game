class Box extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, name, health){
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this).setOrigin(0.5);
        this.name = name;
        this.health = health;
        this.setScale(2);




    }


    handlePhysicsColliders(scene, character, object){
        scene.physics.add.overlap(object, pressurePlate, scene.whatup, null, scene);
        scene.physics.add.collider(object, platforms);
        scene.physics.add.collider(pressurePlate, object);
        scene.physics.add.collider(character, object);
}
}