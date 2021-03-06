class Beard {

  constructor(xpos, ypos, m, g) {

    this.x = xpos; // The x- and y-coordinates
    this.y = ypos;
    this.vx = 0; // The x- and y-axis velocities
    this.vy = 0;
    this.mass = m;
    this.gravity = g;
    this.radius = random(5, 30);
    this.updateRadius = this.radius;

    this.stiffness = random(0.08, 0.5);
    this.damping = random(0.25, 0.80);
    console.log("damping ", this.damping, "stiffnes ", this.stiffness);

    this.randomPosX = random(-50, 50);
    this.randomPosY = random(-50, 50);


    // some Noise
    this.mover = createVector(this.x, this.y);
    this.noiseXOff = 10.0;
    this.noiseYOff = 20.0;


    this.r = random(230, 255);
    this.g = random(230, 255);
    this.b = random(230, 255);
    this.a = random(100, 200);
  }

  update(targetX, targetY, updateGravity, relativeSize) {
    // move a little bit position with noise
    this.noiseXOff += 0.008;
    this.noiseYOff += 0.008;
    this.slowMoP = 30;
    this.slowMoN = -30;

    if (updateGravity) {
      this.gravity += 1;
    }

    this.updateRadius = map(relativeSize, 30, 60, 0, 40);

    console.log(relativeSize);

    this.mover.x = map(noise(this.noiseXOff), 0, 1, this.slowMoN, this.slowMoP);
    this.mover.y = map(noise(this.noiseYOff), 0, 1, this.slowMoN, this.slowMoP);

    let forceX = ((this.mover.x + (targetX + this.randomPosX)) - this.x) * this.stiffness;
    // let forceX = ((targetX + this.randomPosX) - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;

    let forceY = ((this.mover.y + (targetY + this.randomPosY)) - this.y) * this.stiffness;
    // let forceY = ((targetY + this.randomPosY) - this.y) * this.stiffness;
    forceY += this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

  clicked(touch_x, touch_y) {
    let d = dist(touch_x, touch_y, this.x, this.y);
    if (d < this.radius) {
      console.log("just clicked")
      this.a = 0;
      popSound.play();
    }

  }

  proximity(other) {
    // let d = dist(this.x, this.y, other.x, other.y);
    let d = dist(this.x, this.y, other.x, other.y);

    //return distance to change color in sketch.js
    return (d - 20 < this.radius + other.radius);
  }

  //change color to the colors assignated in the draw function if circles are close
  changeColor(bright) {
    this.a = bright;
  }




  display(nx, ny) {
    // drawingContext.shadowOffsetX = 4;
    // drawingContext.shadowOffsetY = -4;
    // drawingContext.shadowBlur = 10;
    // drawingContext.shadowColor = 'black';

    // stroke(255);
    // line(this.x, this.y, nx, ny);

    fill(this.r, this.g, this.b, this.a);

    noStroke();

    ellipse(this.x, this.y, (this.radius * 2) + this.updateRadius, (this.radius * 2) + this.updateRadius);
    // ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  drawLine(other) {
    let d = dist(this.x, this.y, other.x, other.y)
    if (d - 40 < this.radius + other.radius) {
      stroke(287, 21, 88);

      if (d - 20 < this.radius + other.radius) {
        strokeWeight(2);
      } else {
        strokeWeight(1);
      }
      line(this.x, this.y, other.x, other.y);
    }
  }

}