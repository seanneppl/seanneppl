class Wall {

    constructor(x, y, w, h) {
        const options = {
            isStatic: true
        }
        this.body = Matter.Bodies.rectangle(x, y, w, h, options);
        Matter.World.add(world, this.body);
        this.w = w;
        this.h = h;
    }

}