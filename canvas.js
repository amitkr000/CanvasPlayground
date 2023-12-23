let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Transfering method and function to draw circle, etc on canvas
let c = canvas.getContext("2d");

let colorArray = [
  "#092635",
  "#8803fc",
  "#fc03fc",
  "#3887BE",
  "#03fc66",
  "#d3fc03",
  "#200E3A",
  "#fc4503",
  "#872341",
];

let mouse = {
  x: undefined,
  y: undefined,
};

let circles = 300;
let speed = 3;
let maxRadius = 80;
let minRadius = 10;

//store circles object
let circleArray = [];
let rectArray = [];

let activeButtonId = null;

// Mouse input
window.addEventListener("mousemove", function (event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

// Browser window resize
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (activeButtonId == "circle") {
    generatecircle();
  } else if (activeButtonId == "rectangle") {
    generaterect();
  }
});

//Rectangle class
function Rectangle(x, y, dx, dy, diagonal) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.theta = Math.random() * 0.52 + 0.26; //(0.26 - 0.78)radian
  this.diagonal = diagonal;
  this.mindiagonal = diagonal;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    width = this.diagonal * Math.cos(this.theta);
    height = this.diagonal * Math.sin(this.theta);
    c.beginPath();
    c.rect(this.x, this.y, width, height);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.diagonal > innerWidth || this.x - this.diagonal < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.diagonal > innerHeight || this.y - this.diagonal < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.diagonal < maxRadius) {
        this.diagonal += 4;
      }
    } else if (this.diagonal > this.mindiagonal) {
      this.diagonal -= 1;
    }

    this.draw();
  };
}

//circle class
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

function generaterect() {
  circleArray.length = 0;
  rectArray.length = 0;
  for (let i = 0; i < circles; i++) {
    var property = Math.random() * 10 + 5;
    let x = Math.random() * (innerWidth - property * 2) + property;
    let y = Math.random() * (innerHeight - property * 2) + property;
    let dx = (Math.random() - 0.5) * speed;
    let dy = (Math.random() - 0.5) * speed;

    rectArray.push(new Rectangle(x, y, dx, dy, property));
  }
}

function generatecircle() {
  circleArray.length = 0;
  rectArray.length = 0;
  console.log("generate");
  for (let i = 0; i < circles; i++) {
    var property = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - property * 2) + property;
    let y = Math.random() * (innerHeight - property * 2) + property;
    let dx = (Math.random() - 0.5) * speed;
    let dy = (Math.random() - 0.5) * speed;

    circleArray.push(new Circle(x, y, dx, dy, property));
  }
}

let reqframe;

function animaterect() {
  cancelAnimationFrame(reqframe);
  reqframe = requestAnimationFrame(animaterect);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < rectArray.length; i++) {
    rectArray[i].update();
  }
}

function animatecircle() {
  cancelAnimationFrame(reqframe);
  reqframe = requestAnimationFrame(animatecircle);
  console.log(reqframe);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

function handleButtonClick(id) {
  if (activeButtonId) {
    document.getElementById(activeButtonId).classList.remove("active");
  }
  activeButtonId = id;
  document.getElementById(id).classList.add("active");
  if (activeButtonId == "circle") {
    console.log("circle");
    generatecircle();
    animatecircle();
  } else if (activeButtonId == "rectangle") {
    generaterect();
    animaterect();
  }
}
