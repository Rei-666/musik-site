

function matchWidth(x){
  var btn = document.getElementById("candidat__actionbutton");

  if(x.matches) {
    var form = document.getElementById("form");
    form.appendChild(btn);
  }
  else {
    var candidat = document.getElementById("candidat");
    candidat.appendChild(btn); 
    btn.addEventListener("click", showForm);
  }
}

var btn = document.getElementById("candidat__actionbutton");

var x = window.matchMedia("(min-width: 768px)");
matchWidth(x);
x.addListener(matchWidth);

function showForm(){
  var form = document.getElementById("form");
  form.classList.remove("hidden");
  form.classList.add("shown");
}
function hideForm(){
  var form = document.getElementById("form");
  form.classList.remove("shown");
  form.classList.add("hidden");
}