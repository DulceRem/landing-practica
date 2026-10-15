
// ==========================
// NOVA — FUNCIONES PRINCIPALES
// ==========================

// MENÚ PARA CELULARES

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const abierto = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(abierto));
        menuToggle.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });

    navLinks.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 650) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        }
    });
}

// ANIMACIONES AL DESPLAZARSE

const elementosReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        function (entradas, observer) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elementosReveal.forEach(function (elemento) {
        observador.observe(elemento);
    });
} else {
    elementosReveal.forEach(function (elemento) {
        elemento.classList.add("visible");
    });
}

// CARRUSEL DE PROYECTOS

const novaTrack = document.getElementById("novaTrack");
const carouselViewport = document.getElementById("carouselViewport");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const novaProgress = document.getElementById("novaProgress");
const galleryCounter = document.getElementById("galleryCounter");

if (
    novaTrack &&
    carouselViewport &&
    prevButton &&
    nextButton &&
    novaProgress &&
    galleryCounter
) {
    const cards = Array.from(
        novaTrack.querySelectorAll(".project-card")
    );

    let currentIndex = 0;
    let maxIndex = 0;
    let step = 0;

    function calcularCarrusel() {
        if (cards.length === 0) {
            return;
        }

        const cardWidth = cards[0].getBoundingClientRect().width;
        const estilosTrack = window.getComputedStyle(novaTrack);
        const gap = parseFloat(estilosTrack.columnGap) || 0;

        step = cardWidth + gap;

        const visibles = Math.max(
            1,
            Math.floor((carouselViewport.clientWidth + gap) / step)
        );

        maxIndex = Math.max(0, cards.length - visibles);
        currentIndex = Math.min(currentIndex, maxIndex);

        actualizarCarrusel();
    }

    function actualizarCarrusel() {
        novaTrack.style.transform =
            `translateX(-${currentIndex * step}px)`;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;

        const progreso = maxIndex > 0
            ? (currentIndex / maxIndex) * 100
            : 100;

        novaProgress.style.width = `${progreso}%`;

        const primero = String(currentIndex + 1).padStart(2, "0");
        const total = String(cards.length).padStart(2, "0");

        galleryCounter.textContent = `${primero} / ${total}`;
    }

    nextButton.addEventListener("click", function () {
        if (currentIndex < maxIndex) {
            currentIndex++;
            actualizarCarrusel();
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            actualizarCarrusel();
        }
    });

    window.addEventListener("resize", calcularCarrusel);

    calcularCarrusel();
}

// AÑO AUTOMÁTICO EN EL PIE DE PÁGINA

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
