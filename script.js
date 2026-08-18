const guestName = document.getElementById("guestName");
const guestTable = document.getElementById("guestTable");
const tableGuestName = document.getElementById("tableGuestName");
const guestError = document.getElementById("guestError");

const guestCompanionBlock =
    document.getElementById("guestCompanionBlock");

const guestCompanionName =
    document.getElementById("guestCompanionName");

const companionTableBlock =
    document.getElementById("companionTableBlock");

const companionName =
    document.getElementById("companionName");

const companionTable =
    document.getElementById("companionTable");

async function loadGuest() {
    const urlParameters = new URLSearchParams(
        window.location.search
    );

    const guestId = urlParameters.get("id");

   function mostrarInvitadoGeneral(mensaje = "") {

    if (guestName) {
        guestName.textContent = "Invitado especial";
    }

    if (tableGuestName) {
        tableGuestName.textContent = "Invitado especial";
    }

    if (guestTable) {
        guestTable.textContent = "Por confirmar";
    }

    // Ocultar acompañante en la primera pantalla
    if (guestCompanionBlock) {
        guestCompanionBlock.hidden = true;
    }

    // Ocultar segunda mesa
    if (companionTableBlock) {
        companionTableBlock.hidden = true;
    }

    if (guestError) {
        guestError.textContent = mensaje;
    }
}


if (!guestId) {

    mostrarInvitadoGeneral(
        "Esta es una vista general de la invitación."
    );

    return;
}


try {

    const response = await fetch(
        "./invitados.json?v=38"
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo cargar invitados.json"
        );
    }


    const guests = await response.json();

    const selectedGuest = guests[guestId];


    // =====================
    // VERIFICAR INVITADO
    // =====================

    if (!selectedGuest) {

        mostrarInvitadoGeneral(
            "El enlace de esta invitación no es válido."
        );

        return;
    }


    // =====================
    // NOMBRE DEL INVITADO
    // =====================

    if (guestName) {
        guestName.textContent =
            selectedGuest.nombre;
    }


  /* ===================== */
/* ACOMPAÑANTE */
/* ===================== */

if (
    selectedGuest.acompanante &&
    selectedGuest.acompanante.mesa
) {

    const nombreAcompanante =
        selectedGuest.acompanante.nombre ||
        "Tu acompañante";


    // =====================
    // PRIMERA PANTALLA
    // =====================

    if (guestCompanionName) {
        guestCompanionName.textContent =
            nombreAcompanante;
    }

    if (guestCompanionBlock) {
        guestCompanionBlock.hidden = false;
    }


    // =====================
    // PANTALLA DE MESA
    // =====================

    if (companionName) {
        companionName.textContent =
            nombreAcompanante;
    }

    if (companionTable) {
        companionTable.textContent =
            selectedGuest.acompanante.mesa;
    }

    if (companionTableBlock) {
        companionTableBlock.hidden = false;
    }

} else {

    // Invitación normal

    if (guestCompanionBlock) {
        guestCompanionBlock.hidden = true;
    }

    if (companionTableBlock) {
        companionTableBlock.hidden = true;
    }
}

} catch (error) {
    console.error("Error al cargar la invitación:", error);
    mostrarInvitadoGeneral(
        "Hubo un problema al cargar la invitación."
    );
    
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

    if (!transition) {
    document.querySelectorAll(".page").forEach(
        function (page) {
            page.classList.remove("active");
        }
    );

    nextPage.classList.add("active");
    return;
}

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
    behavior: "auto"
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
    const music =
        document.getElementById("backgroundMusic");

    const button =
        document.getElementById("musicButton");

    const icon =
        document.getElementById("musicIcon");

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

        return;
    }

    try {
        const playResult = music.play();

        if (
            playResult &&
            typeof playResult.then === "function"
        ) {
            playResult
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
                    console.log(
                        "El navegador bloqueó la música:",
                        error
                    );
                });

        } else {
            musicPlaying = true;
            icon.textContent = "Ⅱ";

            button.classList.add("playing");

            button.setAttribute(
                "aria-label",
                "Pausar música"
            );
        }

    } catch (error) {
        console.log(
            "No se pudo iniciar la música:",
            error
        );
    }
}
/* ===================== */
/* CUENTA REGRESIVA */
/* ===================== */

const eventDate = new Date("2026-10-10T18:30:00-06:00");

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
    mostrarPagina("invitado");

    if (!musicPlaying) {
        controlarMusica();
    }


}


if (enterForestButton) {
    enterForestButton.addEventListener("click", entrarAlBosque);
    enterForestButton.addEventListener("touchend", function (event) {
        event.preventDefault();
        entrarAlBosque();
    });
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

/* ===================== */
/* LUCIÉRNAGAS */
/* ===================== */

function crearLuciernagas() {

    const contenedor = document.getElementById("fireflies");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    const esCelular = window.innerWidth <= 600;
    const cantidad = esCelular ? 22 : 30;

    for (let i = 0; i < cantidad; i++) {

        const luciernaga = document.createElement("span");

        luciernaga.classList.add("firefly");

        const tamaño = esCelular
            ? Math.random() * 3.5 + 3
            : Math.random() * 3 + 2.5;

        const movimientoX = Math.random() * 130 - 65;
        const movimientoY = Math.random() * 150 - 75;

        luciernaga.style.setProperty(
            "--size",
            `${tamaño}px`
        );

        let posicionHorizontal;

        if (Math.random() < 0.65) {

            posicionHorizontal = Math.random() < 0.5
                ? Math.random() * 28
                : Math.random() * 28 + 72;

        } else {

            posicionHorizontal = Math.random() * 100;
        }

        luciernaga.style.setProperty(
            "--left",
            `${posicionHorizontal}%`
        );

        luciernaga.style.setProperty(
            "--top",
            `${Math.random() * 100}%`
        );

        luciernaga.style.setProperty(
            "--move-x",
            `${movimientoX}px`
        );

        luciernaga.style.setProperty(
            "--move-y",
            `${movimientoY}px`
        );

        luciernaga.style.setProperty(
            "--glow-duration",
            `${Math.random() * 3 + 3}s`
        );

        luciernaga.style.setProperty(
            "--move-duration",
            `${Math.random() * 7 + 8}s`
        );

        luciernaga.style.setProperty(
            "--delay",
            `${Math.random() * -10}s`
        );

        contenedor.appendChild(luciernaga);
    }
}

crearLuciernagas();