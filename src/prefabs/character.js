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

    spawnIceBox(){
        let box = new Box(this.parentScene, this.selector.x, this.selector.y, "box", "box", this, 1000);
    }

    destroyCube(name){
        let objectsHit = this.parentScene.physics.overlapRect(this.selector.x - 2, this.selector.y - 2, 4, 4, true, false);
        console.log(objectsHit);
        for(let item of objectsHit){
            console.log(item);
            if(item.gameObject.name == name){
                console.log("delete Box");
                item.gameObject.destroy();
            }
        }
    }

    spawnFire(x, y, width, height){
        // let rectangle = this.parentScene.add.rectangle(this.selector.x, this.selector.y, 50, 50, 0xfacade);
        let objectsNear = this.parentScene.physics.overlapRect(x, y, width, height, true, false);
        for(let item of objectsNear){
            console.log(item);
            if(item.gameObject.name == "box" && !item.gameObject.burning){
                let fire = this.parentScene.physics.add.sprite(item.x, item.y, "fire");
                item.gameObject.applyFire(fire);
                fire.body.allowGravity = false;
                item.gameObject.burning = true;
                console.log("box Catch Fire");
                this.spawnFire(item.x, item.y, width, height);
            }
        }
    }



}
