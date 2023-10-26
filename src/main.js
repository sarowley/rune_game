let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Title, Play]
}

var dude;
var platforms;
var boxes;
var pressurePlate;
var cursors;
var squat = false;
var keySPACE;
let game = new Phaser.Game(config);