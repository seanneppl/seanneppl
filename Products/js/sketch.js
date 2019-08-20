const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let birds = [];
let boxes = [];
let world, engine;
let canvas;
let bottom, left, right;
let counter = 0;

let angle = 0;

let radius = 30;
let speed = 40;

let prayerImg;
let flagImg;

function preload() {
   prayerImg = loadImage("../images/untitled.png");
   flagImg = loadImage('../images/flag.png');
}

function setup() {
   canvas = createCanvas(window.innerWidth, window.innerHeight);
   canvas.position(0, 0);

   canvas.style("pointer-events", "none");

   engine = Engine.create();
   world = engine.world;
   engine.world.gravity.y = 0;

   //Create bottom border
   //x y w h
   bottom = new Wall(canvas.width / 2, canvas.height + 25, canvas.width, 50);
   left = new Wall(-25, canvas.height / 2, 50, canvas.height);
   right = new Wall(canvas.width + 25, canvas.height / 2, 50, canvas.height);

   // Flags / Birds
   setInterval(() => {

      if (!document.hidden) {

         angle += 20;
         angle %= 180;

         let inRadians = (angle * (Math.PI / 180)).toFixed(3);
         let xy = randomAngle(speed, inRadians);

         if (angle % 40 === 0) {
            boxes.push(new Box((canvas.width / 3) * 2, -50, 60, 50, xy.x, xy.y));
            boxes[boxes.length - 1].move();
            boxes.push(new Box(canvas.width / 3, -50, 60, 50, xy.x, xy.y));
            boxes[boxes.length - 1].move();
         } else {
            birds.push(new Bird((canvas.width / 3) * 2, -50, radius, xy.x, xy.y));
            birds[birds.length - 1].move();
            birds.push(new Bird(canvas.width / 3, -50, radius, xy.x, xy.y));
            birds[birds.length - 1].move();
         }

      }
   }, 300);
}

setInterval(() => {
   console.log("bottom");

   World.remove(world, bottom.body);
   bottom = null;

   setTimeout(() => {
      console.log("new wall")
      bottom = new Wall(canvas.width / 2, canvas.height + 25, canvas.width, 50);
   }, 1000 * 5);

}, 20 * 1000);



function keyPressed() {
   // console.log(Boolean(bottom));
   if (key == ' ') {
      console.log(bottom);
      // birds.forEach(each => each.move());
      if (Boolean(bottom)) {
         World.remove(world, bottom.body);
         bottom = null;
      } else {
         bottom = new Wall(canvas.width / 2, canvas.height + 25, canvas.width, 50);
      }
   }
}

function randomPos(width, height, r) {

   let diameter = r * 2;

   return {
      leftSide: { x: -diameter, y: Math.floor(Math.random() * height), vx: speed },
      rightSide: { x: width + diameter, y: Math.floor(Math.random() * height), vx: -speed },
      topSide: { x: Math.floor(Math.random() * width), y: -diameter, vy: speed },
      bottomSide: { x: Math.floor(Math.random() * width), y: height + diameter, vy: -speed }
   };
}

function randomAngle(speed, angle) {

   let x = speed * Math.cos(angle);
   let y = speed * Math.sin(angle);

   return {
      x: x, y: y
   }
}

function draw() {
   clear();

   Matter.Engine.update(engine);

   birds.forEach((bird, index) => {
      bird.show();

      if (bird.body.position.x < (-2 * bird.r) || bird.body.position.y > (canvas.height + (10 * bird.r)) || bird.body.position.x > (canvas.width + (2 * bird.r)) || bird.body.position.y < (-2 * bird.r)) {
         // console.log("out of bounds");

         World.remove(world, bird.body);
         birds.splice(index, 1);

      }
   });

   boxes.forEach((box, index) => {
      box.show();

      if (box.body.position.x < (-2 * box.w) || box.body.position.y > (canvas.height + (10 * box.w)) || box.body.position.x > (canvas.width + (2 * box.w)) || box.body.position.y < (-2 * box.w)) {
         // console.log("out of bounds");

         World.remove(world, box.body);
         boxes.splice(index, 1);

      }
   });
}