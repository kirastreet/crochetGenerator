/*
CROCHET CHART GENERATOR

Generates different circular crochet charts using the 
different crochet stitches increasing as you increase the number of rounds.

NEXT STEPS:
Make the randomize and normal toggles work
Word pattern

*/

var chain, dc, sc, doubleDC;
var puff, dcCorner, shell, picot, dcChainCorner;

var stitches = [];
var equivNum = []; //array equivalent number of stitches
var basicEquivNum = [];
var specialEquivNum = [];
var basicStitches = [];
var specialStitches = [];
var stitchNum;

var stitchNames = [];
var basicStitchesNames = [];
var specialStitchesNames = [];

var decoration, pattern;
//var singleIncrease; // doubleIncrease;

var randomize = false; //booleans that detect if the button is pressed
var normal = true;
var checked = false;
var helper = false;

//var initStitchNum = 6;
//var equivInitStitchNum;
var saveNum = 1;
var incCounter; // keeps track of the number of increase rounds
// var incNum;
// var stitchInd; //variable for the random stitch index
// var stitchIndTwo;
// var basicStitchInd;
// var specialStitchInd;
// var incChange;

var r = 190;
var i;

var replaceCheck = false;
var stitchScale = 0.2;

var probPattern;
var index;
var lastStitch;

var startStitchProb = []; // prob of chain, sc, etc starting
var chainStitchProb = []; // prob of x stitch given a chain as previous stitch
var scStitchProb = []; // prob of x stitch given a sc as previous stitch
var dcStitchProb = []; // prob of x stitch given a dc as previous stitch
var doubleDCStitchProb = []; // prob of x stitch given a double dc as previous stitch
var dcCornerStitchProb = []; // prob of x stitch given a dc corner as previous stitch
var dcChainCornerStitchProb = []; // prob of x stitch given a dc chain corner as previous stitch
var shellStitchProb = []; // prob of x stitch given a shell as previous stitch
var picotStitchProb = []; // prob of x stitch given a picot as previous stitch
var puffStitchProb = []; // prob of x stitch given a puff as previous stitch


  // sums of the probabilities for chain, don't need the sum of everything since you can just use "Else"
var chSumZero, chSumOne, chSumTwo, chSumThree, chSumFour, chSumFive, chSumSix, chSumSeven;


// sums of the probabilities for sc
var scSumZero, scSumOne, scSumTwo, scSumThree, scSumFour, scSumFive, scSumSix, scSumSeven;


// sums of the probabilities for dc
var dcSumZero, dcSumOne, dcSumTwo, dcSumThree, dcSumFour, dcSumFive, dcSumSix, dcSumSeven;

// sums of the probabilities for double dc
var ddcSumZero, ddcSumOne, ddcSumTwo, ddcSumThree, ddcSumFour, ddcSumFive, ddcSumSix, ddcSumSeven;

// sums of the probabilities for dc corner
var dcCornSumZero, dcCornSumOne, dcCornSumTwo, dcCornSumThree, dcCornSumFour, dcCornSumFive, dcCornSumSix, dcCornSumSeven;

// sums of the probabilities for dc chain corner
var dcChCornSumZero, dcChCornSumOne, dcChCornSumTwo, dcChCornSumThree, dcChCornSumFour, dcChCornSumFive, dcChCornSumSix, dcChCornSumSeven;

// sums of the probabilities for shell
var shellSumZero, shellSumOne, shellSumTwo, shellSumThree, shellSumFour, shellSumFive, shellSumSix, shellSumSeven;

// sums of the probabilities for picot
var picotSumZero, picotSumOne, picotSumTwo, picotSumThree, picotSumFour, picotSumFive, picotSumSix, picotSumSeven;

// sums of the probabilities for puff
var puffSumZero, puffSumOne, puffSumTwo, puffSumThree, puffSumFour, puffSumFive, puffSumSix, puffSumSeven;



///////////////////////


function preload() {
  chain = loadImage("stitches/chain.png"); // CHANGE ALL THE SVGS TO PNGS
  dc = loadImage("stitches/dc.png");
  sc = loadImage("stitches/sc.png");
  doubleDC = loadImage("stitches/double_dc.png");
  dcChainCorner = loadImage("stitches/dc_3ch_corner.png");
  dcCorner = loadImage("stitches/dc_ch_corner.png");
  shell = loadImage("stitches/shell.png");
  picot = loadImage("stitches/picot.png");
  puff = loadImage("stitches/puff.png");
}

