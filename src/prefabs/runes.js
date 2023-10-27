class Rune extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, name){
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.name = name;
        this.setVisible(false);
    }
}

function runeScript(rune1, rune2, character){
    let runeCombo = rune1.name + " " + rune2.name;
    switch(runeCombo){
        case"heat ice": 
            console.log("create steam");
            break;
        case"heat shape":
            console.log("destroy");
            break;
        case"heat draw":
            console.log("enhance self");
            break;
        case"ice heat":
            console.log("put out fire");
            break;
        case"ice shape":
            console.log("freeze object");
            break;
        case"ice draw":
            console.log("stop movement effects");
            break;
        case"shape heat":
            console.log("move fire");
            break;
        case"shape ice":
            console.log("move ice");
            break;
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
            character.spawnCube();
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
