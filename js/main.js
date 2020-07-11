const btn = document.getElementById("button");
const x_btn = document.getElementById("form__x-button");
const email_input = document.getElementById("email");
x_btn.addEventListener("click", hideForm);
email_input.addEventListener("focusout", validateEmail);
const x = window.matchMedia("(min-width: 768px)");
matchWidth(x);
x.addListener(matchWidth);

function formAction(){
  if(window.matchMedia("(min-width: 768px)").matches){
    document.getElementById("button").innerHTML = "pieseczek";
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

function validateEmail(){
  const email_input = document.getElementById("email");
  const email_label = document.getElementById("email_label");
  var mail_ver = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!mail_ver.test(email_input.value.toLowerCase())){
    email_label.classList.add("email--error");
    }
    else{
      email_label.classList.remove("email--error");
      console.log("pieseczek i: " + email_input.value.toLowerCase());
    }
}

function matchWidth(x){
  const btn = document.getElementById("button");

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