let config = {
    type: Phaser.CANVAS,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    backgroundColor: '#7C7C7C',
    pixelArt:true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Title, Play, End]
}

var dude;
var platforms;
var pressurePlate;
var pressurePlate1;
var door1;
var door2;
var cursors;
var squat = false;
var collider;
var keySPACE;
var keyTAB;
var paused = false;
var esc_paused = false;
const BOXHEALTH = 500;
let game = new Phaser.Game(config);