function setup() {
  if (windowWidth > 800) { // for desktop
    createCanvas(3*windowWidth/4, windowHeight); 
    stitchScale = 0.2;
    r = 190; 
  }
  else if (windowWidth >= 1800) { // for large desktop
    createCanvas(2.4*windowWidth/4, windowHeight);
    stitchScale = 0.2;
    r = 190; 
  }
  else { // for mobile
    //createCanvas(windowWidth, 6*windowHeight/5);
    createCanvas(windowWidth, windowHeight);
    stitchScale = 0.12;
    r = 150; 
  }
  
  stitches[0] = chain;
  stitches[1] = sc;
  stitches[2] = dc;
  stitches[3] = doubleDC;
  stitches[4] = dcCorner;
  stitches[5] = dcChainCorner;
  stitches[6] = shell;
  stitches[7] = picot;
  stitches[8] = puff;
  
  basicStitches[0] = chain;
  basicStitches[1] = sc;
  basicStitches[2] = dc;
  basicStitches[3] = doubleDC;
  basicStitches[4] = puff;
  
  specialStitches[0] = dcCorner;
  specialStitches[1] = dcChainCorner;
  specialStitches[2] = shell;
  specialStitches[3] = picot;

  stitchNames = ["chain", "single crochet", "double crochet", "two double crochet", "dc chain shell", "three chain dc shell", "shell", "picot", "puff"];
  basicStitchesNames = ["chain", "single crochet", "double crochet", "two double crochet", "puff"];
  specialStitchesNames = ["dc chain shell", "three chain dc shell", "shell", "picot"];

  
  equivNum = [1, 1, 1, 2, 2, 2, 5, 1, 1];
  basicEquivNum = [1, 1, 1, 2, 1];
  specialEquivNum = [2, 2, 5, 1];


  // PROBABILITY VARIABLES

  startStitchProb = [0.5, 0.2, 0.1, 0.05, 0.05, 0.05, 0, 0, 0.05]; // prob of chain, sc, etc starting
  chainStitchProb = [0.05, 0.2, 0.2, 0.2, 0.05, 0.05, 0.05, 0.1, 0.1]; // prob of x stitch given a chain as previous stitch
  scStitchProb = [0.1, 0.4, 0.3, 0.1, 0, 0, 0.05, 0, 0.05]; // prob of x stitch given a sc as previous stitch
  dcStitchProb = [0.05, 0.3, 0.3, 0.05, 0.1, 0.1, 0.05, 0, 0.05]; // prob of x stitch given a dc as previous stitch
  doubleDCStitchProb = [0.1, 0.2, 0.4, 0.1, 0.05, 0.05, 0.05, 0, 0.05]; // prob of x stitch given a double dc as previous stitch
  dcCornerStitchProb = [0.1, 0.1, 0.2, 0.05, 0.2, 0.2, 0, 0.05, 0.1]; // prob of x stitch given a dc corner as previous stitch
  dcChainCornerStitchProb = [0.2, 0.2, 0.3, 0.1, 0.05, 0.05, 0.05, 0.05, 0]; // prob of x stitch given a dc chain corner as previous stitch
  shellStitchProb = [0, 0.2, 0.3, 0.05, 0.05, 0.05, 0.1, 0.05, 0.2]; // prob of x stitch given a shell as previous stitch
  picotStitchProb = [0.1, 0.3, 0.3, 0.2, 0, 0, 0.05, 0, 0.05]; // prob of x stitch given a picot as previous stitch
  puffStitchProb = [0.05, 0.2, 0.2, 0.2, 0.05, 0, 0.1, 0.1, 0.1]; // prob of x stitch given a puff as previous stitch



  // sums of the probabilities for chain, don't need the sum of everything since you can just use "Else"
  chSumZero = chainStitchProb[0];
  chSumOne = chainStitchProb[0] + chainStitchProb[1];
  chSumTwo = chainStitchProb[0] + chainStitchProb[1] + chainStitchProb[2];
  chSumThree = chainStitchProb[0] + chainStitchProb[1] + chainStitchProb[2] + chainStitchProb[3];
  chSumFour = chainStitchProb[0] + chainStitchProb[1] + chainStitchProb[2] + chainStitchProb[3] + chainStitchProb[4];
  chSumFive = chainStitchProb[0] + chainStitchProb[1] + chainStitchProb[2] + chainStitchProb[3] + chainStitchProb[4] + chainStitchProb[5];
  chSumSix = chainStitchProb[0] + chainStitchProb[1] + chainStitchProb[2] + chainStitchProb[3] + 
      chainStitchProb[4] + chainStitchProb[5] + chainStitchProb[6];
  chSumSeven = chainStitchProb[0] + chainStitchProb[1] + chainStitchProb[2] + chainStitchProb[3] + 
      chainStitchProb[4] + chainStitchProb[5] + chainStitchProb[6] + chainStitchProb[7];

  // sums of the probabilities for sc
  scSumZero = scStitchProb[0];
  scSumOne = scStitchProb[0] + scStitchProb[1];
  scSumTwo = scStitchProb[0] + scStitchProb[1] + scStitchProb[2];
  scSumThree = scStitchProb[0] + scStitchProb[1] + scStitchProb[2] + scStitchProb[3];
  scSumFour = scStitchProb[0] + scStitchProb[1] + scStitchProb[2] + scStitchProb[3] + scStitchProb[4];
  scSumFive = scStitchProb[0] + scStitchProb[1] + scStitchProb[2] + scStitchProb[3] + scStitchProb[4] + scStitchProb[5];
  scSumSix = scStitchProb[0] + scStitchProb[1] + scStitchProb[2] + scStitchProb[3] + 
      scStitchProb[4] + scStitchProb[5] + scStitchProb[6];
  scSumSeven = scStitchProb[0] + scStitchProb[1] + scStitchProb[2] + scStitchProb[3] + 
      scStitchProb[4] + scStitchProb[5] + scStitchProb[6] + scStitchProb[7];

  // sums of the probabilities for dc
  dcSumZero = dcStitchProb[0];
  dcSumOne = dcStitchProb[0] + dcStitchProb[1];
  dcSumTwo = dcStitchProb[0] + dcStitchProb[1] + dcStitchProb[2];
  dcSumThree = dcStitchProb[0] + dcStitchProb[1] + dcStitchProb[2] + dcStitchProb[3];
  dcSumFour = dcStitchProb[0] + dcStitchProb[1] + dcStitchProb[2] + dcStitchProb[3] + dcStitchProb[4];
  dcSumFive = dcStitchProb[0] + dcStitchProb[1] + dcStitchProb[2] + dcStitchProb[3] + dcStitchProb[4] + dcStitchProb[5];
  dcSumSix = dcStitchProb[0] + dcStitchProb[1] + dcStitchProb[2] + dcStitchProb[3] + 
      dcStitchProb[4] + dcStitchProb[5] + dcStitchProb[6];
  dcSumSeven = dcStitchProb[0] + dcStitchProb[1] + dcStitchProb[2] + dcStitchProb[3] + 
      dcStitchProb[4] + dcStitchProb[5] + dcStitchProb[6] + dcStitchProb[7];

  // sums of the probabilities for double dc
  ddcSumZero = doubleDCStitchProb[0];
  ddcSumOne = doubleDCStitchProb[0] + doubleDCStitchProb[1];
  ddcSumTwo = doubleDCStitchProb[0] + doubleDCStitchProb[1] + doubleDCStitchProb[2];
  ddcSumThree = doubleDCStitchProb[0] + doubleDCStitchProb[1] + doubleDCStitchProb[2] + doubleDCStitchProb[3];
  ddcSumFour = doubleDCStitchProb[0] + doubleDCStitchProb[1] + doubleDCStitchProb[2] + doubleDCStitchProb[3] + 
      doubleDCStitchProb[4];
  ddcSumFive = doubleDCStitchProb[0] + doubleDCStitchProb[1] + doubleDCStitchProb[2] + doubleDCStitchProb[3] + 
      doubleDCStitchProb[4] + doubleDCStitchProb[5];
  ddcSumSix = doubleDCStitchProb[0] + doubleDCStitchProb[1] + doubleDCStitchProb[2] + doubleDCStitchProb[3] + 
      doubleDCStitchProb[4] + doubleDCStitchProb[5] + doubleDCStitchProb[6];
  ddcSumSeven = doubleDCStitchProb[0] + doubleDCStitchProb[1] + doubleDCStitchProb[2] + doubleDCStitchProb[3] + 
      doubleDCStitchProb[4] + doubleDCStitchProb[5] + doubleDCStitchProb[6] + doubleDCStitchProb[7];

  // sums of the probabilities for dc corner
  dcCornSumZero = dcCornerStitchProb[0];
  dcCornSumOne = dcCornerStitchProb[0] + dcCornerStitchProb[1];
  dcCornSumTwo = dcCornerStitchProb[0] + dcCornerStitchProb[1] + dcCornerStitchProb[2];
  dcCornSumThree = dcCornerStitchProb[0] + dcCornerStitchProb[1] + dcCornerStitchProb[2] + dcCornerStitchProb[3];
  dcCornSumFour = dcCornerStitchProb[0] + dcCornerStitchProb[1] + dcCornerStitchProb[2] + dcCornerStitchProb[3] + 
      dcCornerStitchProb[4];
  dcCornSumFive = dcCornerStitchProb[0] + dcCornerStitchProb[1] + dcCornerStitchProb[2] + dcCornerStitchProb[3] + 
      dcCornerStitchProb[4] + dcCornerStitchProb[5];
  dcCornSumSix = dcCornerStitchProb[0] + dcCornerStitchProb[1] + dcCornerStitchProb[2] + dcCornerStitchProb[3] + 
      dcCornerStitchProb[4] + dcCornerStitchProb[5] + dcCornerStitchProb[6];
  dcCornSumSeven = dcCornerStitchProb[0] + dcCornerStitchProb[1] + dcCornerStitchProb[2] + dcCornerStitchProb[3] + 
      dcCornerStitchProb[4] + dcCornerStitchProb[5] + dcCornerStitchProb[6] + dcCornerStitchProb[7];

  // sums of the probabilities for dc chain corner
  dcChCornSumZero = dcChainCornerStitchProb[0];
  dcChCornSumOne = dcChainCornerStitchProb[0] + dcChainCornerStitchProb[1];
  dcChCornSumTwo = dcChainCornerStitchProb[0] + dcChainCornerStitchProb[1] + dcChainCornerStitchProb[2];
  dcChCornSumThree = dcChainCornerStitchProb[0] + dcChainCornerStitchProb[1] + dcChainCornerStitchProb[2] + dcChainCornerStitchProb[3];
  dcChCornSumFour = dcChainCornerStitchProb[0] + dcChainCornerStitchProb[1] + dcChainCornerStitchProb[2] + dcChainCornerStitchProb[3] + 
      dcChainCornerStitchProb[4];
  dcChCornSumFive = dcChainCornerStitchProb[0] + dcChainCornerStitchProb[1] + dcChainCornerStitchProb[2] + dcChainCornerStitchProb[3] + 
      dcChainCornerStitchProb[4] + dcChainCornerStitchProb[5];
  dcChCornSumSix = dcChainCornerStitchProb[0] + dcChainCornerStitchProb[1] + dcChainCornerStitchProb[2] + dcChainCornerStitchProb[3] + 
      dcChainCornerStitchProb[4] + dcChainCornerStitchProb[5] + dcChainCornerStitchProb[6];
  dcChCornSumSeven = dcChainCornerStitchProb[0] + dcChainCornerStitchProb[1] + dcChainCornerStitchProb[2] + dcChainCornerStitchProb[3] + 
      dcChainCornerStitchProb[4] + dcChainCornerStitchProb[5] + dcChainCornerStitchProb[6] + dcChainCornerStitchProb[7];

  // sums of the probabilities for shell
  shellSumZero = shellStitchProb[0];
  shellSumOne = shellStitchProb[0] + shellStitchProb[1];
  shellSumTwo = shellStitchProb[0] + shellStitchProb[1] + shellStitchProb[2];
  shellSumThree = shellStitchProb[0] + shellStitchProb[1] + shellStitchProb[2] + shellStitchProb[3];
  shellSumFour = shellStitchProb[0] + shellStitchProb[1] + shellStitchProb[2] + shellStitchProb[3] + 
      shellStitchProb[4];
  shellSumFive = shellStitchProb[0] + shellStitchProb[1] + shellStitchProb[2] + shellStitchProb[3] + 
      shellStitchProb[4] + shellStitchProb[5];
  shellSumSix = shellStitchProb[0] + shellStitchProb[1] + shellStitchProb[2] + shellStitchProb[3] + 
      shellStitchProb[4] + shellStitchProb[5] + shellStitchProb[6];
  shellSumSeven = shellStitchProb[0] + shellStitchProb[1] + shellStitchProb[2] + shellStitchProb[3] + 
      shellStitchProb[4] + shellStitchProb[5] + shellStitchProb[6] + shellStitchProb[7];

  // sums of the probabilities for picot
  picotSumZero = picotStitchProb[0];
  picotSumOne = picotStitchProb[0] + picotStitchProb[1];
  picotSumTwo = picotStitchProb[0] + picotStitchProb[1] + picotStitchProb[2];
  picotSumThree = picotStitchProb[0] + picotStitchProb[1] + picotStitchProb[2] + picotStitchProb[3];
  picotSumFour = picotStitchProb[0] + picotStitchProb[1] + picotStitchProb[2] + picotStitchProb[3] + 
      picotStitchProb[4];
  picotSumFive = picotStitchProb[0] + picotStitchProb[1] + picotStitchProb[2] + picotStitchProb[3] + 
      picotStitchProb[4] + picotStitchProb[5];
  picotSumSix = picotStitchProb[0] + picotStitchProb[1] + picotStitchProb[2] + picotStitchProb[3] + 
      picotStitchProb[4] + picotStitchProb[5] + picotStitchProb[6];
  picotSumSeven = picotStitchProb[0] + picotStitchProb[1] + picotStitchProb[2] + picotStitchProb[3] + 
      picotStitchProb[4] + picotStitchProb[5] + picotStitchProb[6] + picotStitchProb[7];

  // sums of the probabilities for puff
  puffSumZero = puffStitchProb[0];
  puffSumOne = puffStitchProb[0] + puffStitchProb[1];
  puffSumTwo = puffStitchProb[0] + puffStitchProb[1] + puffStitchProb[2];
  puffSumThree = puffStitchProb[0] + puffStitchProb[1] + puffStitchProb[2] + puffStitchProb[3];
  puffSumFour = puffStitchProb[0] + puffStitchProb[1] + puffStitchProb[2] + puffStitchProb[3] + 
      puffStitchProb[4];
  puffSumFive = puffStitchProb[0] + puffStitchProb[1] + puffStitchProb[2] + puffStitchProb[3] + 
      puffStitchProb[4] + puffStitchProb[5];
  puffSumSix = puffStitchProb[0] + puffStitchProb[1] + puffStitchProb[2] + puffStitchProb[3] + 
      puffStitchProb[4] + puffStitchProb[5] + puffStitchProb[6];
  puffSumSeven = puffStitchProb[0] + puffStitchProb[1] + puffStitchProb[2] + puffStitchProb[3] + 
      puffStitchProb[4] + puffStitchProb[5] + puffStitchProb[6] + puffStitchProb[7];

   
  imageMode(CENTER);
  noLoop();
}

