package com.gusta.listaDeCompras.repository;

import com.gusta.listaDeCompras.entity.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProdutoRepository extends JpaRepository<ProdutoEntity, UUID>{
}
