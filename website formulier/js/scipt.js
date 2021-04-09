//Array errors declareren
let errors = [];

//Meldingen verbergen
window.onload = function () {
    document.getElementById("errorBlok").style.display = 'none';
    document.getElementById("betalingswijzeBlok").style.display = 'none';
    document.getElementById("successBlok").style.display = 'none';
}

function validateForm() {
    //Array errors leegmaken (Hiervoor heb ik de laatste optie in deze post gebruikt: https://www.tutorialspoint.com/in-javascript-how-to-empty-an-array)
    errors.splice(0, errors.length)

    //Velden declareren
    let voornaam = document.getElementById("voornaam");
    let achternaam = document.getElementById("achternaam");
    let gebruikersnaam = document.getElementById("gebruikersnaam");
    let email = document.getElementById("email");
    let wachtwoord = document.getElementById("wachtwoord");
    let herhaalWachtwoord = document.getElementById("herhaalWachtwoord");
    let adres = document.getElementById("adres");
    let land = document.getElementById("land");
    let provincie = document.getElementById("provincie");
    let postcode = document.getElementById("postcode");
    let betalingsOptie = document.getElementsByName('betalingsOptie');

    //Vereiste velden controleren
    checkEmptyField(voornaam, 'Het veld voornaam is vereist.');
    checkEmptyField(achternaam, 'Het veld achternaam is vereist.');
    checkEmptyField(gebruikersnaam, 'Het veld gebruikersnaam is vereist.');
    checkEmptyField(adres, 'Het veld adres is vereist.');
    checkEmptyField(land, 'Het veld land is vereist.');
    checkEmptyField(provincie, 'Het veld provincie is vereist.');

    //Email valideren
    if (email.value == "") {
        errors.push("E-mailadres is niet ingevuld.")
    }
    else if (validateEmail(email) == false) {
        errors.push("E-mailadres is niet correct.")
    }

    //Wachtwoord valideren
    checkEmptyField(wachtwoord, 'Het veld wachtwoord is vereist.');
    checkEmptyField(herhaalWachtwoord, 'Het veld wachtwoord herhalen is vereist.');
    if (wachtwoord.value != "" && herhaalWachtwoord.value != "") {
        if (wachtwoord.value != herhaalWachtwoord.value) {
            errors.push('Wachtwoorden moeten gelijk zijn aan elkaar')
        }
        if (wachtwoord.value.length <= 7) {
            errors.push('Het veld wachtwoord moet langer dan 7 karakters zijn.')
        }
    }

    //Betaling valideren
    validatePayment(betalingsOptie);

    //Postcode valideren
    checkPC(postcode);

    //Algemene voorwaarden controleren
    if (!document.getElementById('voorwaarden').checked) {
        errors.push('Het is vereist om de algemene voorwaarden te accepteren.');
    }

    //Errors/Success blok tonen
    if (errors.length > 0) {
        document.getElementById("errorBlok").style.display = 'block';
        document.getElementById("betalingswijzeBlok").style.display = 'none';
        document.getElementById("successBlok").style.display = 'none';
        document.getElementById("errorMelding").innerHTML = errors.join('<br>').toString();
    } else {
        document.getElementById("betalingswijzeBlok").style.display = 'block';
        document.getElementById("successBlok").style.display = 'block';
        document.getElementById("errorBlok").style.display = 'none';
    }

}

function checkEmptyField(veld, melding) {
    if (veld.value == "") {
        errors.push(melding);
    }
}
/* Deze functie heb ik uit deze thread gehaald https//:stackoverflow.com/questions/29716543/form-validation-using-javascript. Dit is hoe de originele functie eruit zag:
        function CheckForBlank() {
            if(document.getElementById('name').value=="") {
                alert("enter something valid");
                return false;
            }
        } */


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.match(re)) {
        return true;
    } else {
        return false;
    }
}
/* Deze functie heb ik hier teruggevonden: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
Niet veel aanpassingen waren nodig. */

function validatePayment(veld) {
    for (i = 0; i < veld.length; i++) {
        if (veld[i].checked)
            document.getElementById("betalingswijzeMelding").innerHTML = "Je betalingswijze is " + veld[i].value;
    }
}
/* Hiervoor heb ik de volgende code uit deze post gebruikt https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/#:~:text=To%20get%20the%20value%20of,is%20selected%20and%20False%20otherwise.
for(i = 0; i < ele.length; i++) {
    if(ele[i].checked)
    document.getElementById("result").innerHTML
            = "Gender: "+ele[i].value;
} */

function checkPC(veld) {
    if (veld.value.length == 0) {
        errors.push("Het veld postcode is vereist.");
    } else if (veld.value < 1000 || veld.value > 9999) {
        errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.");
    }
}