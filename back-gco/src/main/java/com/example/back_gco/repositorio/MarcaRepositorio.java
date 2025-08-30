package com.example.back_gco.repositorio;

import com.example.back_gco.modelo.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepositorio extends JpaRepository<Marca, Long> {
}
