

const API_BASE = "http://localhost:8080/api";

async function apiGet(path, params = {}) {
    const url = new URL(API_BASE + path);
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error GET " + path);
    return res.json();
}

async function apiPost(path, body) {
    const res = await fetch(API_BASE + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data?.error || "Error al guardar");
    }
    return data;
}

const Api = {
    getTipos: () => apiGet("/datos/tipos-identificacion"),
    getPaises: () => apiGet("/datos/paises"),
    getDptos: (paisId) => apiGet("/datos/departamentos", { paisId }),
    getCiudades: (departamentoId) => apiGet("/datos/ciudades", { departamentoId }),
    getMarcas: () => apiGet("/datos/marcas"),
    crearCliente: (payload) => apiPost("/clientes", payload),
};

window.Api = Api; 
