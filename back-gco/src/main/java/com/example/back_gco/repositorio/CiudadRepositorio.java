package com.example.back_gco.repositorio;

import com.example.back_gco.modelo.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CiudadRepositorio extends JpaRepository<Ciudad, Long> {

    List<Ciudad> findByDepartamentoId(Long departamentoId);
}

