class Rune{
    constructor(name){
        this.name = name;
    }
    displayRune(scene, x, y, texture){
        scene.add.sprite(x, y, texture);
    }
}

function runeScript(rune1, rune2){
    let runeCombo = rune1.name + " " + rune2.name;
    switch(runeCombo){
        case"heat ice": console.log("heat ice");
    }
}