package com.gusta.listaDeCompras.controller;

import com.gusta.listaDeCompras.entity.ProdutoEntity;
import com.gusta.listaDeCompras.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    //---------- create ------------
    @PostMapping
    public ProdutoEntity criar(@RequestBody ProdutoEntity produto){
        return produtoService.criar(produto);
    }

    //--------- read ---------
    @GetMapping
    public List<ProdutoEntity> listar(){
        return produtoService.listar();
    }

    //------------ update ---------
    @PutMapping("/{id}")
    public ProdutoEntity update(
            @PathVariable UUID id,
            @RequestBody ProdutoEntity produto){
        return produtoService.update(id, produto);
    }

    // ------- delete -------
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        produtoService.delete(id);
    }
}
