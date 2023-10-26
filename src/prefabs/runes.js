class Rune extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, name){
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.name = name;
        this.setVisible(false);
    }
}

function runeScript(rune1, rune2){
    let runeCombo = rune1.name + " " + rune2.name;
    switch(runeCombo){
        case"heat ice": console.log("heat ice");
        case"heat shape":;
        case"heat draw":;
        case"ice heat":;
        case"ice shape":;
        case"ics draw":;
        case"shape heat":;
        case"shape ice":;
        case"shape draw":;
        case"draw heat":;
        case"draw ice":;
        case"draw shape":;
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