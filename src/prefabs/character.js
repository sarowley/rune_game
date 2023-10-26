class Character extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this).setOrigin(0.5);

        this.currentSpell = [];
        this.currentlyCasting = false;
    }

    addRune(rune){
        if(this.currentSpell.length < 3){
            if(this.currentSpell.length > 0 && this.currentSpell[0] != rune){
                this.currentSpell.push(rune);
                rune.setVisible(true);
            }
            else if(this.currentSpell.length == 0){
                this.currentlyCasting = true;
                this.currentSpell.push(rune);
                rune.setVisible(true);
            }
        }
        
    }

    castSpell(){
        if(this.currentSpell.length == 2){
            let firstRune = this.currentSpell[0];
            let secondRune = this.currentSpell[1];
            runeScript(firstRune, secondRune);
            this.removeSpell();
        } else if(this.currentSpell.length == 1){
            console.log("fizzle");
        }
        else{
            console.log("fizzle");
        }
    }

    removeSpell(){
        this.currentlyCasting = false;
        for(let rune of this.currentSpell){
            rune.setVisible(false);
        }
        this.currentSpell = [];
    }

}