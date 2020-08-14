const btn = document.getElementById("button");

const x_btn = document.getElementById("form__x-button");
x_btn.addEventListener("click", hideForm);

const form = document.getElementById("form");

const form_button = document.getElementById("button--form")
form_button.addEventListener("click", onSubmit)

const name_input = document.getElementById("name")
const surname_input = document.getElementById("surname")
const email_input = document.getElementById("email");
email_input.addEventListener("focusout", validateEmail);

const x = window.matchMedia("(min-width: 768px)");
matchWidth(x);
x.addListener(matchWidth);

const recaptcha_key='6LeWR7sZAAAAAE1f7xS_gfuHpR2GuPwsLnhrqB8C'
const recaptcha_url='http://192.168.0.100:5000/add_email'

function formSubmit(url, response, redirect, body){

  fetch(url+"?response="+response+"&redirect="+redirect, {
  method: 'POST',
  body: body
  })
  .then(response => response.json())
  .then(data => {
  console.log('Success:', data);
  })
  .catch((error) => {
  console.error('Error:' + error);
});
}

function onSubmit(e) {
  e.preventDefault();
  grecaptcha.ready(
    function() {
    grecaptcha.execute(recaptcha_key, {action: 'submit'}).then(
      function(token){
      var formData = new FormData();
      redirect = window.location.protocol + "//" + window.location.hostname + "/confirm_email.html";
      formData.append("email", email_input.value);
      formData.append("name", name_input.value);
      formData.append("surname", surname_input.value);
      formSubmit(recaptcha_url, token, redirect, formData);
      })
    })
  }


function formAction(){
  if(window.matchMedia("(min-width: 768px)").matches){
    document.getElementById("button").innerHTML = "pieseczek";
  }
  else
  {
  document.body.classList.add("body--noscroll");
  form.classList.remove("form--hidden", "slideDown");
  form.classList.add("form--shown", "slideDownReturn");
  }
}

function hideForm(){
  document.body.classList.remove("body--noscroll");
  form.classList.remove("form--shown", "slideDownReturn");
  form.classList.add("slideDown");
  setTimeout(() => {
    form.classList.add("form--hidden");
  }, 1000);
}

function validateEmail(){
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
    form.appendChild(btn);
    form.classList.remove("slideDown");
  }
  else {
    var candidat = document.getElementById("candidat");
    candidat.appendChild(btn); 
    btn.addEventListener("click", formAction);
  }
}