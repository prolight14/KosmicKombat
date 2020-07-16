export default class Bullet extends Phaser.GameObjects.Image
{
    constructor (scene, x, y, rotation)
    {
        super(scene, x, y, "bullet");

        this.dx = Math.cos(rotation);
        this.dy = Math.sin(rotation);
 
        this.lifespan = 200;
        this.speed = 0.5;
        this.damage = 50;
    }

    update (time, delta)
    {
        this.lifespan -= delta;
 
        this.x += this.dx * this.speed * delta;
        this.y += this.dy * this.speed * delta;
 
        if(this.lifespan <= 0)
        {
            this.destroy();
        }
    }
}