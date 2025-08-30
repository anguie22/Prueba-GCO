package com.example.back_gco.repositorio;

import com.example.back_gco.modelo.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DepartamentoRepositorio extends JpaRepository<Departamento, Long> {

    List<Departamento> findByPaisId(Long paisId);
}