function draw() {
  background(255);
  incCounter = 1; // setting up all the variables
  var initStitchNum = sliderStitch.value;
  var rows = sliderRow.value; // number of rows
  var pattern = " ";
  var patternArray = [];

  var randomCheck = document.getElementById("randomizeMode").checked;
  var roundCheck = document.getElementById("roundsMode").checked;



  //var rows = 8;

   // text(n, 50, 50);
   // var debug = document.getElementById("debugger");
   // debug.innerHTML = sliderRow.value;

    
  // making the crochet chart
  noFill();
  noStroke();
  push();
  if (roundCheck) { // check if rounds or rows and translate pattern accordingly
    translate(width/2, height/2);
  }
  else {
    translate(100, 500);
  }

  // UNLIKELY AND ROUNDS
    
    if (!randomCheck && roundCheck) {
      for (var j = 1; j <= rows; j++) {
        if (j == 1) {
          
          index = patternProbStart();
          incNum = j*initStitchNum;

          var chainRound = new CrochetRound(stitches[index], stitches[1]);
          chainRound.repeatAround(incNum, j*r);
          lastStitch = index;
          }
        else {
          index = patternProbFollowing();
          incNum = j*initStitchNum;

          var chainRound = new CrochetRound(stitches[index], stitches[1]);
          chainRound.repeatAround(incNum, j*r);
          lastStitch = index;
          }
        }

      // if (i == 1) {
      //   pattern = "Repeat around " + initStitchNum + " double crochet stitches";
      // }
      // else if (i == 2){
      //    pattern = "Repeat around " + initStitchNum + " two double crochet stitches";
      // }
      // else {
      //    pattern = "Repeat around " + incSpace + " double crochet stitches and 1 two double crochet stitch";
      // }

      // patternArray.push(pattern);
      // pLen = patternArray.length;
      // listText = "<ol>";
      // for (var j = 0; j < pLen; j++) {
      //   listText += "<li>" + patternArray[j] + "</li>";
      // }
      // listText += "</ol>";
      // document.getElementById("patternDiv").innerHTML = listText;
    }

  for (i = 1; i <= rows; i++) {
    var stitchInd = round(random(0,stitches.length-1));
    var stitchIndTwo = round(random(0,stitches.length-1));
    //var basicStitchInd = round(random(0,basicStitches.length-1));
    //var specialStitchInd = round(random(0,specialStitches.length-1));

    var incNum = i*initStitchNum;


    

    //document.getElementById("patternDiv");
    //pattern = "Round " + i + ": " + incNum + " " + stitchNames[stitchInd] + " stitches\n"; PATTERN STYLE

    
    //RANDOM AND ROUNDS
    if (randomCheck && roundCheck) {
      
      var chainRound = new CrochetRound(stitches[stitchInd], stitches[stitchIndTwo]);
      chainRound.repeatAround(incNum, i*r);

      pattern = incNum + " " + stitchNames[stitchInd] + " stitches\n";
      patternArray.push(pattern);
      pLen = patternArray.length;
      listText = "<ol>";
      for (var j = 0; j < pLen; j++) {
        listText += "<li>" + patternArray[j] + "</li>";
      }
      listText += "</ol>";
      document.getElementById("patternDiv").innerHTML = listText;
    }

    //UNLIKELY AND ROWS
    else if (!randomCheck && !roundCheck) {
      var doubleIncrease = new CrochetRound(basicStitches[2], basicStitches[3]);
      doubleIncrease.rowRepeat(initStitchNum, i*r);
      var incSpace = i - 2;

      pattern = initStitchNum + " " + basicStitchesNames[2] + " stitches\n";

      patternArray.push(pattern);
      pLen = patternArray.length;
      listText = "<ol>";
      for (var j = 0; j < pLen; j++) {
        listText += "<li>" + patternArray[j] + "</li>";
      }
      listText += "</ol>";
      document.getElementById("patternDiv").innerHTML = listText;
    }

    //RANDOM AND ROWS
    else if (randomCheck && !roundCheck) {
      
      var chainRound = new CrochetRound(stitches[stitchInd], stitches[stitchIndTwo]);
      chainRound.rowRepeat(initStitchNum, i*r);

      pattern = initStitchNum + " " + stitchNames[stitchInd] + " stitches\n";
      patternArray.push(pattern);
      pLen = patternArray.length;
      listText = "<ol>";
      for (var j = 0; j < pLen; j++) {
        listText += "<li>" + patternArray[j] + "</li>";
      }
      listText += "</ol>";
      document.getElementById("patternDiv").innerHTML = listText;
    }
    
    incCounter++;

  }
  pop();

       //patternRound = new CrochetRound(stitches[stitchInd], stitches[stitchIndTwo]); // works to make a random pattern on each round
       //patternRound.patternStitch(incNum, i*r);

       // PATTERN WORDS
       //pattern = "Round " + i + ": " + equivInitStitchNum + " " + stitchNames[stitchInd] + " stitches";
}




