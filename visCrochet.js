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

//var chainRound, patternRound;
var decoration, pattern;
//var singleIncrease; // doubleIncrease;

var randomize = false; //booleans that detect if the button is pressed
var normal = true;
var checked = false;
var helper = false;
//var generate = false;

//var initStitchNum = 6;
//var equivInitStitchNum;
//var saveNum = 1;
var incCounter; // keeps track of the number of increase rounds
// var incNum;
// var stitchInd; //variable for the random stitch index
// var stitchIndTwo;
// var basicStitchInd;
// var specialStitchInd;
// var incChange;

var r = 210;
var i;

var replaceCheck = false;


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
  createCanvas(3*windowWidth/4, windowHeight);  
  
  
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

  stitchNames = ["chain", "single crochet", "double crochet", "two double crochet", "dc chain shell",
"three chain dc shell", "shell", "picot", "puff"];
  basicStitchesNames = ["chain", "single crochet", "double crochet", "two double crochet", "puff"];
  specialStitchesNames = ["dc chain shell", "three chain dc shell", "shell", "picot"];

  
  equivNum = [1, 1, 1, 2, 2, 2, 5, 1, 1];
  basicEquivNum = [1, 1, 1, 2, 1];
  specialEquivNum = [2, 2, 5, 1];
   
  imageMode(CENTER);
  noLoop();
}

function draw() {
  background(255);
  incCounter = 1;
  var initStitchNum = sliderStitch.value;
  var rows = sliderRow.value; // number of rows
  var pattern = " ";
  var patternArray = [];

  //var rows = 8;

   // text(n, 50, 50);
   // var debug = document.getElementById("debugger");
   // debug.innerHTML = sliderRow.value;

    
  // making the crochet chart
  noFill();
  noStroke();
  push();
  translate(width/2, height/2);
  // image(chain, 0, 0);
  // image(sc, 0, 100);
  // image(dc, 0, 200);
  // image(puff, 0, 300);

  for (i = 1; i <= rows; i++) {
    var stitchInd = round(random(0,stitches.length-1));
    var stitchIndTwo = round(random(0,stitches.length-1));
    //var basicStitchInd = round(random(0,basicStitches.length-1));
    //var specialStitchInd = round(random(0,specialStitches.length-1));
    var incNum = i*initStitchNum;
    //var stitchNum = incNum*equivNum[stitchInd];

    // if (i == 1) {
    //   var equivInitStitchNum = initStitchNum;
    //   var incChange = equivNum[stitchInd]*equivInitStitchNum;
    //   }
    // else {
    //   var equivInitStitchNum = incChange;
    //   var incChange = incChange*equivNum[stitchInd];
    //   }
    // NORMAL
    var radioCheck = document.getElementById("randomizeMode").checked;
    if (!radioCheck) {
      var doubleIncrease = new CrochetRound(basicStitches[2], basicStitches[3]);
      doubleIncrease.increaseRound(incNum, i*r, initStitchNum);
    }

    //document.getElementById("patternDiv");
    //pattern = "Round " + i + ": " + incNum + " " + stitchNames[stitchInd] + " stitches\n"; PATTERN STYLE

    
    //RANDOM
    // else if (radioCheck) {

    //   var chainRound = new CrochetRound(stitches[stitchInd], stitches[stitchIndTwo]);
    //   chainRound.repeatAround(incNum, i*r);

    //     var patternRow = document.createElement("p");
    //     pattern = i + ". " + incNum + " " + stitchNames[stitchInd] + " stitches\n";
    //     var rowNum = document.createTextNode(pattern);
    //   //var rowNum = document.createTextNode("here");

    //   //var item = document.getElementById("patternDisplay").childNodes[i-1];
    //   //item.replaceChild(rowNum, item.childNodes[i-1]);

    //     patternRow.appendChild(rowNum);

    //     var parent = document.getElementById("patternDiv");
    //     parent.appendChild(patternRow);

    // }

    else if (radioCheck) {
      
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
    
    incCounter++;

  }
  pop();

  //     //patternRound = new CrochetRound(stitches[stitchInd], stitches[stitchIndTwo]); // works to make a random pattern on each round
  //     //patternRound.patternStitch(incNum, i*r);

  //     // PATTERN WORDS
  //     //pattern = "Round " + i + ": " + equivInitStitchNum + " " + stitchNames[stitchInd] + " stitches";
}


function generate() {
  replaceCheck = true;
  redraw();
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
      scale(0.15);
      image(this.basic,0,-radius);
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
        scale(0.15);
        image(this.basic, 0, -radius);
        pop();
      }
      else {
        push();
        rotate(ang);
        scale(0.15);
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
        scale(0.15);
        image(this.basic, 0, -radius);
        pop();
      }
    }
    
    else if (incCounter == 2) {
      for (var j = 0; j < num/2; j++) {
        var ang = j*(TWO_PI/(num/2));
        push();
        rotate(ang);
        scale(0.15);
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
          scale(0.15);
          image(this.basic, 0, -radius);
          pop();
        }
        else {
          push();
          rotate(ang);
          scale(0.15);
          image(this.special, 0, -radius);
          pop();
        }
      }
    }
  }
}