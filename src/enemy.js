import Entity from "./entity"

class Enemy extends Entity {
    constructor(ctx, ship) {
        super(ctx)
        this.randomPos();
        this.vel = [0, 0]
        this.ship = ship;
        this.moveSpeed = 4;
        this.rotation = 0;
    }

    randomPos() {
        let y = Math.floor(Math.random() * window.innerHeight)
        let x = Math.random() < 0.5 ? -25 : window.innerWidth + 25
        this.pos = [x, y]
    }

    move(delta) {
        this.vel[0] = this.moveSpeed * Math.cos(this.rotation) * delta / 20
        this.vel[1] = this.moveSpeed * Math.sin(this.rotation) * delta / 20
    }

    draw() {
        this.pos[0] -= this.vel[0]
        this.pos[1] -= this.vel[1]

        this.rotation = Math.atan2(
          this.pos[1] - this.ship.pos[1],
          this.pos[0] - this.ship.pos[0]
        );

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.pos[0], this.pos[1]);
        this.ctx.rotate((this.rotation + (Math.PI / 2)));
        this.ctx.moveTo(-20, 0);
        this.ctx.lineTo(0, 40);
        this.ctx.lineTo(20, 0);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}

export default Enemy;