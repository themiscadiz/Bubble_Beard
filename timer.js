// import "/style.css";

let move = 0;
function render(){
let canvas = document.getElementById("timerCanvas");
let ctx = canvas.getContext('2d');

let pixelRatio = 1;

canvas.width = window.innerWidth * pixelRatio;
canvas.height = window.innerHeight * pixelRatio;

ctx.clearRect(0, 0, canvas.width, canvas.height);


// ctx.fillStyle = `hsl(${Math.random() * 360}, 90%, 60%)`;
// ctx.strokeStyle = `hsl(${Math.random() * 360}, 90%, 60%)`;


ctx.beginPath();
ctx.rect(move, 0, canvas.width, canvas.height);
ctx.fillStyle = "#c0ecec"
ctx.fill();

// move += 0.1;
move += 15;


window.requestAnimationFrame(render);
}

render();


