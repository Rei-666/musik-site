import { error_codes } from './error_codes.js'

const btn = document.getElementById("button");

const x_btn = document.getElementById("form__x-button");
x_btn.addEventListener("click", hideForm);

const form = document.getElementById("form");
const form_body = document.getElementById("form__body")
const form_message = document.getElementById("form__message");
const form_button = document.getElementById("button--form");
const form_error_message = "<p style='color: #f23359'>Błąd</p>";
form_button.addEventListener("click", onSubmit);
form_body.addEventListener("change", checkForm)

const name_input = document.getElementById("name");
const surname_input = document.getElementById("surname");
const email_input = document.getElementById("email");

const x = window.matchMedia("(min-width: 768px)");
matchWidth(x);
x.addListener(matchWidth);

checkForm()

const recaptcha_key='6LeWR7sZAAAAAE1f7xS_gfuHpR2GuPwsLnhrqB8C'
const recaptcha_url='https://rei666.pythonanywhere.com/add_email'

function checkInput(e){
  var input = e.srcElement;
  let value = input.value;
  
  try{
    if(value.length <= 0){
      input.parentNode.classList.add("error");
    }
    else{
      input.parentNode.classList.remove("error");
    }
  }
  catch{}
}


function checkForm(){
  var inputs = document.querySelectorAll('[required]');
  for(var key in inputs) {
    try{
      inputs[key].addEventListener("focusout", checkInput)
      inputs[key].addEventListener("change", checkInput)
    }
    catch(e){
    }
      
  }
  email_input.addEventListener("focusout", validateEmail);
  email_input.addEventListener("input", validateEmail);
  email_input.addEventListener("change", validateEmail);
}

function formSubmit(url, response_captcha, redirect, body){

  fetch(url+"?response="+response_captcha+"&redirect="+redirect, {method: 'POST', body: body})
  .then(response => response.json())
  .then(data => {
  if(data.success == true){
    form_message.innerHTML = "Wysłaliśmy Ci email na podany przez Ciebie adres!";
    stopLoadingButton();
  }
  else if (data.success == false){
    form_message.innerHTML = getErrorMessage(data.error_code);
    stopLoadingButton();
  }
  })
  .catch((error) => {
    form_message.innerHTML = form_error_message;
    stopLoadingButton()
  });
  
}

function onSubmit(e) {
  validateEmail()
  e.preventDefault();
  form_button.setAttribute("content", form_button.innerHTML);
  form_button.innerHTML = "";
  form_button.classList.add("loading");
  grecaptcha.ready(
    function() {
    grecaptcha.execute(recaptcha_key, {action: 'submit'}).then(
      function(token){
      let formData = new FormData();
      let redirect = window.location.protocol + "//" + window.location.hostname + "/musik-site/confirmed_email.html";
      formData.append("email", email_input.value);
      formData.append("name", name_input.value);
      formData.append("surname", surname_input.value);
      formSubmit(recaptcha_url, token, redirect, formData);
      })
    })
  }

function stopLoadingButton(){
  form_button.classList.remove("loading");
  form_button.innerHTML = form_button.getAttribute("content");
}

function formAction(){
  if(window.matchMedia("(min-width: 768px)").matches){
    ;
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
      email_label.classList.add("error");
      form_button.disabled = true;
      return true;
    }
    else{
      email_label.classList.remove("error");
      form_button.disabled = false;
      return false;
    }
}

function matchWidth(x){
  if(x.matches) {
    form.appendChild(btn);
    form.classList.remove("slideDown");
  }
  else {
    let candidat = document.getElementById("candidat");
    candidat.appendChild(btn); 
    btn.addEventListener("click", formAction);
  }
}

function getErrorMessage(error_code){
  return("<p style='color: #f23359; text-align: center;'>"+ error_codes[error_code] +"</p>")
}

