package com.example.back_gco.controlador;

import com.example.back_gco.modelo.Cliente;
import com.example.back_gco.repositorio.ClienteRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5173"})
public class ClienteControlador {

    private final ClienteRepositorio clienteRepositorio;

    public ClienteControlador(ClienteRepositorio clienteRepositorio) {
        this.clienteRepositorio = clienteRepositorio;
    }

    @GetMapping
    public List<Cliente> listar() {
        return clienteRepositorio.findAll();
    }

    @PostMapping
    public Cliente crear(@RequestBody Cliente cliente) {

        return clienteRepositorio.save(cliente);
    }
}
