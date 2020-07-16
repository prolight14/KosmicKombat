import LoadScene from "./scenes/loadScene.js";
import PlayScene from "./scenes/playScene.js";

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 480,
    physics: {
        default: 'arcade'
    },
    scene: [LoadScene, PlayScene],
    pixelArt: true
};

var game = new Phaser.Game(config);

export default config;
