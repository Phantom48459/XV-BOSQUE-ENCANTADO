
const guestName = document.getElementById("guestName");

const guestError = document.getElementById("guestError");



async function loadGuest() {
    const urlParameters = new URLSearchParams(window.location.search);
    const guestId = urlParameters.get("id");

    if (!guestId) {
        guestName.textContent = "Invitado especial";
        guestError.textContent =
            "Esta es una vista general de la invitación.";
        return;
    }

    try {
        const response = await fetch("./invitados.json");

        if (!response.ok) {
            throw new Error("No fue posible cargar la lista de invitados.");
        }

        const guests = await response.json();
        const selectedGuest = guests[guestId];

        if (!selectedGuest) {
            guestName.textContent = "Invitado especial";
            guestError.textContent =
                "El enlace de esta invitación no es válido.";
            return;
        }

        guestName.textContent = selectedGuest.nombre;
        guestError.textContent = "";

    } catch (error) {
        console.error(error);

        guestName.textContent = "Invitado especial";
        guestError.textContent =
            "No fue posible cargar la invitación personalizada.";
    }
}

loadGuest();

/* ===================== */
/* CAMBIO ENTRE PANTALLAS */
/* ===================== */

let transitionInProgress = false;

function mostrarPagina(idPagina) {

    if (transitionInProgress) {
        return;
    }

    const nextPage = document.getElementById(idPagina);
    const transition = document.getElementById(
        "forestTransition"
    );

    if (!nextPage) {
        console.error(
            `No existe una pantalla con el id: ${idPagina}`
        );

        return;
    }

    transitionInProgress = true;

    transition.classList.add("active");

    window.setTimeout(() => {

        document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
        });

        nextPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 520);

    window.setTimeout(() => {

        transition.classList.remove("active");

    }, 760);

    window.setTimeout(() => {

        transitionInProgress = false;

    }, 1350);
}
/* ===================== */
/* CONTROL DE MÚSICA */
/* ===================== */

let musicPlaying = false;

function controlarMusica() {

    const music = document.getElementById(
        "backgroundMusic"
    );

    const button = document.getElementById(
        "musicButton"
    );

    const icon = document.getElementById(
        "musicIcon"
    );

    if (!music || !button || !icon) {
        return;
    }

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        icon.textContent = "♫";

        button.classList.remove("playing");

        button.setAttribute(
            "aria-label",
            "Reproducir música"
        );

    } else {

        music.play()
            .then(() => {

                musicPlaying = true;

                icon.textContent = "Ⅱ";

                button.classList.add("playing");

                button.setAttribute(
                    "aria-label",
                    "Pausar música"
                );

            })
            .catch((error) => {

                console.error(
                    "No se pudo reproducir la música:",
                    error
                );

            });
    }
}
/* ===================== */
/* CUENTA REGRESIVA */
/* ===================== */

const eventDate = new Date("2026-09-20T19:00:00-06:00");

function updateCountdown() {

    const now = new Date();
    const difference = eventDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const finishedElement = document.getElementById("countdownFinished");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        finishedElement.textContent = "¡El gran día ha llegado!";

        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

function entrarAlBosque() {

    if (!musicPlaying) {
        controlarMusica();
    }

    mostrarPagina("invitado");
}
function abrirFoto(rutaFoto) {

    const viewer = document.getElementById("photoViewer");
    const viewerImage = document.getElementById("photoViewerImage");

    viewerImage.src = rutaFoto;

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";

}

function cerrarFoto() {

    const viewer = document.getElementById("photoViewer");
    const viewerImage = document.getElementById("photoViewerImage");

    viewer.classList.remove("active");

    document.body.style.overflow = "";

    setTimeout(() => {

        viewerImage.src = "";

    },300);

}

document.addEventListener("click", function(e){

    const viewer=document.getElementById("photoViewer");

    if(e.target===viewer){

        cerrarFoto();

    }

});