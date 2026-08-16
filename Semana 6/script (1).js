document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formSolicitud");
    const lista = document.querySelector("#lista");
    const contadorSpan = document.querySelector("#contador");
    let contador = 0;

    // Elementos del formulario
    const nombreInput = document.getElementById("nombre");
    const descInput = document.getElementById("descripcion");
    const tipoSelect = document.getElementById("tipo");

    // 1. Función de validación visual (Bootstrap)
    const aplicarEstilo = (input, esValido) => {
        if (esValido) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
    };

    // 2. Eventos de validación en tiempo real (Semana 6)
    nombreInput.addEventListener("input", () => {
        aplicarEstilo(nombreInput, nombreInput.value.trim().length >= 3);
    });

    descInput.addEventListener("input", () => {
        aplicarEstilo(descInput, descInput.value.trim().length >= 10);
    });

    // 3. Lógica principal de registro
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita recarga

        // Validación final
        if (nombreInput.value.trim().length < 3 || descInput.value.trim().length < 10 || tipoSelect.value === "") {
            alert("Por favor, completa correctamente todos los campos.");
            return;
        }

        // Crear la tarjeta
        contador++;
        contadorSpan.textContent = contador;

        const nuevaCard = document.createElement("div");
        nuevaCard.className = "card mb-3 shadow-sm";
        nuevaCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${nombreInput.value}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Tipo: ${tipoSelect.value}</h6>
                <p class="card-text">${descInput.value}</p>
                <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
            </div>
        `;

        // Lógica de eliminación
        nuevaCard.querySelector(".btn-eliminar").addEventListener("click", () => {
            nuevaCard.remove();
            contador--;
            contadorSpan.textContent = contador;
        });

        lista.appendChild(nuevaCard);
        
        // Limpiar formulario y resetear estilos
        form.reset();
        nombreInput.classList.remove("is-valid");
        descInput.classList.remove("is-valid");
    });
});