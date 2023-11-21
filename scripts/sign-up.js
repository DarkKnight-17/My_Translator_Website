/* The following code is used in Sign-up page for dealing with the user data
and identifying the validity
*/

// function validate_register_form(two_fields){
//     let email_field = two_fields["user_email"].value;
//     let password_field = two_fields["user_password"].value;
//     var message = "";
    
//     let test1 = /[a-z]/;
//     let test2 = /[0-9]/;
//     let test3 = /[A-Z]/;
//     if(email_field == "" || password_field== ""){
//       message  =  "Both fields must be filled!"; 
  
//     }

//   else if(!test1.test(password_field)){
//       message = "Your password should contain at least 1 lowercase letter";
      
      
      
//   }
//   else if (!test2.test(password_field)){
      
//       message = "Your password should contain at least 1 digit";
//   }
//   else if (!test3.test(password_field)){
//       message = "Your password should contain at least 1 uppercase letter";
      
//   }
//   else if(password_field.length < 8){
//     message = "Your password should be at least 8 characters long";
//   }
//       if (message == ""){
//           alert("Well done! Your account has just been created!");
//          two_fields["user_email"].value  = '';
//          two_fields["user_password"].value = ''; 
//          return false;
//       }
//       else {
    //           alert(message);
    //           return false;
    //       }
    // }
    
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
    document.getElementById("prevBtn").style.display = "inline";
}
if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
} else {
    document.getElementById("nextBtn").innerHTML = "Next";
}
//... and run a function that will display the correct step indicator:
fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        alert("Congratulations! You successfully registered!");
        document.querySelector(".sign-up-link").innerHTML = `<a class="nav-link" href="./sign-up-page.html">${x[3].getElementsByTagName("input")[0].value}</a>`
        showTab(0);
        x[0].getElementsByTagName("input")[0].value = "";
        x[0].getElementsByTagName("input")[1].value = "";

        return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  let test1 = /[a-z]/;
     let test2 = /[0-9]/;
     let test3 = /[A-Z]/;
  
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      y[i].placeholder = "The field is empty!"
      // and set the current valid status to false
      valid = false;
    }
    else if(y[i].type === "email" && !y[i].value.includes('@')){
       alert("'@' symbol must be included in the email field")
       y[i].className += " invalid";
       // and set the current valid status to false
       valid = false;
    }else if(y[i].type === "password" && (!test1.test(y[i].value) || !test2.test(y[i].value) || !test3.test(y[i].value))) {
        alert("Your password should contain at least one uppercase, one lowercase letter and one digit")
        y[i].className += " invalid";
        // and set the current valid status to false
        valid = false;
    }
}
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

