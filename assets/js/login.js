
function guestLogin() {
    let email = "guestuser@gmail.com";
    let index = 0;
    const loginForm = document.forms[0];
    let emailinput = document.getElementById('email')
    let passwordinput = document.getElementById('password')
    emailinput.focus();

    const myInterval = setInterval(myTimer, 50);

    function myTimer() {
        if (index < email.length) {
            emailinput.value += email[index]
            index++;
        }
        else {
            clearInterval(myInterval)
            passwordinput.focus();
            passwordinput.value = "12345";
            loginForm.submit()
        }
    }
}






