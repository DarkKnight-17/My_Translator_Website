
// This is the function for processing the definition form 

function validate_definition_form() {
  let word = document.forms["definition_form"]["word"].value;
  if (word == ""){
        alert("Please, enter a word or phrase");
        return false;
      }else {
        alert("Unfortunately, the word wasn't found");
        return false;
      }
}



$(".history").mouseenter( function() { 
  $(".message-history").fadeTo(1200,1.0 );
});

$(".history").mouseleave( function(){
  $(".message-history").fadeTo(1000, 0);

}); 

$(".favourites").mouseenter(function() { 
  $(".message-favourites").fadeTo(1200, 1.0);
});

$(".favourites").mouseleave(  function(){
  $(".message-favourites").fadeTo(1000, 0);

}); 
  






// Below is the code for interacting with the user while the text is being translated 

let translate_btn = document.getElementById("translate_btn");
let first_text = document.getElementById("first_text");
let second_text = document.getElementById("second_text");
let clear_btn = document.querySelector(".clear-button");


clear_btn.onclick = function(){
  first_text.value = "";
}

function check_content() {
  if($("#first_text").val() !== ""){
    $(".clear-button").show();
  }
  else {
    $(".clear-button").hide();
    
  }
}

let counter_container = document.createElement("span");
document.querySelector(".translator-section").appendChild(counter_container);
counter_container.textContent = "0 / 2000";
counter_container.classList.add("counter_container");

let symbols;

first_text.addEventListener("keyup", () => {
 check_content();
  symbols = first_text.value.length;  
 counter_container.textContent = symbols + " / 2000";
});

$("#first_text").keydown(function() {
  symbols = first_text.value.length;  
 counter_container.textContent = symbols + " / 2000";
})

 


first_text.addEventListener('focusin', () => {
  
  check_content();
  document.querySelector("#wait_message").textContent = "";
  
  
  first_text.style.boxShadow = "none";
 
  
});
first_text.addEventListener('focusout', () => {
  check_content();
  document.querySelector("#wait_message").textContent = "";
  
});
  
 
  



translate_btn.addEventListener('click', () => {
  
  if(first_text.value == ""){
    first_text.style.boxShadow = "0 0 10px 10px orange";
    first_text.placeholder = "Empty text can't be translated";
    second_text.placeholder = "...";
  }
  
  else {
    document.querySelector("#wait_message").textContent = "Please, wait a few seconds...";
    second_text.placeholder = "You will see the translation...";
    
  }
  
});

// The following code handles the scroll_to_Top button



let toTop_Btn = document.getElementById("toTop_Btn");

window.onscroll = function(){
  if(document.body.scrollTop > 45 || document.documentElement.scrollTop > 45){
  toTop_Btn.style.display = "block";
}
else {
  toTop_Btn.style.display = "none";
  
  }

}

function scrollToTop(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
  





/* The following code is used in Sign-up page for dealing with the user data
and identifying the validity
*/

function validate_register_form(two_fields){
      let email_field = two_fields["user_email"].value;
      let password_field = two_fields["user_password"].value;
      var message = "";
      
      let test1 = /[a-z]/;
      let test2 = /[0-9]/;
      let test3 = /[A-Z]/;
      if(email_field == "" || password_field== ""){
        message  =  "Both fields must be filled!"; 
    
      }

    else if(!test1.test(password_field)){
        message = "Your password should contain at least 1 lowercase letter";
        
        
        
    }
    else if (!test2.test(password_field)){
        
        message = "Your password should contain at least 1 digit";
    }
    else if (!test3.test(password_field)){
        message = "Your password should contain at least 1 uppercase letter";
        
    }
    else if(password_field.length < 8){
      message = "Your password should be at least 8 characters long";
    }
        if (message == ""){
            alert("Well done! Your account has just been created!");
           document.querySelector(".sign-up-link").innerHTML = `<a class="nav-link" href="./sign-up-page.html">${email_field}</a>`
           two_fields["user_email"].value  = '';
           two_fields["user_password"].value = ''; 
           return false;
        }
        else {
            alert(message);
            return false;
        }
}


/* This is last past which allows a user to set the timer 
   
Firstly, we declare global variables that will be later manipulated
*/

let interval = null;
let remainingSeconds = 0;

let  Minutes = document.getElementById("Minutes");
let  Seconds= document.getElementById("Seconds");
let control= document.querySelector(".timer__btn--control");
let  reset= document.querySelector(".timer__btn--reset");

  
      
      
   
// the function attached to the "play or pause" button 
      function startOrStop()  {
        if (remainingSeconds == 0){
          alert("Tap to the orange button on the right to set the timer first");
          return;
        }
        if (interval === null) {
          start();
        } else {
          stop();
        }
      }
// the function attached to the button created for getting the user input

   function requestUser() {
        const inputMinutes = prompt("Enter number of minutes:");

          remainingSeconds = Number(inputMinutes) * 60;
          updateInterfaceTime();
          
      }
    
  
  
    
  
    function updateInterfaceTime() {
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      
      Minutes.textContent = minutes.toString().padStart(2, "0");
      Seconds.textContent = seconds.toString().padStart(2, "0");
       
    }
  
  function   updateInterfaceControls() {
      if (interval === null) {
    control.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
    control.classList.add("timer__btn--start");
    control.classList.remove("timer__btn--stop");
      } else {
    control.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    control.classList.add("timer__btn--stop");
    control.classList.remove("timer__btn--start");
      }
    }
  
    // the function due to which we can view how the time counts down
    function start() {
      if (remainingSeconds === 0) return;
  
    interval = setInterval(() => {
    remainingSeconds--;
    updateInterfaceTime();
  
        if (remainingSeconds === 0) {
        stop();
        }
      }, 1000);
  
    updateInterfaceControls();
    }
  
    // the function which stops the timer 

  function   stop() {
      clearInterval(interval);
  
    interval = null;
  
    updateInterfaceControls();
    }
  
   
  
  
  

