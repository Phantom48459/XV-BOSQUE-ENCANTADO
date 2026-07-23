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