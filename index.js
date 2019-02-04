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

var defaultCharacters = ["@", "%", "+", "'", "!", "#", "$", "^", "?", ":", ".", "~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 0,1,2,3,4,5,6,7,8,9]
var characters = [];
var passwordArray = [];

const MIN =4;
const MAX = 99;

function generatePassword() {
    randomPassword.innerHTML = "";
    passwordArray=[];
    characters = defaultCharacters;
    passwordLength.value = minmax(passwordLength.value, MIN, MAX); //Final validation in case something is wrong.
    if (!specialCharacters.checked) {
        characters = characters.join("").replace(/[@%+'!#$^?:.~]/g,'').split('')
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
    if (!specialCharacters.checked && !includeNumbers.checked && !includeLetters.checked) {
        errorMessage.innerHTML = "Alas, blank passwords aren't a thing yet."
    }
    if (!repeatCharacters.checked) {
        if (passwordLength.value > characters.length) {
            errorMessage.innerHTML = "There are only so many characters, we're going to have to repeat something"
        } else {
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
        for (var i = 0; i < passwordLength.value; i++) {
            var randomIndex = Math.floor(Math.random()*characters.length); 
            passwordArray.push(characters[randomIndex])
        }
    }
    randomPassword.innerHTML = passwordArray.join("");
}

function getMin() {return MIN;}
function getMax () {return MAX;}
