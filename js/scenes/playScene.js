import FpsProfiler from "../tools/FpsProfiler.js";
import Enemy from "../gameObjects/Enemy.js";
import Turret from "../gameObjects/Turret.js";
import Bullet from "../gameObjects/Bullet.js";
import config from "../index.js";

var fpsProfiler, path, enemies, turrets, bullets, turretHoles, turretHolesGraphics, turretMenuRange, turretMenuGraphics;

export { bullets, enemies };

export default class PlayScene extends Phaser.Scene 
{
    constructor ()
    {
        super({
            key: "playScene"
        });
    }

    create ()
    {
        fpsProfiler = new FpsProfiler(this, 6);

        // This graphics element is only for visualization, 
        // It's not related to our path
        var graphics = this.add.graphics();    
        
        // The path for our enemies
        // Parameters are the start x and y of our path
        path = this.add.path(96, -32); // We could also do: new Phaser.Curves.Path(96, -32)
        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 600);
        
        graphics.lineStyle(3, 0xFFFFFF, 1);

        turretHoles = [{
            x: 300,
            y: 205,
            radius: 25,
            range: 100
        },
        {
            x: 100,
            y: 205,
            radius: 25,
            range: 100
        }, 
        {
            x: 160,
            y: 110,
            radius: 25,
            range: 100
        }];

        // Visualize the path
        path.draw(graphics);

        enemies = this.physics.add.group({ 
            classType: Enemy,
            createCallback: function(enemy)
            {
                enemy.path = path;
            },
            runChildUpdate: true 
        });

        this.nextEnemy = 0;

        bullets = this.physics.add.group({ 
            classType: Bullet, 
            runChildUpdate: true 
        });

        turrets = this.add.group({ 
            classType: Turret, 
            runChildUpdate: true 
        });
        this.input.on("pointerdown", this.placeTurret);

        turretHolesGraphics = this.add.graphics();

        // Show the turret holes
        for(let i = 0; i < turretHoles.length; i++)
        {
            turretHolesGraphics.fillStyle(0xFFFFFF, 0.2);
            turretHolesGraphics.fillCircle(turretHoles[i].x, turretHoles[i].y, turretHoles[i].radius);

            turretHolesGraphics.fillStyle(0x000000, 0.125);
            turretHolesGraphics.fillCircle(turretHoles[i].x, turretHoles[i].y, turretHoles[i].radius * 0.5);
        }

        this.physics.add.overlap(enemies, bullets, this.damageEnemy);

        turretMenuGraphics = this.add.graphics({
            fillStyle: {
                color: 0xFFFFFF,
                alpha: 0.2
            }
        });
        turretMenuRange = new Phaser.Geom.Circle(0, 0, 0);

        this.isPointerDown = false;
        this.input.on("pointerdown", () =>
        {
            this.isPointerDown = true;
        }, 
        this);
        this.input.on("pointerup", () =>
        {
            this.isPointerDown = false;
        }, 
        this);
        this.input.on("pointermove", this.showTurretMenu, this);
    }
    
    damageEnemy (enemy, bullet)
    {
        bullet.setActive(false);
        bullet.setVisible(false);    
        bullet.destroy();
        
        enemy.receiveDamage(bullet.damage);
    }

    placeTurret (pointer)
    {
        for(let i = 0; i < turretHoles.length; i++)
        {
            if(!turretHoles[i].taken && Phaser.Math.Distance.BetweenPointsSquared(pointer, turretHoles[i]) < turretHoles[i].radius * turretHoles[i].radius)
            {
                var turret = turrets.get(turretHoles[i].x, turretHoles[i].y);

                turret.setActive(true);
                turret.setVisible(true);

                turretHoles[i].taken = true;
                break;
            }
        }
    }

    showTurretMenu (pointer)
    {   
        for(let i = 0; i < turretHoles.length; i++)
        {
            if(turretHoles[i].taken && Phaser.Math.Distance.BetweenPointsSquared(pointer, turretHoles[i]) < turretHoles[i].radius * turretHoles[i].radius)
            {
                turretMenuRange = new Phaser.Geom.Circle(turretHoles[i].x, turretHoles[i].y, turretHoles[i].range);
                break;
            }
        }
    }

    update (time, delta)
    {
        turretMenuGraphics.clear();
        
        if(this.isPointerDown)
        {
            turretMenuGraphics.fillCircleShape(turretMenuRange);
        }

        fpsProfiler.showFps(delta);

        if(time > this.nextEnemy)
        {
            var enemy = enemies.get();

            if(enemy)
            {
                enemy.setActive(true);
                enemy.setVisible(true);
                enemy.startOnPath();

                this.nextEnemy = time + 2000;
            }
        }

        var firstEnemy = enemies.getChildren()[0];

        if(firstEnemy && firstEnemy.y >= config.height + firstEnemy.height)
        {
            firstEnemy.destroy();
        }
    }
}