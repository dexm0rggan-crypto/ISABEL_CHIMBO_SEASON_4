// ===============================
// VARIABLES GLOBALES
// ===============================

const form = document.getElementById("formSolicitud");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

const mensaje = document.getElementById("mensaje");
const spinner = document.getElementById("spinnerCarga");

const detalleModal = document.getElementById("detalleModal");

const modalDetalle = new bootstrap.Modal(
    document.getElementById("modalDetalle")
);

const modalEliminar = new bootstrap.Modal(
    document.getElementById("modalEliminar")
);

const btnEliminar = document.getElementById("btnEliminar");

let registros = JSON.parse(localStorage.getItem("registros")) || [];

let indiceEliminar = null;

// ===============================
// GUARDAR EN LOCAL STORAGE
// ===============================

function guardarDatos(){

    localStorage.setItem(
        "registros",
        JSON.stringify(registros)
    );

}

// ===============================
// ALERTAS BOOTSTRAP
// ===============================

function mostrarMensaje(texto,tipo){

    mensaje.className = `alert alert-${tipo}`;

    mensaje.innerHTML = texto;

    mensaje.classList.remove("d-none");

    setTimeout(()=>{

        mensaje.classList.add("d-none");

    },3000);

}

// ===============================
// ACTUALIZAR CONTADOR
// ===============================

function actualizarContador(){

    contador.textContent = registros.length;

}

// ===============================
// MOSTRAR SPINNER
// ===============================

function mostrarSpinner(){

    spinner.classList.remove("d-none");

}

function ocultarSpinner(){

    spinner.classList.add("d-none");

}
// ===============================
// RENDERIZAR TARJETAS
// ===============================

function renderizarRegistros() {

    lista.innerHTML = "";

    registros.forEach((item, index) => {

        lista.innerHTML += `

        <div class="col-md-4 mb-4">

            <div class="card shadow h-100 border-0">

                <div class="card-body">

                    <h5 class="card-title text-primary">
                        <i class="bi bi-person-fill"></i>
                        ${item.nombre}
                    </h5>

                    <h6 class="text-secondary mb-3">
                        ${item.tipo}
                    </h6>

                    <p class="card-text">
                        ${item.descripcion}
                    </p>

                </div>

                <div class="card-footer bg-white border-0">

                    <button
                        class="btn btn-primary btn-sm me-2"
                        onclick="verDetalle(${index})">

                        <i class="bi bi-eye-fill"></i>

                        Ver

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="confirmarEliminar(${index})">

                        <i class="bi bi-trash-fill"></i>

                        Eliminar

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    actualizarContador();

    guardarDatos();

}

// ===============================
// VER DETALLE
// ===============================

function verDetalle(index){

    const registro = registros[index];

    detalleModal.innerHTML = `

        <strong>Nombre:</strong>
        ${registro.nombre}

        <br><br>

        <strong>Tipo:</strong>
        ${registro.tipo}

        <br><br>

        <strong>Descripción:</strong>

        <br>

        ${registro.descripcion}

    `;

    modalDetalle.show();

}

// ===============================
// CONFIRMAR ELIMINACIÓN
// ===============================

function confirmarEliminar(index){

    indiceEliminar = index;

    modalEliminar.show();

}
// ===============================
// ELIMINAR REGISTRO
// ===============================

btnEliminar.addEventListener("click", () => {

    if (indiceEliminar !== null) {

        registros.splice(indiceEliminar, 1);

        renderizarRegistros();

        mostrarMensaje(
            "La solicitud fue eliminada correctamente.",
            "danger"
        );

        indiceEliminar = null;

        modalEliminar.hide();
    }

});

// ===============================
// REGISTRAR SOLICITUD
// ===============================

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();

    const descripcion = document.getElementById("descripcion").value.trim();

    const tipo = document.getElementById("tipo").value;

    if (
        nombre.length < 3 ||
        descripcion.length < 10 ||
        tipo === ""
    ) {

        form.classList.add("was-validated");

        mostrarMensaje(
            "Complete correctamente todos los campos.",
            "warning"
        );

        return;
    }

    mostrarSpinner();

    setTimeout(() => {

        ocultarSpinner();

        registros.push({

            nombre: nombre,
            descripcion: descripcion,
            tipo: tipo

        });

        renderizarRegistros();

        mostrarMensaje(
            "Solicitud registrada correctamente.",
            "success"
        );

        form.reset();

        form.classList.remove("was-validated");

    }, 1500);

});

// ===============================
// CARGAR REGISTROS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    renderizarRegistros();

});