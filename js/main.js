

const btn = document.getElementById("candidat__actionbutton");
const x_btn = document.getElementById("form__x-button");
x_btn.addEventListener("click", hideForm);
const x = window.matchMedia("(min-width: 768px)");
matchWidth(x);
x.addListener(matchWidth);

function formAction(){
  if(window.matchMedia("(min-width: 768px)").matches){
    document.getElementById("candidat__actionbutton").innerHTML = "pieseczek";
  }
  else
  {
  const form = document.getElementById("form");
  document.body.classList.add("body--noscroll");
  form.classList.remove("form--hidden", "slideDown");
  form.classList.add("form--shown", "slideDownReturn");
  }
}

function hideForm(){
  const form = document.getElementById("form");
  document.body.classList.remove("body--noscroll");
  form.classList.remove("form--shown", "slideDownReturn");
  form.classList.add("slideDown");
  setTimeout(() => {
    form.classList.add("form--hidden");
  }, 1000);
}


function matchWidth(x){
  const btn = document.getElementById("candidat__actionbutton");

  if(x.matches) {
    var form = document.getElementById("form");
    form.appendChild(btn);
    form.classList.remove("slideDown");
  }
  else {
    var candidat = document.getElementById("candidat");
    candidat.appendChild(btn); 
    btn.addEventListener("click", formAction);
  }
}