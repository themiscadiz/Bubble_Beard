// import "/style.css";

let move = 0;
let startTimer = false;
let hoverNow = false;

function render() {
    let startButton = document.getElementById("timerSpace");
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
    // ctx.fillStyle = "#c0ecec"
    ctx.fillStyle = "#2E6D62";
    ctx.fill();

    // startButton.addEventListener("mouseover", () => {
    //     hoverNow = true;
    //     changeColor(hoverNow);
    // });
    // function changeColor(hoverNow) {
    //     if (hoverNow) {
    //         ctx.fillStyle = "#d4d28d";
    //         ctx.fill();
    //     }
    //     else {
    //         hoverNow = false;
    //     }
    // }

    startButton.addEventListener("click", () => {
        startTimer = true;

        // console.log(startTimer);
        let startButton = document.getElementById("startShow");
        startButton.innerHTML = `<h2> </h2>`;
    });

    if (startTimer) {
        move += 10;

        ctx.fillStyle = "#d4d28d";
        ctx.fill();

    }

    window.requestAnimationFrame(render);
}

render();


