let gravity = 9.0;
let mass = 2.0;
let newIndicator;

let updateGravity = false;

let bubbles = [];
let mousePos;
let bubble;

let video;
let poseNet;
let poses = [];


let smoothMov = 0.05;
let lerp_X = 0;
let lerp_Y = 0;

let lerpPoints = [];
let lerpPos = [];

let lerpLength = 17;
let pointsLength = 17;


let myVid;

let mouth;
let wristR;
let wristL;


// let count = 0;

let counter = 0;

let mouthDistR;
let mouthDistL;
let videoCanvas;

// HAND
let handpose;
let predictions = [];

let timer;

var cnv;
let sketchWidth;
let sketchHeight;

//Sound variables
let mySnd;
let soundsArray = [];
// let sounds = ["/assets/pop.wav"];
let amp;
let popSound;

// Sound
function preload() {
  soundFormats('mp3', 'wav');
  popSound = loadSound('/assets/pop.wav');
}


function setup() {

    cnv = createCanvas(640, 480);

    cnv.style('border-radius', '60rem 60rem 40rem 60rem ');
    cnv.parent('videoCanvas');

    let sketchWidth = document.getElementById("videoCanvas").offsetWidth;
    let sketchHeight = document.getElementById("videoCanvas").offsetHeight;

    resizeCanvas(sketchWidth, sketchHeight);

    textAlign(CENTER, CENTER);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the video element, and just show the canvas


    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });

    // handpose = ml5.handpose(video, handModelReady);

    // // This sets up an event that fills the global variable "predictions"
    // // with an array every time new hand poses are detected
    // handpose.on("predict", results => {
    //   predictions = results;
    // });


    //  LERP FACE with PoseNet
    for (let i = 0; i < pointsLength; i++) {
        let thispoint = createVector(0, 0);
        lerpPos.push(thispoint);
    }

    for (let i = 0; i < pointsLength; i++) {
        bubble = new Beard(0.0, width / 2, mass, gravity);
        bubbles.push(bubble);
    }

    // Wrists
    wristR = createVector(width, height);
    wristL = createVector(width, height);
  
  //set sound amp and volume
  amp = new p5.Amplitude(0.9);
}




function modelReady() {
    // select('#status').html('Model Loaded');
    console.log("Model Pose Ready");
}

// function handModelReady() {
//     console.log("Hand Model ready!");
//   }


// function mousePressed() {
//     bubble = new Beard(0.0, width / 2, mass, gravity);
//     bubbles.push(bubble);
// }

function mousePressed() {
    for (let b of bubbles) {
        b.clicked(mouseX, mouseY);
        // bubbles.pop(b);
    }
}

function draw() {
    // image(video, 0, 0, sketchWidth, sketchHeight);
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();

    // drawHandKeypoints();

    mousePos = createVector(mouseX, mouseY);

    // let newIndicator = createVector(mouthTop.x, mouthTop.y);
    let newIndicator = createVector(mouth.x, mouth.y);

    // for (let b of bubbles) {
    //     b.update(newIndicator.x, newIndicator.y);
    //     b.display(newIndicator.x, newIndicator.y);
    // }



    for (let b of bubbles) {
        b.update(newIndicator.x, newIndicator.y, updateGravity);
        b.display(newIndicator.x, newIndicator.y);

        // Explode bubbles

        //boolean to know if circle are close
        let isClose = false;

        // create "other" variable of circles to compare with other circles. For each circle, check the proximity to all the other circles.

        for (let other of bubbles) {

            //If "other" circle is not the same as "c", and its close enough, change boolean to true and check if sound is playing.If it is not playing, play.
            if (b !== other && b.proximity(other)) {
                //   isClose = true;
                //   if(!c.mySnd.isPlaying()){
                //     c.mySnd.play();
                //   }
            }


            // //If proximity is true, change color
            // if (isClose) {
            //   b.changeColor(0);   
            // } 
            // else {
            //   b.changeColor(255);
            // }

            // //Draw lines when they are close enough
            // if (b !== other){
            //   b.drawLine(other);
            // }
        }
    }
}

// hand
// // A function to draw ellipses over the detected keypoints
// function drawHandKeypoints() {
//     for (let i = 0; i < predictions.length; i += 1) {
//       const prediction = predictions[i];
//       for (let j = 0; j < prediction.landmarks.length; j += 1) {
//         const keypoint = prediction.landmarks[j];
//         fill(0, 255, 0);
//         noStroke();
//         ellipse(keypoint[0], keypoint[1], 10, 10);

//         if (predictions.length != 0) {
//             text(prediction.landmarks[j], prediction.landmarks[j][0], prediction.landmarks[j][1]);
//         }

//         // ellipse(prediction.landmarks[4][0], prediction.landmarks[4][1], 30, 30); 
//       }
//     }
//   }



// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {

        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;

        for (let j = 0; j < pose.keypoints.length; j++) {


            let keypoint = pose.keypoints[j];

            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.0) {
                // fill(255, 0, 0);
                // ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

                //       //  LERP
                lerp_X = lerp(lerpPos[j].x, keypoint.position.x, smoothMov);
                lerp_Y = lerp(lerpPos[j].y, keypoint.position.y, smoothMov);


                let keypointPos = createVector(lerp_X, lerp_Y);

                lerpPos[j] = keypointPos;

                // fill(0, 255, 255);
                // ellipse(lerpPos[j].x, lerpPos[j].y, 30, 30);
            }
        }
    }
    // Mouth
    mouth = createVector(lerpPos[0].x, lerpPos[0].y+50);
    fill(255,0,0);
    // ellipse(mouth.x, mouth.y, 50,50);


    // Wrists
    wristR = createVector(lerpPos[10].x, lerpPos[10].y);

    wristL = createVector(lerpPos[9].x, lerpPos[9].y);



    // distance between lips
    mouthDistR = mouth.dist(wristR);
    // console.log(mouthDistR);

    // distance between lips
    mouthDistL = mouth.dist(wristL);

    if (counter > 300) {
        if (mouthDistR < 100 || mouthDistL<100) {
            fill(255, 0, 255);
            bubblesFall();
        }
        else {
            fill(255);
        }
    }
    // ellipse(wristR.x, wristR.y, 100, 100);
    // ellipse(wristL.x, wristL.y, 100, 100);

    counter++;
    // console.log(counter)

}
function bubblesFall() {
    updateGravity = true;
}