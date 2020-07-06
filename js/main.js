
function matchWidth(x){
  var btn = document.getElementById("candidat__actionbutton");

  if(x.matches) {
    var form = document.getElementById("form");
    form.appendChild(btn);
    console.log("aaaa")
  }
  else {
    var candidat = document.getElementById("candidat");
    candidat.appendChild(btn); 
    console.log("o chuj ci chodzi");
  }
}


var x = window.matchMedia("(min-width: 768px)");
matchWidth(x);
x.addListener(matchWidth);
