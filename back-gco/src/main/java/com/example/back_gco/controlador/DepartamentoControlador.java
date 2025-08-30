package com.example.back_gco.controlador;

import com.example.back_gco.modelo.Departamento;
import com.example.back_gco.repositorio.DepartamentoRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoControlador {

    private final DepartamentoRepositorio departamentoRepositorio;

    public DepartamentoControlador(DepartamentoRepositorio departamentoRepositorio) {
        this.departamentoRepositorio = departamentoRepositorio;
    }

    @GetMapping
    public List<Departamento> listar() {
        return departamentoRepositorio.findAll();
    }

    @PostMapping
    public Departamento crear(@RequestBody Departamento departamento) {
        return departamentoRepositorio.save(departamento);
    }
}