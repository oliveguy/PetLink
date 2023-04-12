var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var igotit_btn = document.getElementById("close_btn");
var instruction = document.getElementById("instruction");
var bg = document.getElementById("form_bg");
igotit_btn.addEventListener("click", function(){
  instruction.style.display="none";
  bg.classList.remove('bg_blur');
})