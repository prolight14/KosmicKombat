export default class LoadScene extends Phaser.Scene
{
    constructor ()
    {
        super({
            key: "loadScene"
        });
    }

    preload ()
    {
        this.load.image("enemy", "./assets/Enemy.png");
    }

    create ()
    {
        this.input.mouse.disableContextMenu();
        this.scene.start("playScene");
    }
}