var ENEMY_SPEED = 1/10000;

export default class Enemy extends Phaser.GameObjects.Image
{
    constructor (scene)
    {
        super(scene, 0, 0, "enemy");

        this.path = scene.data.get("path");

        this.follower = { 
            t: 0, 
            vec: new Phaser.Math.Vector2() 
        };
    }

    startOnPath ()
    {
        this.setScale(2);

        // set the t parameter at the start of the path
        this.follower.t = 0;
        
        // get x and y of the given t point            
        this.path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }

    update (time, delta, path)
    {
        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += ENEMY_SPEED * delta;
        
        // get the new x and y coordinates in vec
        this.path.getPoint(this.follower.t, this.follower.vec);
        
        // update enemy x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }
}