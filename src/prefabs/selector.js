class Selector extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        // scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setScale(.5);
        this.setDepth(100);
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
    }
}