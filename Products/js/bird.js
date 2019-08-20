// Angry Birds
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// https://youtu.be/TDQzoe9nslY
// https://editor.p5js.org/codingtrain/sketches/LbNt1nyxE

class Bird {
    constructor(x, y, r, vx = 0, vy = 0) {
        const options = {
            restitution: 0.8,
        }

        this.body = Matter.Bodies.circle(x, y, r, options);
        this.velocity = {
            x: vx,
            y: vy
        };

        Matter.Body.setMass(this.body, this.body.mass * 4);
        Matter.World.add(world, this.body);

        this.r = r;

    }
    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(prayerImg, 0, 0, this.r * 2, this.r * 2);
        pop();
    }

    move() {
        Matter.Body.setVelocity(this.body, this.velocity);
    };
}