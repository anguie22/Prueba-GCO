package com.example.back_gco.servicio;

import com.example.back_gco.modelo.Cliente;
import com.example.back_gco.repositorio.ClienteRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteServicio {

    private final ClienteRepositorio clienteRepositorio;

    public ClienteServicio(ClienteRepositorio clienteRepositorio) {
        this.clienteRepositorio = clienteRepositorio;
    }

    public Cliente guardarCliente(Cliente cliente) {
        // Aquí podrías agregar validaciones extra
        return clienteRepositorio.save(cliente);
    }

    public List<Cliente> listarClientes() {
        return clienteRepositorio.findAll();
    }
}
