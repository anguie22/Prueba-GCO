package com.example.back_gco.controlador;

import com.example.back_gco.modelo.TipoIdentificacion;
import com.example.back_gco.repositorio.TipoIdentificacionRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-identificacion")
public class TipoIdentificacionControlador {

    private final TipoIdentificacionRepositorio tipoIdentificacionRepositorio;

    public TipoIdentificacionControlador(TipoIdentificacionRepositorio tipoIdentificacionRepositorio) {
        this.tipoIdentificacionRepositorio = tipoIdentificacionRepositorio;
    }

    @GetMapping
    public List<TipoIdentificacion> listar() {
        return tipoIdentificacionRepositorio.findAll();
    }

    @PostMapping
    public TipoIdentificacion crear(@RequestBody TipoIdentificacion tipoIdentificacion) {
        return tipoIdentificacionRepositorio.save(tipoIdentificacion);
    }
}