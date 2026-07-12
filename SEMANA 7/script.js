const form = document.getElementById('formSolicitud');
const lista = document.getElementById('lista');
const contador = document.getElementById('contador');
let registros = [];

// Función para renderizar y permitir borrar
function renderizarRegistros() {
    lista.innerHTML = registros.map((item, index) => `
        <div class="col-md-4 mb-3">
            <div class="card h-100 shadow-sm border-primary">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <h6 class="text-muted">${item.tipo}</h6>
                    <p class="card-text">${item.descripcion}</p>
                    <button class="btn btn-danger btn-sm" onclick="borrarRegistro(${index})">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
    
    contador.innerText = registros.length;
}

// Función para borrar un registro
function borrarRegistro(index) {
    registros.splice(index, 1); // Quita 1 elemento en la posición 'index'
    renderizarRegistros();     // Actualiza la pantalla
}

// Evento para procesar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const desc = document.getElementById('descripcion').value;
    const tipo = document.getElementById('tipo').value;

    if (nombre.length >= 3 && desc.length >= 10 && tipo !== "") {
        registros.push({ nombre, descripcion: desc, tipo });
        renderizarRegistros();
        form.reset();
        form.classList.remove('was-validated');
    } else {
        form.classList.add('was-validated');
        alert("Por favor, verifica que el nombre tenga 3+ caracteres y la descripción 10+.");
    }
});