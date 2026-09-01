/* =====================================================
   REVANTH SRINIVAS PORTFOLIO
===================================================== */


const body =
    document.body;

const header =
    document.getElementById("header");

const nav =
    document.getElementById("nav");

const menuToggle =
    document.getElementById("menuToggle");

const themeToggle =
    document.getElementById("themeToggle");

const backToTop =
    document.getElementById("backToTop");


/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

    const spans =
        menuToggle.querySelectorAll("span");

    if (nav.classList.contains("open")) {

        spans[0].style.transform =
            "rotate(45deg) translate(4px,5px)";

        spans[1].style.opacity = "0";

        spans[2].style.transform =
            "rotate(-45deg) translate(4px,-5px)";

    } else {

        spans.forEach(span => {

            span.style.transform = "";
            span.style.opacity = "";

        });

    }

});


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuToggle
                .querySelectorAll("span")
                .forEach(span => {

                    span.style.transform = "";
                    span.style.opacity = "";

                });

        });

    });


/* =====================================================
   DARK MODE
===================================================== */

const savedTheme =
    localStorage.getItem("revanth-theme");


if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const dark =
        body.classList.contains("dark");

    localStorage.setItem(
        "revanth-theme",
        dark ? "dark" : "light"
    );

    themeToggle.innerHTML = dark

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

});


/* =====================================================
   HEADER
===================================================== */

function handleScroll() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleScroll
);


/* =====================================================
   BACK TO TOP
===================================================== */

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateNavigation() {

    let current = "home";


    sections.forEach(section => {

        const top =
            section.offsetTop - 180;

        const bottom =
            top + section.offsetHeight;


        if (
            window.scrollY >= top &&
            window.scrollY < bottom
        ) {

            current =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =====================================================
   CONTACT FORM
   Sends directly to:
   revanthsrinivask@gmail.com
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

const submitButton =
    document.getElementById("submitButton");


contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const formData =
        new FormData(contactForm);


    submitButton.disabled = true;

    submitButton.innerHTML =
        `
        Sending...
        <i class="fa-solid fa-spinner fa-spin"></i>
        `;


    try {

        const response =
            await fetch(
                "https://formsubmit.co/ajax/revanthsrinivask@gmail.com",
                {
                    method: "POST",

                    headers: {
                        "Accept":
                            "application/json"
                    },

                    body: formData
                }
            );


        const result =
            await response.json();


        if (response.ok && result.success) {

            formMessage.textContent =
                "Message sent successfully! Thank you for contacting me.";

            formMessage.style.display =
                "block";


            contactForm.reset();


        } else {

            throw new Error(
                "Message could not be sent."
            );

        }


    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "Something went wrong. Please try again or email me directly.";

        formMessage.style.display =
            "block";

    }


    submitButton.disabled = false;

    submitButton.innerHTML =
        `
        Send Message
        <i class="fa-solid fa-arrow-right"></i>
        `;

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    !document.querySelector(
                        targetId
                    )
                ) {

                    return;

                }


                event.preventDefault();


                const target =
                    document.querySelector(
                        targetId
                    );


                window.scrollTo({

                    top:
                        target.offsetTop -
                        header.offsetHeight,

                    behavior: "smooth"

                });

            }
        );

    });


/* =====================================================
   INITIALIZE
===================================================== */

handleScroll();
updateNavigation();