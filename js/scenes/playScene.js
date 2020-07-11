import FpsProfiler from "../tools/FpsProfiler.js";
import Enemy from "../gameObjects/Enemy.js";

export default class PlayScene extends Phaser.Scene 
{
    constructor (config)
    {
        super({
            key: "playScene"
        });
    }

    create ()
    {
        this.data.set("fpsProfiler", new FpsProfiler(this, 6));

        // This graphics element is only for visualization, 
        // It's not related to our path
        var graphics = this.add.graphics();    
        
        // The path for our enemies
        // Parameters are the start x and y of our path
        // var path = this.add.path(96, -32);
        // path.lineTo(96, 164);
        // path.lineTo(480, 164);
        // path.lineTo(480, 480);

        var path = new Phaser.Curves.Path(96, -32);

        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 480);

        console.log(path);

        graphics.lineStyle(3, 0xffffff, 1);
        // visualize the path
        path.draw(graphics);

        this.data.set("path", path);

        var enemies = this.add.group({ 
            classType: Enemy, 
            runChildUpdate: true 
        });

        this.data.set("enemies", enemies);

        this.nextEnemy = 0;
    }

    update (time, delta)
    {
        var fpsProfiler = this.data.get("fpsProfiler");

        fpsProfiler.showFps(delta);

        var { enemies, path } = this.data.values;

        // If it's time for the next enemy
        if (time > this.nextEnemy)
        {        
            var enemy = enemies.get();
            if (enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                
                // Place the enemy at the start of the path
                enemy.startOnPath(path);
                
                this.nextEnemy = time + 2000;
            }       
        }

        // Remove the enemy if it's off the screen 
        var firstEnemy = enemies.getFirst();

        if(firstEnemy && firstEnemy.follower.t >= 1)
        {
            enemies.remove({
                child: firstEnemy,
                removeFromScene: true, 
                destroyChild: true
            });
        }
    }
}