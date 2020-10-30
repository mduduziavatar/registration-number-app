document.addEventListener("DOMContentLoaded", function() {
    let errorsElem = document.querySelector(".errors")
    let successElem = document.querySelector(".success")

    if (errorsElem.innerHTML !== "") {
        setTimeout(function() {
            errorsElem.innerHTML = "";
        }, 3000);
    };
    if (successElem.innerHTML !== "") {
        setTimeout(function() {
            successElem.innerHTML = "";
        }, 1000);
    };
});