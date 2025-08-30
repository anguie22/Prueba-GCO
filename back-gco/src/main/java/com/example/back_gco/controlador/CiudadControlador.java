package com.example.back_gco.controlador;

import com.example.back_gco.modelo.Ciudad;
import com.example.back_gco.repositorio.CiudadRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ciudad")
public class CiudadControlador {
    private final CiudadRepositorio ciudadRepositorio;

    public CiudadControlador(CiudadRepositorio ciudadRepositorio) {
        this.ciudadRepositorio = ciudadRepositorio;
    }

    @GetMapping
    public List<Ciudad> listar() {
        return ciudadRepositorio.findAll();
    }

    @PostMapping
    public Ciudad crear(@RequestBody Ciudad ciudad) {
        return ciudadRepositorio.save(ciudad);
    }

}
