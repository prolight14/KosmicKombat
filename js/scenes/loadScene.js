export default class LoadScene extends Phaser.Scene
{
    constructor ()
    {
        // This class is now singleton like by not giving it a key 
        // since no other scenes can access this one
        super();
    }

    preload ()
    {
        this.load.image("enemy", "./assets/Enemy.png");
        this.load.image("turret", "./assets/Turret.png");
        this.load.image("bullet", "./assets/Bullet.png");
    }

    create ()
    {
        this.input.mouse.disableContextMenu();
        this.scene.start("playScene");
    }
}