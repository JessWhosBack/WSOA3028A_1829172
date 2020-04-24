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