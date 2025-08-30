package com.example.back_gco.controlador;

import com.example.back_gco.modelo.Marca;
import com.example.back_gco.repositorio.MarcaRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marca")
public class MarcaControlador {

    private final MarcaRepositorio marcaRepositorio;


    public MarcaControlador(MarcaRepositorio marcaRepositorio) {
        this.marcaRepositorio = marcaRepositorio;
    }

    @GetMapping
    public List<Marca> listar() {
        return marcaRepositorio.findAll(); // Usamos la instancia
    }

    @PostMapping
    public Marca crear(@RequestBody Marca marca) {
        return marcaRepositorio.save(marca);
    }
}
