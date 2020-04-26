let myBlogButton = document.getElementsByClassName("ButtonTest")[0];
if (myBlogButton != null) {
    myBlogButton.style.cursor = "pointer";
    myBlogButton.addEventListener("click", function () { location.href = "blogs/"; });
}

let myBlogPageButtons = document.getElementsByClassName("blogPageButton")
if (myBlogPageButtons != null) {
    for (let i = 0; i < myBlogPageButtons.length; i++) {
        myBlogPageButtons[i].style.cursor = "pointer";
    }
}

let myAboutPageButtons = document.getElementsByClassName("AboutMePageButton")
if (myAboutPageButtons != null) {
    for (let i = 0; i < myAboutPageButtons.length; i++) {
        myAboutPageButtons[i].style.cursor = "pointer";
    }
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


//  DIFFFERNET PICS DEPENDING ON WINDOW SIZE      
//<picture>
//    <source srcset="Images/Logo_Instagram.png" media="(max-width: 600px)">
//    <source srcset="Images/Logo_Twitter.png" media="(max-width: 1500px)">
//    <source srcset="Images/Logo_Email.png">
//    <img src="Images/Logo_FacebookF.png" alt="Flowers">
//</picture>