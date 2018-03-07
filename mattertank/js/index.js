

var Example = Example || {};

Example.mixed = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1000,
            height: 600,
            showAngleIndicator: true,
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var parenty = $('.thingobox').outerHeight();
    $('.thingo').each(function(e,i){

        var y = $(i).offset().top;
        var x = 400;
        var h  = $(i).outerHeight();

        // y = y / parenty;
        // y = y * 600;

        y = 600 - y;

        var sides = Math.round(Common.random(1, 8));

        // triangles can be a little unstable, so avoid until fixed
        sides = (sides === 3) ? 4 : sides;

        // round the edges of some bodies
        var chamfer = null;
        if (sides > 2 && Common.random() > 0.7) {
            chamfer = {
                radius: 10
            };
        }

        // var b = null;
        // switch (Math.round(Common.random(0, 1))) {
        // case 0:
        //     if (Common.random() < 0.8) {
               
        //     } else {
        //         b = Bodies.rectangle(x, y, 1100, h , { chamfer: chamfer });
        //     }
        // case 1:
        //     b = Bodies.polygon(x, y, sides, 33, { chamfer: chamfer });
        // }


        var b = Bodies.rectangle(x, y, 200,h, { chamfer: chamfer, friction: 0.02, restitution: 0, density: 0.001  });
        World.add(world, b);
    });

    World.add(world, [
        // walls
        // Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 300, 50, { isStatic: true }),
        // Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        // Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

Example.mixed();