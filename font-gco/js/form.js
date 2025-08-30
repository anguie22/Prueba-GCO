


const form = document.getElementById("formCliente");
const tipoIdentificacion = document.getElementById("tipoIdentificacion");
const numeroIdentificacion = document.getElementById("numeroIdentificacion");
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const direccion = document.getElementById("direccion");
const pais = document.getElementById("pais");
const departamento = document.getElementById("departamento");
const ciudad = document.getElementById("ciudad");
const selectMarca = document.getElementById("marca");
const btnGuardar = document.getElementById("btnGuardar");
const galeria = document.getElementById("galeriaMarcas");

const IMG_BASE = "./img";

function nombreAArchivo(nombre) {
    if (!nombre) return null;
    return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "") + ".png";
}
function rutaLogoPorNombre(nombre) {
    const file = nombreAArchivo(nombre);
    return file ? `${IMG_BASE}/${file}` : null;
}
function llenarSelect(elemento, data, placeholder = "-- Selecciona --") {
    elemento.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = placeholder;
    elemento.appendChild(opt);
    data.forEach(item => {
        const o = document.createElement("option");
        o.value = item.id;
        o.textContent = item.nombre;
        elemento.appendChild(o);
    });
}
function aplicarFondoDesdeMarcaNombre(nombre) {
    const src = rutaLogoPorNombre(nombre);
    if (!src) { document.body.style.backgroundImage = "none"; return; }
    const img = new Image();
    img.onload = () => {
        document.body.style.backgroundImage = `url('${src}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
    };
    img.onerror = () => { document.body.style.backgroundImage = "none"; };
    img.src = src;
}
function resaltarSeleccion(idSeleccionado) {
    document.querySelectorAll(".card-marca").forEach(c => {
        c.classList.toggle("seleccionada", Number(c.dataset.id) === idSeleccionado);
    });
}
async function cargarCatalogos() {
    try {
        const [tipos, paises, marcas] = await Promise.all([Api.getTipos(), Api.getPaises(), Api.getMarcas()]);
        llenarSelect(tipoIdentificacion, tipos);
        llenarSelect(pais, paises);
        llenarSelect(selectMarca, marcas);
        galeria.innerHTML = "";
        marcas.forEach(m => {
            const card = document.createElement("div");
            card.className = "card-marca";
            card.dataset.id = m.id;
            const img = document.createElement("img");
            img.src = rutaLogoPorNombre(m.nombre);
            img.alt = m.nombre;
            img.onerror = () => { img.style.display = "none"; };
            const label = document.createElement("span");
            label.textContent = m.nombre;
            card.appendChild(img);
            card.appendChild(label);
            galeria.appendChild(card);
        });
        galeria.addEventListener("click", (e) => {
            const card = e.target.closest(".card-marca");
            if (!card) return;
            const id = Number(card.dataset.id);
            selectMarca.value = String(id);
            resaltarSeleccion(id);
            const marcaSel = marcas.find(x => x.id === id);
            aplicarFondoDesdeMarcaNombre(marcaSel?.nombre);
        });
        selectMarca.addEventListener("change", () => {
            const id = Number(selectMarca.value);
            resaltarSeleccion(id);
            const marcaSel = marcas.find(x => x.id === id);
            aplicarFondoDesdeMarcaNombre(marcaSel?.nombre);
        });
    } catch (e) {
        Swal.fire("Error al cargar", "No pudimos cargar la información, inténtalo nuevamente.", "error");
    }
}
async function cargarDependientes() {
    pais.addEventListener("change", async () => {
        const id = pais.value;
        departamento.disabled = true;
        ciudad.disabled = true;
        ciudad.innerHTML = `<option value="">-- Selecciona --</option>`;
        if (!id) {
            departamento.innerHTML = `<option value="">-- Selecciona --</option>`;
            return;
        }
        try {
            const dptos = await Api.getDptos(id);
            llenarSelect(departamento, dptos);
            departamento.disabled = false;
        } catch { Swal.fire("Error", "No pudimos cargar los departamentos.", "error"); }
    });
    departamento.addEventListener("change", async () => {
        const id = departamento.value;
        ciudad.disabled = true;
        if (!id) {
            ciudad.innerHTML = `<option value="">-- Selecciona --</option>`;
            return;
        }
        try {
            const ciudadesList = await Api.getCiudades(id);
            llenarSelect(ciudad, ciudadesList);
            ciudad.disabled = false;
        } catch { Swal.fire("Error", "No pudimos cargar las ciudades.", "error"); }
    });
}
function validarFormulario() {
    if (!tipoIdentificacion.value) return "Por favor selecciona tu tipo de identificación";
    if (!numeroIdentificacion.value.trim()) return "Por favor ingresa tu número de identificación";
    if (!nombres.value.trim()) return "Necesitamos tus nombres para continuar";
    if (!apellidos.value.trim()) return "Necesitamos tus apellidos para continuar";
    if (!fechaNacimiento.value) return "Por favor ingresa tu fecha de nacimiento";
    if (!direccion.value.trim()) return "Tu dirección es importante para poder registrarte";
    if (!pais.value) return "Selecciona tu país de residencia";
    if (!departamento.value) return "Selecciona tu departamento";
    if (!ciudad.value) return "Selecciona tu ciudad";
    if (!selectMarca.value) return "Selecciona la marca de tu preferencia";
    return null;
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const error = validarFormulario();
    if (error) return Swal.fire("Formulario incompleto", error, "warning");
    let fechaISO = fechaNacimiento.value;
    if (fechaNacimiento.value) {
        const f = new Date(fechaNacimiento.value);
        if (!isNaN(f)) {
            fechaISO = new Date(f.getTime() - f.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
        }
    }
    const body = {
        tipoIdentificacion: { id: Number(tipoIdentificacion.value) },
        numeroIdentificacion: numeroIdentificacion.value.trim(),
        nombres: nombres.value.trim(),
        apellidos: apellidos.value.trim(),
        fechaNacimiento: fechaISO,
        direccion: direccion.value.trim(),
        pais: { id: Number(pais.value) },
        departamento: { id: Number(departamento.value) },
        ciudad: { id: Number(ciudad.value) },
        marca: { id: Number(selectMarca.value) }
    };
    btnGuardar.disabled = true;
    try {
        const resp = await Api.crearCliente(body);
        Swal.fire("¡Registro exitoso! 🎉", "Te has inscrito correctamente en nuestro programa de fidelidad.", "success");
        form.reset();
        departamento.disabled = true;
        ciudad.disabled = true;
        document.body.style.backgroundImage = "none";
        resaltarSeleccion(-1);
    } catch (e2) {
        Swal.fire("Ups... algo salió mal 😓", "No pudimos completar tu inscripción. Inténtalo de nuevo más tarde.", "error");
    } finally {
        btnGuardar.disabled = false;
    }
});
document.addEventListener("DOMContentLoaded", async () => {
    await cargarCatalogos();
    await cargarDependientes();
});
