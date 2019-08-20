class Box {

    constructor(x, y, w, h, vx = 0, vy = 0) {
        const options = {
            restitution: 0.8
        }
        this.body = Matter.Bodies.rectangle(x, y, w, h, options);
        Matter.World.add(world, this.body);

        this.velocity = {
            x: vx,
            y: vy
        };

        this.w = w;
        this.h = h;
    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(255);
        rectMode(CENTER);
        imageMode(CENTER);
        image(flagImg, 0, 0, this.w, this.h);
        pop();
    }

    move() {
        Matter.Body.setVelocity(this.body, this.velocity);
    };

}