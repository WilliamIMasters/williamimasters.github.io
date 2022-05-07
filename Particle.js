// Canvas global variables
let canvas, ctx;
let particles = [];

// Time/Loop global variables
let now, dt=0, last=timestamp(), step=1/60;

// Declare inputs
let ttlMin, ttlMax;

class Ball{
  constructor() {
    this.randomStart();
    this.colour = "black";
    this.size = 5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.stroke();
  }
  updatePos() {
    if(this.ttl <= (now-this.spawnTime)) {
      this.randomStart();
    }
    this.x += this.vx;
    this.y += this.vy;

    this.vx += this.ax;
    this.vy += this.ay;
  }
  randomStart() {
    this.x = canvas.width/2;
    this.y = canvas.height/4;
    this.vx = Math.random() * 16 - 8;
    this.vy = Math.random() * 16 - 8;
    this.ax = 0;
    this.ay = 0.981
    this.spawnTime = timestamp();
    this.ttl = (Math.random()*(ttlMax - ttlMin) + ttlMin) * 1000;
  }
}

function init() {
  console.log("init()");

  // Gets inputs
  updateInputs();

  canvas = document.getElementById("C1");
  ctx = canvas.getContext("2d");

  // init particles
  for(let i=0; i < 20; i++) {
    particles[i] = new Ball();
  }



  gameloop();
}



function update() {
  particles.forEach((ball, i) => {
    ball.updatePos();
  });

}


function draw() {
  // clear the canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  // draws each particle
  particles.forEach((ball, i) => {
    ball.draw();
  });

}

function gameloop() {
  now = timestamp();
  dt = dt+ Math.min(1, (now-last)/1000);
  while(dt > step) {
    dt= dt-step;
    update();
  }

  draw();


  last = now;
  window.requestAnimationFrame(gameloop);
}

function updateInputs() {
  console.log("updateInputs");
  ttlMax = document.getElementById("ttlMax").value;
  ttlMin = document.getElementById("ttlMin").value;
}

function timestamp() {
  return new Date().valueOf();
}

document.addEventListener("DOMContentLoaded", init);
