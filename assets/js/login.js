
function guestLogin() {
    const loginForm = document.forms[0];
    let emailinput = document.getElementById('email')
    let passwordinput = document.getElementById('password')
    emailinput.focus();
    passwordinput.focus();
    emailinput.value = "guestuser@gmail.com";
    passwordinput.value = "12345";
    loginForm.submit()
}
