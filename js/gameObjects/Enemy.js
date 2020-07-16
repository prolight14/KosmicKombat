export default class Enemy extends Phaser.GameObjects.PathFollower
{
    constructor (scene)
    {
        super(scene, undefined, 0, 0, "enemy");

        this.setScale(2);
    }

    startOnPath ()
    {
        var startPointVec = this.path.getStartPoint();

        this.setPosition(startPointVec.x, startPointVec.y);

        this.startFollow({
            duration: 10000,
            rotateToPath: true,
            rotationOffset: 90
        });

        this.hp = 100;
    }

    receiveDamage (damage)
    {
        this.hp -= damage;

        if(this.hp <= 0) 
        {
            this.setActive(false);
            this.setVisible(false); 
            this.destroy();     
        }
    }
}