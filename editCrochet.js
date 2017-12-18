var sliderStitch = document.getElementById("myRangeStitch");
var outputStitch = document.getElementById("demoStitch");

var sliderRow = document.getElementById("myRangeRow");
var outputRow = document.getElementById("demoRow");

outputStitch.innerHTML = sliderStitch.value;
outputRow.innerHTML = sliderRow.value;

sliderStitch.oninput = function() {
  outputStitch.innerHTML = this.value;
}
sliderRow.oninput = function() {
  outputRow.innerHTML = this.value;
}