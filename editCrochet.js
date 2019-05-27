var sliderStitch = document.getElementById("myRangeStitch");
var outputStitch = document.getElementById("demoStitch");

var sliderRow = document.getElementById("myRangeRow");
var outputRow = document.getElementById("demoRow");

outputStitch.innerHTML = sliderStitch.value;
outputRow.innerHTML = sliderRow.value;


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    // modal.style.display = "block";
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}


sliderStitch.oninput = function() {
  outputStitch.innerHTML = this.value;
}
sliderRow.oninput = function() {
  outputRow.innerHTML = this.value;
}

html2canvas(document.querySelector("#saveButton")).then(canvas => {
    document.body.appendChild(canvas)
});
