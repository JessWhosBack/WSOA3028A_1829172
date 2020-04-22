let myBlogButton = document.getElementsByClassName("ButtonTest")[0];
if (myBlogButton != null) {
    myBlogButton.addEventListener("click", function () { location.href = "blogs/"; });
}


let lastScrollTop = 0;
let myHeader = document.querySelector("header");
if (myHeader != null) {
    window.addEventListener("scroll", function () {

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            myHeader.style.top = "-75px";
        } else {
            myHeader.style.top = "0";
        }
        lastScrollTop = scrollTop;
    })
}


var frmvalidator = new Validator("contactform");
frmvalidator.addValidation("name", "req", "Please provide your name");
frmvalidator.addValidation("email", "req", "Please provide your email");
frmvalidator.addValidation("email", "email", "Please enter a valid email address");

//let formValidator = new Validator("contactMe_Form");
//if (formValidator != null) {
//    formValidator.addValidation("visitorName", "req", "Please provide your name");
//    formValidator.addValidation("visitorEmail", "req", "Please provide your email address");
//    formValidator.addValidation("visitorEmail", "visitorEmail", "Please enter a vlaid email address")
//}

