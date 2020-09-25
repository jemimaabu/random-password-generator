function minmax(value, min, max)
{
    if (value.indexOf('.') > -1)
    {
       if (value === ".") return; //We're only interested in whole numbers, so we'll disallow this.  A dot can't be in the first position.
       return  value.split('.')[0];
    }
    if (value.length < 2) return value; //We can't yet be sure the number is less than min.

    const parsedInput = parseInt(value);

    if (parsedInput >= min && parsedInput <= max)
        return value;
    else if(parsedInput < min)
        return min;

    else if(parsedInput > max)
        return max;
    return value;
}

var passwordLength = document.getElementById("password-length");
var repeatCharacters = document.getElementById("repeat-characters");
var specialCharacters = document.getElementById("special-characters");
var ambiguousCharacters = document.getElementById("ambiguous-characters");
var includeNumbers = document.getElementById("include-numbers");
var includeLetters = document.getElementById("include-letters");
var randomPassword = document.getElementById("random-password");
var errorMessage = document.getElementById("error-message");

var defaultCharacters = ["@", "!", "#", "$", "?", ".", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 0,1,2,3,4,5,6,7,8,9]
var characters = [];
var passwordArray = [];

const MIN = 4;
const MAX = 256;

function generatePassword() {
    randomPassword.innerHTML = "";
    passwordArray=[];
    characters = defaultCharacters;
    const pwLength = parseInt(passwordLength.value);

    if (!specialCharacters.checked) {
        characters = characters.join("").replace(/[@!#$?.]/g,'').split('')
    }
    if (!includeNumbers.checked) {
        characters = characters.join("").replace(/[0-9]/g,'').split('')
    }
    if (!includeLetters.checked) {
        characters = characters.join("").replace(/[a-zA-Z]/g,'').split('')
    }
    if (!ambiguousCharacters.checked) {
        characters = characters.join("").replace(/[1Ilo0]/g,'').split('')
    }

    if (pwLength < MIN || pwLength > MAX) {//Final validation in case something is wrong.
        errorMessage.innerHTML = "You must pick a password between " + MIN + " and " + MAX;
        return;
    }


    if (!specialCharacters.checked && !includeNumbers.checked && !includeLetters.checked) {
        errorMessage.innerHTML = "Alas, blank passwords aren't a thing yet."
        return;
    }
    if (!repeatCharacters.checked) {
        if (passwordLength.value > characters.length) {
            errorMessage.innerHTML = "There are only so many characters, we're going to have to repeat something"
            return;
        } else {
          errorMessage.innerHTML = ""
            while (passwordArray.length < passwordLength.value) {
                var randomIndex = Math.floor(Math.random()*characters.length);
                var newChar = characters[randomIndex];
                newChar = isNaN(newChar) ? newChar.toLowerCase() : newChar;
                if (passwordArray.indexOf(newChar) === -1) {
                    passwordArray.push(characters[randomIndex]);
                }
            }
        }
    } else {
      errorMessage.innerHTML = ""
        for (var i = 0; i < passwordLength.value; i++) {
            var randomIndex = Math.floor(Math.random()*characters.length);
            passwordArray.push(characters[randomIndex])
        }
    }
    randomPassword.innerHTML = passwordArray.join("");
}

//function copies the created password to clipboard
function copyToClip() {
	var value = document.getElementById("random-password").innerHTML;
	var input_temp = document.createElement("input");
	input_temp.value = value;
	document.body.appendChild(input_temp);
	input_temp.select();
	document.execCommand("copy");
	document.body.removeChild(input_temp);

	alert("Password copied!");
}

function getMin() {return MIN;}
function getMax () {return MAX;}

// TOOGLE HOW TO USE
let openInstructions = document.getElementById('instructions__header');
let arrow = document.querySelector('.fas');

openInstructions.addEventListener('click', () => { 
    openInstructions.parentNode.classList.contains('active') ? 
    (openInstructions.parentNode.classList.remove('active'), arrow.classList.remove('fa-angle-up'), arrow.classList.add('fa-angle-down') ) :  
    (openInstructions.parentNode.classList.add('active'), arrow.classList.remove('fa-angle-down'), arrow.classList.add('fa-angle-up'))
});

var passwordTest = document.getElementById("password-test");
passwordTest.addEventListener("change", indicator);

function passwordScore() {
    var value = passwordTest.value.trim();
    var score = 0;
    if (value.length < 8 ) {
        score = 0;
    } else {
        if (value.length > 8) {
            score++
        }
        if (/\d/.test(value)) {
            score++
        }
        if (/[!@#$%^&*()_+\-=\[\]{};':"\|\,.<>\?]/.test(value)) {
            score++
        }
        if (/[A-Z]/.test(value)) {
            score++
        }
        if (value.length > 24) {
            score++
        }
    }
    return score;
}

var passwordIndicator = document.getElementById("password-indicator");
var passwordStrength = document.getElementById("password-strength");

function indicator() {
    if (passwordTest.value.trim().length < 1) {
        passwordIndicator.className="";
        passwordStrength.innerHTML = "";
    } else {
        var score = passwordScore();
        switch (score) {
            case 0:
                passwordIndicator.className="weak";
                passwordStrength.innerHTML = "Weak";
                break;
            case 1:
                passwordIndicator.className="average";
                passwordStrength.innerHTML = "Average";
                break;
            case 2:
                passwordIndicator.className="good";
                passwordStrength.innerHTML = "Good";
                break;
            case 3:
                passwordIndicator.className="strong";
                passwordStrength.innerHTML = "Strong";
                break;
            case 4:
                passwordIndicator.className="strong";
                passwordStrength.innerHTML = "Strong";
                break;
            default:
                passwordIndicator.className="";
                passwordStrength.innerHTML = "";
                break;
        }
    }
}

passwordTest.onkeyup = function() {
    indicator();
}

var passwordToggle = document.getElementById("password-toggle");

function togglePassword() {
    if (passwordTest.value.trim().length < 1 ) {
        return
    } else {
        if (passwordTest.type === "text") {
            passwordToggle.innerHTML="show";
            passwordTest.type = "password";
        } else if (passwordTest.type === "password") {
            passwordToggle.innerHTML="hide";
            passwordTest.type = "text";
        }
    }
}

passwordToggle.onclick = function() {
    togglePassword();
}

//function strengthenPassword() {
//    var value = passwordTest.value.trim();
//}
