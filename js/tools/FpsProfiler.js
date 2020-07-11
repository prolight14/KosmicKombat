export default class FpsProfiler 
{
    #graphVars;

    constructor (scene, decimals)
    {
        this.decimals = decimals;

        var driveX = 0;
        var maxLineHeight = 50;
        var rightMostLine = 200;
        var flushRate = 1000;
        var graphX = 20;
        var prev = [];

        this.#graphVars = { driveX, maxLineHeight, rightMostLine, flushRate, graphX, prev };

        this.scene_create(scene);
    }

    scene_create (scene)
    {
        this.fpsText = scene.add.text(0, 0, "Fps: <??>", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        this.graph = scene.add.graphics({ 
            fillStyle: {
                color: 0x00DD11 
            }
        });

        this.graph.setY(80);
    }

    showFps (delta)
    {
        var fps = 1000.0 / delta;

        this.fpsText.setText("Fps: " + fps.toFixed(this.decimals));
    }

    showGraph (delta)
    {
        var fps = 1000.0 / delta;

        var { driveX, maxLineHeight, rightMostLine, flushRate, graphX, prev } = this.#graphVars;
        
        var graph = this.graph;

        var lineHeight = fps * maxLineHeight / 60;
        prev.push(lineHeight);

        graph.fillRect(driveX++, maxLineHeight - lineHeight, 1, lineHeight);

        if(driveX > rightMostLine)
        {
            graph.setX(graph.x - 1);
            prev.shift();
        }

        // If the buffered lines get too large flush, maybe not be needed 
        // since Phaser 3 *might* already take care of this.
        if(driveX > flushRate)
        {
            graph.clear();

            driveX = 0;
            graph.setX(graphX);

            while(driveX < 200)
            {
                graph.fillRect(driveX++, maxLineHeight - prev[driveX], 1, prev[driveX]);
            }
        }

        this.#graphVars = { driveX, maxLineHeight, rightMostLine, flushRate, graphX, prev };
    }
}