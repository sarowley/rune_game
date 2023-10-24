class Rune extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, name){
        super(scene, x, y, texture)
        scene.add.existing(this);
        this.name = name;
        this.setVisible(false);
    }
    displayRune(x, y){
        this.setVisible(true);
    }
}

function runeScript(rune1, rune2){
    let runeCombo = rune1.name + " " + rune2.name;
    switch(runeCombo){
        case"heat ice": console.log(rune1);
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