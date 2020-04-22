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

