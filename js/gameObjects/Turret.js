import { enemies, bullets } from "../scenes/playScene.js";
import Bullet from "../gameObjects/Bullet.js";

export default class Turret extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, "turret");

        this.setScale(2);

        this.nextTic = 0;

        this.range = 100;
        this.fireInterval = 500;
    }

    update (time, delta)
    {
        if(time > this.nextTic) 
        {
            this.fire();
            this.nextTic = time + this.fireInterval;
        }
    }

    fire () 
    {
        var enemy = this.getEnemy(this.x, this.y, this.range);
        if(enemy) 
        {
            var rotation = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            this.addBullet(this.x, this.y, rotation);
            this.angle = (rotation + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        }
    }

    addBullet (x, y, rotation)
    {
        var bullet = new Bullet(this.scene, x, y, rotation);

        bullets.add(bullet, true);
    }

    getEnemy (x, y, distance) 
    {
        var enemyUnits = enemies.getChildren();
        for(var i = 0; i < enemyUnits.length; i++) 
        {       
            if(Phaser.Math.Distance.BetweenPointsSquared({ x, y }, enemyUnits[i]) <= distance * distance)
            {
                return enemyUnits[i];
            }
        }
        return false;
    }
}