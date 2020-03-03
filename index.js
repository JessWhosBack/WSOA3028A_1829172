let button = document.createElement("button");
button.innerHTML = "MY BLOGS";

let x = document.getElementsByClassName("ButtonTest")[0];
x.appendChild(button);

button.addEventListener("click", function () { location.href = "blogs/My-Blogs.html"; });

