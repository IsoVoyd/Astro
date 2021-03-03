import GameView from "./game_view";

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("astro-canvas")
    let ctx = canvas.getContext("2d")

    let gameView = new GameView(ctx)
    gameView.start();
})
// let canvas = document.getElementById("astro-canvas")
// let ctx = canvas.getContext("2d")
// ctx.canvas.width = window.innerWidth;
// ctx.canvas.height = window.innerHeight;
// let game = new Game(ctx.canvas.width, ctx.canvas.height);