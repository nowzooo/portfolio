document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav__link");
    const OFFSET = 100;

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - OFFSET,
                    behavior: "smooth"
                });
            }

            const navMenu = document.querySelector(".nav_sub");
            if (navMenu) navMenu.classList.remove("show");
        });
    });

    const navBtn = document.querySelector(".nav_btn");
    const navMenu = document.querySelector(".nav_sub");

    if (navBtn && navMenu) {
        navBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    const header = document.querySelector("header");

    if (header) {
        let didScroll = false;
        let lastScrollTop = 0;
        const delta = 3;
        const navbarHeight = header.offsetHeight;

        window.addEventListener("scroll", () => {
            didScroll = true;
        });

        function checkScroll() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }

            requestAnimationFrame(checkScroll);
        }

        requestAnimationFrame(checkScroll);

        function hasScrolled() {
            const st = window.scrollY || window.pageYOffset;

            if (Math.abs(lastScrollTop - st) <= delta) return;

            if (st > lastScrollTop && st > navbarHeight) {
                header.classList.add("header--hidden");
                if (navMenu) navMenu.classList.remove("show");
            } else {
                if (st + window.innerHeight < document.documentElement.scrollHeight) {
                    header.classList.remove("header--hidden");
                }
            }

            lastScrollTop = st;
        }
    }

    const topButton = document.querySelector(".top-button");

    if (topButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                topButton.style.display = "block";
            } else {
                topButton.style.display = "none";
            }
        });

        topButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const targets = document.querySelectorAll(".test_obj");

    if (targets.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold: 0.2 });

        targets.forEach(target => observer.observe(target));
    }

    updateClock();
    setInterval(updateClock, 1000 * 60);

    initSubWheelProxy();
});


function updateClock() {
    const clocks = document.querySelectorAll("#clock");
    if (clocks.length === 0) return;

    const now = new Date();

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = days[now.getDay()];

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = String(hours).padStart(2, "0");

    clocks.forEach(clock => {
        clock.textContent = `${day} ${ampm} ${hours}:${minutes}`;
    });
}


function initSubWheelProxy() {
    const leftContent = document.querySelector(".left-content");
    const rightContent = document.querySelector(".right-content");

    if (!leftContent || !rightContent) return;

    leftContent.addEventListener("wheel", function (event) {
        if (window.innerWidth < 1280) return;

        event.preventDefault();
        rightContent.scrollTop += event.deltaY;
    }, { passive: false });
}