function generate() {
  replaceCheck = true;
  redraw();
}

function savePattern() {
  save("crochet pattern" + saveNum + ".png");
  saveNum++;
}

/////////////////////////////////////////// THE CROCHET CLASS /////////////////////////////////////////
function CrochetRound(basicStitch, specialStitch) {
  
  this.basic = basicStitch;
  this.special = specialStitch;
 
  
  // need the shape you're repeating and the number of times you repeat it, and the radius of the round
  this.repeatAround = function(num, radius) {
    for (var j = 0; j < num; j++) {
      push();
      var ang = j*TWO_PI/num;
      rotate(ang);
      scale(stitchScale);
      image(this.basic,0,-radius);
      pop();
    }
  }

  // For rows. input the number of stitches and the row distance
  this.rowRepeat = function(num, dist) {
    for (var j = 0; j < num; j++) {
      push();
      var x = 70*j;
      //translate(-300, 150);
      //translate(-250-10*num/2, 150+10*num/2);
      //translate(x*num/2, -10*num/2);
      translate(x, 0);
      scale(0.2);
      image(this.basic, 0, -dist);
      pop();
    }
  }
  
  // the pattern stitch works!! This is for two stitch patterns. Need to use those class variables correctly. 
  this.patternStitch = function(num, radius) { // prep for having a sequence of stitches on a round
    for (var j = 0; j < num; j++) {
      var ang = j*(TWO_PI/num);
      if (j%2 == 1) {
        push();
        rotate(ang);
        scale(stitchScale);
        image(this.basic, 0, -radius);
        pop();
      }
      else {
        push();
        rotate(ang);
        scale(stitchScale);
        image(this.special, 0, -radius);
        pop();
      }
    }
  }
  
  this.increaseRound = function(num, radius, init) { // (number of stitches in each round, radius of round)
    if (incCounter == 1) {
      for (var j = 0; j < num; j++) {
        var ang = j*(TWO_PI/num);
        push();
        rotate(ang);
        scale(stitchScale);
        image(this.basic, 0, -radius);
        pop();
      }
    }
    
    else if (incCounter == 2) {
      for (var j = 0; j < num/2; j++) {
        var ang = j*(TWO_PI/(num/2));
        push();
        rotate(ang);
        scale(stitchScale);
        image(this.special, 0, -radius);
        pop();
      }
    }
    else {
      for (var j = 0; j < num-init; j++) {
        var ang = j*(TWO_PI/(num-init));
        if (j%(incCounter-1) != 0) {
          push();
          rotate(ang);
          scale(stitchScale);
          image(this.basic, 0, -radius);
          pop();
        }
        else {
          push();
          rotate(ang);
          scale(stitchScale);
          image(this.special, 0, -radius);
          pop();
        }
      }
    }
  }
}

