import Asteroid from "./asteroid.js";
import Ship from "./ship.js";

class Game {
  constructor(DIM_X, DIM_Y, ctx, view) {
    this.asteroids = [];
    this.ctx = ctx;
    this.ship = new Ship(ctx);
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.view = view;
  }

  allObjects() {
    return [this.ship, ...this.asteroids];
  }

  spawnAsteroid() {
    this.asteroids.push(new Asteroid(this.ctx));
  }

  checkCollisions() {
      this.ship.lasers.forEach((laser, i) => {
          this.asteroids.forEach((asteroid, j) => {
            let distance = Math.sqrt(((laser.pos[0] - asteroid.pos[0]) ** 2) + ((laser.pos[1] - asteroid.pos[1])**2))
            if(distance < 50) {
                this.ship.lasers.splice(i, 1)
                this.asteroids.splice(j, 1)
            }
          })
      })

      this.asteroids.forEach((asteroid, i) => {
          let distance = Math.sqrt(
            (this.ship.pos[0] - asteroid.pos[0]) ** 2 +
            (this.ship.pos[1] - asteroid.pos[1]) ** 2
          );

          if (distance < 50) {
              this.ship.health--
              this.asteroids.splice(i, 1);
          }
      })
  }

  draw(delta) {
    if(this.ship.health <= 0) this.view.gameOver = true;
    this.checkCollisions()
    if (this.asteroids.length < 10) this.spawnAsteroid();
    this.allObjects().forEach((obj, idx) => {
      obj.move(delta);
      obj.draw();
      if (obj.isOutOfBounds()) {
        this.asteroids.splice(idx - 1, 1);
      }
    });
  }
}

export default Game;
