const enterButton = document.getElementById("enterButton");
const guestName = document.getElementById("guestName");
const guestError = document.getElementById("guestError");

enterButton.addEventListener("click", () => {
    document.getElementById("invitacion").scrollIntoView({
        behavior: "smooth"
    });
});

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

function mostrarPagina(idPagina) {

    const paginas = document.querySelectorAll(".page");

    paginas.forEach(function(pagina) {
        pagina.classList.remove("active");
    });

    const paginaSeleccionada = document.getElementById(idPagina);

    if (paginaSeleccionada) {
        paginaSeleccionada.classList.add("active");
        paginaSeleccionada.scrollTop = 0;
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