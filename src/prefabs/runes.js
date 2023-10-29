class Rune extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, name){
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.name = name;
        this.setVisible(false);
    }
}

/*
Ice Rune Spells (Ice Shape = freeze, Shape Ice=box, heat ice = melt)
-Heat Rune Spells (Heat Shape = destroy movable object, Shape Heat = summon fire, Ice heat = put out fire)
*/

function runeScript(rune1, rune2, character){
    let runeCombo = rune1.name + " " + rune2.name;
    switch(runeCombo){
        case"heat ice": 
            console.log("melt box");
            character.destroyCube("iceBox");
            break;
        case"heat shape":
            console.log("destroy");
            character.destroyCube("box");
            break;
        case"ice heat":
            console.log("put out fire");
            break;
        case"ice shape":
            console.log("freeze object");
            break;
        case"shape heat":
            console.log("spawn fire");
            character.spawnFire(character.selector.x - 25, character.selector.y - 25, 50, 50);
            break;
        case"shape ice":
            console.log("spawn ice box");
            character.spawnIceBox();
            break;

        //cutting the draw rune for time
        case"shape draw":
            console.log("create pull effect");
            break;
        case"draw heat":
            console.log("creates fire");
            break;
        case"draw ice":
            console.log("create Ice");
            break;
        case"draw shape":
            console.log("create object");
            break;
        case"ice draw":
            console.log("stop movement effects");
            break;
        case"heat draw":
            console.log("enhance self");
            break;
    }
}

function displayRunes(x, y, runes){
    if(runes.length != 0){
        if(runes.length == 2){  
            displayRuneLeft(x, y, runes[0])
            displayRuneRight(x, y, runes[1])
        }
        else {
            displayRuneLeft(x, y, runes[0])
        }
    }
}

function displayRuneLeft(x, y, rune){
    rune.x = x - 10;
    rune.y = y - 20;
}

function displayRuneRight(x, y, rune){
    rune.x = x + 10;
    rune.y = y - 20;
}
