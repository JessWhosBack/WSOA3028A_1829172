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

let myHeader = document.querySelector("header");
if (myHeader != null) {
    if (window.location !== window.parent.location) {
        myHeader.setAttribute("style", "display:none;");
        let myFooter = document.querySelector("footer");
        if (myFooter != null) {
            myFooter.setAttribute("style", "display:none;");
        }
    }
    else {
        let lastScrollTop = 0;
        window.addEventListener("scroll", function () {

            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                myHeader.style.top = "-60px";
            } else {
                myHeader.style.top = "0";
            }
            lastScrollTop = scrollTop;
        })
    }

}

let logo = document.getElementsByClassName("logo")[0];
if (logo != null) {
    logo.style.cursor = "default";

}

let footer = document.querySelector("footer");
function smallWidth(winWidth) {
    if (winWidth.matches) {
        if (footer != null) {
            let footerTextArray = footer.querySelector("nav").querySelectorAll("a");
            for (let i = 0; i < footerTextArray.length; i++) {
                let stringText = footer.querySelector("nav").querySelectorAll("a")[i].innerHTML;
                switch (stringText) {
                    case "Home Page":
                        footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "Home";
                        break;
                    case "About Me":
                        footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "About";
                        break;
                    case "Contact Me":
                        footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "Contact";
                        break;
                    case "My Blogs":
                        footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "Blogs";
                        break;
                    case "Learn With Me":
                        footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "Learn";
                        break;
                }
            }
        }
    } else {
        let footerTextArray = footer.querySelector("nav").querySelectorAll("a");
        for (let i = 0; i < footerTextArray.length; i++) {
            let stringText = footer.querySelector("nav").querySelectorAll("a")[i].innerHTML;
            switch (stringText) {
                case "Home":
                    footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "Home Page";
                    break;
                case "About":
                    footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "About Me";
                    break;
                case "Contact":
                    footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "Contact Me";
                    break;
                case "Blogs":
                    footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "My Blogs";
                    break;
                case "Learn":
                    footer.querySelector("nav").querySelectorAll("a")[i].innerHTML = "Learn With Me";
                    break;
            }
        }
    }
}
let winWidth = window.matchMedia("(max-width: 500px)");
smallWidth(winWidth);
winWidth.addListener(smallWidth);

let menuToggleButton = document.getElementsByClassName("menu-toggle")[0];
let header_Nav = document.getElementsByClassName("header_nav")[0];
if (menuToggleButton != null) {
    menuToggleButton.style.cursor = "pointer";
    menuToggleButton.addEventListener("click", function () {
        if (header_Nav != null) {
            header_Nav.classList.toggle("active");
        }
    });
}

let dropDown_Week = document.getElementsByClassName("week");
let dropDown_Item = document.getElementsByClassName("blogItem");
let dropDown_Arrow = document.getElementsByClassName("arrowPNG");

let b = true;
for (let i = 0; i < dropDown_Week.length; i++) {
    if (dropDown_Week[i] != null) {
        dropDown_Week[i].style.cursor = "pointer";
        dropDown_Week[i].addEventListener("click", function () {
            if (dropDown_Item[i] != null) {
                dropDown_Item[i].classList.toggle("active");
                if (b) {
                    dropDown_Arrow[i].setAttribute("style", "transform:rotate(180deg");
                    b = false;
                }
                else {
                    dropDown_Arrow[i].setAttribute("style", "transform:rotate(0deg)");
                    b = true;
                }
            }
        });
    }
}