function minmax(value, min, max) 
{
    if(parseInt(value) < min || isNaN(parseInt(value))) 
        return 4; 
    else if(parseInt(value) > max) 
        return 99; 
    else return value;
}

var passwordLength = document.getElementById("password-length");
var repeatCharacters = document.getElementById("repeat-characters");
var specialCharacters = document.getElementById("special-characters");
var includeNumbers = document.getElementById("include-numbers");
var includeLetters = document.getElementById("include-letters");
var randomPassword = document.getElementById("random-password");
var errorMessage = document.getElementById("error-message");

var defaultCharacters = ["&", "/", "\\", "#", ",", "+", "(", ")", "$", "~", "%", ".", "'", ":", "*", "?", "<", ">", "/", "{", "}", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 0,1,2,3,4,5,6,7,8,9]
var characters = [];
var passwordArray = [];


function generatePassword() {
    randomPassword.innerHTML = "";
    passwordArray=[];
    characters = defaultCharacters;
    if (!specialCharacters.checked) {
        characters = characters.join("").replace(/[&\/\\#,+()$~%.':*?<>{}]/g,'').split('')
    } 
    if (!includeNumbers.checked) {
        characters = characters.join("").replace(/[0-9]/g,'').split('')
    } 
    if (!includeLetters.checked) {
        characters = characters.join("").replace(/[a-zA-Z]/g,'').split('')
    }
    console.log(!specialCharacters.checked && !includeNumbers.checked && !includeLetters.checked);
    if (!specialCharacters.checked && !includeNumbers.checked && !includeLetters.checked) {
        errorMessage.innerHTML = "Alas, blank passwords aren't a thing yet."
    }
    if (!repeatCharacters.checked) {
        if (passwordLength.value > characters.length) {
            errorMessage.innerHTML = "There are only so many characters, we're going to have to repeat something"
        } else {
            while (passwordArray.length < passwordLength.value) {
                var randomIndex = Math.floor(Math.random()*characters.length);
                if(passwordArray.indexOf(characters[randomIndex]) === -1) {
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
