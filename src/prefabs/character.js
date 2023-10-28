class Character extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, selector){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this).setOrigin(0.5);

        this.currentSpell = [];
        this.currentlyCasting = false;
        this.parentScene = scene;
        this.selector = selector;
    }

    addRune(rune){
        if(this.currentSpell.length < 2){
            if(this.currentSpell.length > 0 && this.currentSpell[0] != rune){
                this.currentSpell.push(rune);
                rune.setVisible(true);  
            }
            else if(this.currentSpell.length == 0){
                // this.selector.setVisible(true);
                this.currentlyCasting = true;
                this.parentScene.physics.pause();
                this.currentSpell.push(rune);
                rune.setVisible(true);
            }
            this.setFrame(3);
        }
        
    }

    castSpell(){
        if(this.currentSpell.length == 2){
            let firstRune = this.currentSpell[0];
            let secondRune = this.currentSpell[1];
            runeScript(firstRune, secondRune, this);
            this.removeSpell();
        } else if(this.currentSpell.length == 1){
            this.removeSpell();
            console.log("fizzle");
        }
        else{
            console.log("fizzle");
        }
        this.setFrame(0);
    }

    removeSpell(){
        this.currentlyCasting = false;
        // this.selector.setVisible(false);
        this.parentScene.physics.resume();
        for(let rune of this.currentSpell){
            rune.setVisible(false);
        }
        this.currentSpell = [];
    }

    spawnCube(){
        let box = this.parentScene.physics.add.sprite(this.selector.x, this.selector.y, "box").setScale(2);
        box.name = "box";
        handlePhysicsColliders(this.parentScene, this, box);
        this.parentScene.boxes.add(box);
        console.log(box);
    }

    destroyCube(){
        let objectsHit = this.parentScene.physics.overlapRect(this.selector.x - 25, this.selector.y - 25, 50, 50, true, false);
        console.log(objectsHit);
        for(let item of objectsHit){
            console.log(item);
            if(item.gameObject.name == "box"){
                console.log("delete Box");
                item.gameObject.destroy();
            }
        }
    }

}

function handlePhysicsColliders(scene, character, object){
    scene.physics.add.overlap(object, pressurePlate, scene.whatup, null, scene);
    scene.physics.add.collider(object, platforms);
    scene.physics.add.collider(pressurePlate, object);
    scene.physics.add.collider(character, object);
}