var sliderStitch = document.getElementById("myRangeStitch");
var outputStitch = document.getElementById("demoStitch");

var sliderRow = document.getElementById("myRangeRow");
var outputRow = document.getElementById("demoRow");

outputStitch.innerHTML = sliderStitch.value;
outputRow.innerHTML = sliderRow.value;

// document.getElementById("rowsMode").disabled = true;


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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