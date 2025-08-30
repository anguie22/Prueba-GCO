package com.example.back_gco.controlador;

import com.example.back_gco.modelo.*;
import com.example.back_gco.repositorio.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://127.0.0.1:5500","http://localhost:5173"})
@RequestMapping("/api/datos")
public class DatosControlador {

    private final PaisRepositorio paisRepositorio;
    private final DepartamentoRepositorio departamentoRepositorio;
    private final CiudadRepositorio ciudadRepositorio;
    private final MarcaRepositorio marcaRepositorio;
    private final TipoIdentificacionRepositorio tipoIdentificacionRepositorio;

    public DatosControlador(
            PaisRepositorio paisRepositorio,
            DepartamentoRepositorio departamentoRepositorio,
            CiudadRepositorio ciudadRepositorio,
            MarcaRepositorio marcaRepositorio,
            TipoIdentificacionRepositorio tipoIdentificacionRepositorio
    ) {
        this.paisRepositorio = paisRepositorio;
        this.departamentoRepositorio = departamentoRepositorio;
        this.ciudadRepositorio = ciudadRepositorio;
        this.marcaRepositorio = marcaRepositorio;
        this.tipoIdentificacionRepositorio = tipoIdentificacionRepositorio;
    }

    @GetMapping("/paises")
    public List<Pais> paises() {
        return paisRepositorio.findAll();
    }

    @GetMapping("/departamentos")
    public List<Departamento> departamentos(@RequestParam Long paisId) {
        return departamentoRepositorio.findByPaisId(paisId);
    }

    @GetMapping("/ciudades")
    public List<Ciudad> ciudades(@RequestParam Long departamentoId) {
        return ciudadRepositorio.findByDepartamentoId(departamentoId);
    }

    @GetMapping("/marcas")
    public List<Marca> marcas() {
        return marcaRepositorio.findAll();
    }

    @GetMapping("/tipos-identificacion")
    public List<TipoIdentificacion> tiposIdentificacion() {
        return tipoIdentificacionRepositorio.findAll();
    }
}
