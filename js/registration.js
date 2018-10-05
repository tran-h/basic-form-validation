function validateForm() {
    clearErrors();
    var result = validatePassword();
    result = validateUsername() && result;
    result = validateStreetName() && result;
    result = validatePhoneNumber() && result;
    result = validatePostalCode() && result;
    result = validateCity() && result;
    limitErrors();

    if (result) {
        alert("Registration success!");
    }

    return result;
}

function clearErrors() {
    document.querySelector("#errorMessages").innerHTML = "";
}

function validatePassword() {

    var error = false;
    var upperCaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digitString = "1234567890";
    var charString = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var errorText = document.querySelector("#errorMessages");
    var pass = document.signup.password.value.trim();
    var confirmPass = document.signup.confirmPass.value.trim();

    if (pass.length != 8) {
        errorText.innerHTML += "<p>Password must be 8 characters long.</p>"
        error = true;
    }

    if (pass != confirmPass) {
        errorText.innerHTML += "<p>Passwords do not match.</p>"
        error = true;
    }

    if (charString.indexOf(pass.substr(0, 1)) < 0) {
        errorText.innerHTML += "<p>Password must start with a character.</p>"
        error = true;
    }

    var hasUpperCase = false; //flag to check if there is at least 1 upper case 
    for (var i = 0; i < pass.length; i++) {
        if (upperCaseString.indexOf(pass.substr(i, 1)) >= 0) {
            hasUpperCase = true;
            break;
        }
    }

    //check hasUpperCase flag and correctly set error state 
    if (!hasUpperCase) {
        errorText.innerHTML += "<p>Password must contain at least 1 upper case.</p>"
        error = true;
    }

    var hasDigit = false; //flag to check if there is at least 1 digit
    for (var i = 0; i < pass.length; i++) {
        if (digitString.indexOf(pass.substr(i, 1)) >= 0) {
            hasDigit = true;
            break;
        }
    }

    //check hasDigit flag and correctly set error state 
    if (!hasDigit) {
        errorText.innerHTML += "<p>Password must contain at least 1 digit.</p>"
        error = true;
    }

    if (error) {
        return false;
    }
    else {
        return true;
    }

}

function validateUsername() {

    var letterString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var error = false;
    var errorText = document.querySelector("#errorMessages");
    var username = document.signup.username.value.trim();

    if (username.length < 6) {
        errorText.innerHTML += "<p>Username must contain at least 6 characters.</p>"
        error = true;
    }


    if (letterString.indexOf(username.substr(0, 1)) < 0) {
        errorText.innerHTML += "<p>Username must start with a character.</p>"
        error = true;
    }

    if (error) {
        return false;
    }
    else {
        return true;
    }
}

function validateStreetName() {

    var digitString = "1234567890";
    var error = false;
    var errorText = document.querySelector("#errorMessages");
    var streetName = document.signup.streetName.value.trim();

    var hasDigit = false; //flag to check if there is a digit
    for (var i = 0; i < streetName.length; i++) {
        if (digitString.indexOf(streetName.substr(i, 1)) >= 0) {
            hasDigit = true;
            break;
        }
    }

    if (hasDigit) {
        errorText.innerHTML += "<p>Street name cannot contain digits.</p>"
        error = true;
    }

    if (error) {
        return false;
    }
    else {
        return true;
    }
}

function validatePhoneNumber() {

    var error = false;
    var errorText = document.querySelector("#errorMessages");
    var phoneNumber = document.signup.phone.value.trim();

    if (phoneNumber.charAt(3) !== '-' || phoneNumber.charAt(7) !== '-' || phoneNumber.length !== 12) {
        errorText.innerHTML += "<p>Phone number is in the wrong format.</p>"
        error = true;
    }

    var allDigits = true;
    var phoneNumbersArray = phoneNumber.split('-');
    for (var i = 0; i < 3; i++) {
        if (parseInt(phoneNumbersArray[i]) != phoneNumbersArray[i]) {
            allDigits = false;
            break;
        }
    }

    if (!allDigits) {
        errorText.innerHTML += "<p>Phone number should contain digits only.</p>";
        error = true;
    }

    if (error) {
        return false;
    }
    else {
        return true;
    }
}

function validatePostalCode() {

    var letterString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digitString = "1234567890";
    var error = false;
    var errorText = document.querySelector("#errorMessages");
    var postalCode = document.signup.postalCode.value.trim();

    if (letterString.indexOf(postalCode.charAt(0)) < 0 || letterString.indexOf(postalCode.charAt(2)) < 0
        || letterString.indexOf(postalCode.charAt(4)) < 0 || digitString.indexOf(postalCode.charAt(1)) < 0
        || digitString.indexOf(postalCode.charAt(3)) < 0 || digitString.indexOf(postalCode.charAt(5)) < 0) {
        errorText.innerHTML += "<p>Postal code must be in the format: Letter Digit Letter Digit Letter Digit.</p>"
        error = true;
    }

    if (error) {
        return false;
    }
    else {
        return true;
    }
}

function validateCity() {

    var letterString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var error = false;
    var errorText = document.querySelector("#errorMessages");
    var city = document.signup.city.value.trim();

    for (var i = 0; i < city.length; i++) {
        if (letterString.indexOf(city.substr(i, 1)) < 0) {
            errorText.innerHTML += "<p>City must contain letters only.</p>"
            error = true;
        }
    }

    if (error) {
        return false;
    }
    else {
        return true;
    }
}

// limits number of errors shown at once to 8
function limitErrors() {

    var errorText = document.querySelector("#errorMessages");
    var errorMsgs = errorText.querySelectorAll("p");

    if (errorMsgs.length > 8) {
        clearErrors();
        for (var i = 0; i < 8; i++) {
            console.log(errorMsgs[i]);
            errorText.innerHTML += errorMsgs[i].outerHTML;
        }
    }
}