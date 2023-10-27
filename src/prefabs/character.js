class Character extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, selector){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this).setOrigin(0.5);

        this.currentSpell = [];
        this.currentlyCasting = false;
        this.parerntScene = scene;
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
                this.parerntScene.physics.pause();
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
        this.parerntScene.physics.resume();
        for(let rune of this.currentSpell){
            rune.setVisible(false);
        }
        this.currentSpell = [];
    }

    spawnCube(){
        let box = this.parerntScene.physics.add.sprite(this.selector.x, this.selector.y, "box").setScale(2);
        handlePhysicsColliders(this.parerntScene, this, box);
        this.parerntScene.boxes.add(box);
    }

}

function handlePhysicsColliders(scene, character, object){
    scene.physics.add.overlap(object, pressurePlate, scene.whatup, null, scene);
    scene.physics.add.collider(object, platforms);
    scene.physics.add.collider(pressurePlate, object);
    scene.physics.add.collider(character, object);
}