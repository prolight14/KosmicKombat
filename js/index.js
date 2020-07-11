import LoadScene from "./scenes/loadScene.js";
import PlayScene from "./scenes/playScene.js";

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 480,
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 200 }
    //     }
    // },
    scene: [LoadScene, PlayScene],
    pixelArt: true
};

var game = new Phaser.Game(config);