function patternProbStart() { //for starting stitch
  var randomNumStart = random(1);
  if (randomNumStart < 0.5) {
    var randomNumIndex = 0;
    return randomNumIndex;
  }
  else if (randomNumStart >= 0.5 && randomNumStart < 0.7) {
    var randomNumIndex = 1;
  }
  else if (randomNumStart >= 0.7 && randomNumStart < 0.8) {
    var randomNumIndex = 2;
  }
  else if (randomNumStart >= 0.8 && randomNumStart < 0.85) {
    var randomNumIndex = 3;
  }
  else if (randomNumStart >= 0.85 && randomNumStart < 0.9) {
    var randomNumIndex = 4;
  }
  else if (randomNumStart >= 0.9 && randomNumStart < 0.95) {
    var randomNumIndex = 5;
  }
  // // else if 6
  // // else if 7
  else {
    var randomNumIndex = 8;
  }
  return randomNumIndex;  
}

function patternProbFollowing() { //for subsequent stitches
  var randomNumFollowing = random(1);
  if (lastStitch == 0) { // if a chain was the previous stitch
    if (randomNumFollowing < chSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= chSumZero && randomNumFollowing < chSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= chSumOne && randomNumFollowing < chSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= chSumTwo && randomNumFollowing < chSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= chSumThree && randomNumFollowing < chSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= chSumFour && randomNumFollowing < chSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= chSumFive && randomNumFollowing < chSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= chSumSix && randomNumFollowing < chSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 1) { // if a sc was the previous stitch
    if (randomNumFollowing < scSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= scSumZero && randomNumFollowing < scSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= scSumOne && randomNumFollowing < scSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= scSumTwo && randomNumFollowing < scSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= scSumThree && randomNumFollowing < scSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= scSumFour && randomNumFollowing < scSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= scSumFive && randomNumFollowing < scSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= scSumSix && randomNumFollowing < scSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 2) { // if a dc was the previous stitch
    if (randomNumFollowing < dcSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= dcSumZero && randomNumFollowing < dcSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= dcSumOne && randomNumFollowing < dcSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= dcSumTwo && randomNumFollowing < dcSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= dcSumThree && randomNumFollowing < dcSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= dcSumFour && randomNumFollowing < dcSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= dcSumFive && randomNumFollowing < dcSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= dcSumSix && randomNumFollowing < dcSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 3) { // if a double dc was the previous stitch
    if (randomNumFollowing < ddcSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= ddcSumZero && randomNumFollowing < ddcSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= ddcSumOne && randomNumFollowing < ddcSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= ddcSumTwo && randomNumFollowing < ddcSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= ddcSumThree && randomNumFollowing < ddcSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= ddcSumFour && randomNumFollowing < ddcSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= ddcSumFive && randomNumFollowing < ddcSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= ddcSumSix && randomNumFollowing < ddcSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 4) { // if a dc corner was the previous stitch
    if (randomNumFollowing < dcCornSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= dcCornSumZero && randomNumFollowing < dcCornSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= dcCornSumOne && randomNumFollowing < dcCornSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= dcCornSumTwo && randomNumFollowing < dcCornSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= dcCornSumThree && randomNumFollowing < dcCornSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= dcCornSumFour && randomNumFollowing < dcCornSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= dcCornSumFive && randomNumFollowing < dcCornSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= dcCornSumSix && randomNumFollowing < dcCornSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 5) { // if a dc chain corner was the previous stitch
    if (randomNumFollowing < dcChCornSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= dcChCornSumZero && randomNumFollowing < dcChCornSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= dcChCornSumOne && randomNumFollowing < dcChCornSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= dcChCornSumTwo && randomNumFollowing < dcChCornSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= dcChCornSumThree && randomNumFollowing < dcChCornSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= dcChCornSumFour && randomNumFollowing < dcChCornSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= dcChCornSumFive && randomNumFollowing < dcChCornSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= dcChCornSumSix && randomNumFollowing < dcChCornSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 6) { // if a shell was the previous stitch
    if (randomNumFollowing < shellSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= shellSumZero && randomNumFollowing < shellSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= shellSumOne && randomNumFollowing < shellSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= shellSumTwo && randomNumFollowing < shellSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= shellSumThree && randomNumFollowing < shellSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= shellSumFour && randomNumFollowing < shellSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= shellSumFive && randomNumFollowing < shellSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= shellSumSix && randomNumFollowing < shellSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 7) { // if a picot was the previous stitch
    if (randomNumFollowing < picotSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= picotSumZero && randomNumFollowing < picotSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= picotSumOne && randomNumFollowing < picotSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= picotSumTwo && randomNumFollowing < picotSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= picotSumThree && randomNumFollowing < picotSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= picotSumFour && randomNumFollowing < picotSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= picotSumFive && randomNumFollowing < picotSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= picotSumSix && randomNumFollowing < picotSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  else if (lastStitch == 8) { // if a puff was the previous stitch
    if (randomNumFollowing < puffSumZero) {var randomNumIndex = 0;}
    else if (randomNumFollowing >= puffSumZero && randomNumFollowing < puffSumOne) {var randomNumIndex = 1;}
    else if (randomNumFollowing >= puffSumOne && randomNumFollowing < puffSumTwo) {var randomNumIndex = 2;}
    else if (randomNumFollowing >= puffSumTwo && randomNumFollowing < puffSumThree) {var randomNumIndex = 3;}
    else if (randomNumFollowing >= puffSumThree && randomNumFollowing < puffSumFour) {var randomNumIndex = 4;}
    else if (randomNumFollowing >= puffSumFour && randomNumFollowing < puffSumFive) {var randomNumIndex = 5;}
    else if (randomNumFollowing >= puffSumFive && randomNumFollowing < puffSumSix) {var randomNumIndex = 6;}
    else if (randomNumFollowing >= puffSumSix && randomNumFollowing < puffSumSeven) {var randomNumIndex = 7;}
    else {var randomNumIndex = 8;}
  }
  return randomNumIndex;  
}
