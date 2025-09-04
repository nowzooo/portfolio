document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav__link");
    const OFFSET = 100; // 상단 여백

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

            // 메뉴 클릭 시 서브 메뉴 닫기
            const navMenu = document.querySelector(".nav_sub");
            if (navMenu) navMenu.classList.remove("show");
        });
    });

    // 햄버거 버튼 클릭 시 메뉴 열기/닫기
    const navBtn = document.querySelector(".nav_btn");
    const navMenu = document.querySelector(".nav_sub");

    if (navBtn && navMenu) {
        navBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    // ================= 헤더 스크롤 숨김/보임 =================
    let didScroll = false;
    let lastScrollTop = 0;
    const delta = 3;
    const header = document.querySelector("header");
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
            // 스크롤 아래로 → 헤더 숨기기
            header.classList.add("header--hidden");
            if (navMenu) navMenu.classList.remove("show"); // 서브 메뉴도 같이 숨김
        } else {
            // 스크롤 위로 → 헤더 보이기
            if (st + window.innerHeight < document.documentElement.scrollHeight) {
                header.classList.remove("header--hidden");
            }
        }

        lastScrollTop = st;
    }
});


// ========== TOP 버튼 스크립트 ==========
// 스크롤 이벤트로 버튼 표시/숨김 처리
window.addEventListener('scroll', () => {
    const topButton = document.querySelector('.top-button');
    if (window.scrollY > 100) { // 스크롤이 500px 이상 내려갔을 때 버튼 표시
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
});

// 버튼 클릭 시 최상단으로 스크롤
document.querySelector('.top-button').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드럽게 스크롤
    });
});


const targets = document.querySelectorAll(".test_obj");

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


function updateClock() {
    const clocks = document.querySelectorAll("#clock"); // 모든 clock 요소 선택
    const now = new Date();

    const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
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

// 처음 실행 + 1분마다 갱신
updateClock();
setInterval(updateClock, 1000 * 60);