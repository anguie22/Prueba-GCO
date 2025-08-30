package com.example.back_gco.controlador;

import com.example.back_gco.modelo.Pais;
import com.example.back_gco.repositorio.PaisRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paises")
public class PaisControlador {

    private final PaisRepositorio paisRepositorio;

    public PaisControlador(PaisRepositorio paisRepositorio) {
        this.paisRepositorio = paisRepositorio;
    }

    @GetMapping
    public List<Pais> listar() {
        return paisRepositorio.findAll();
    }

    @PostMapping
    public Pais crear(@RequestBody Pais pais) {
        return paisRepositorio.save(pais);
    }
}