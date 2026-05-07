package com.gusta.listaDeCompras.service;

import com.gusta.listaDeCompras.entity.ProdutoEntity;
import com.gusta.listaDeCompras.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    //----------- create ----------
    public ProdutoEntity criar(ProdutoEntity produto){
        return produtoRepository.save(produto);
    }

    // ----------- read -----------
    public List<ProdutoEntity> listar(){
        return produtoRepository.findAll();
    }

    //---------- update ----------

    public ProdutoEntity update(UUID id, ProdutoEntity produtoUpdate){
        ProdutoEntity produtoEntity = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("produto nao encontrado"));

       produtoEntity.setNome(produtoUpdate.getNome());
       produtoEntity.setDescricao(produtoUpdate.getDescricao());
       produtoEntity.setQuantidade(produtoUpdate.getQuantidade());

        return produtoRepository.save(produtoEntity);
    }

    //-------- delete ----------
    public void delete(UUID id){
        produtoRepository.deleteById(id);
    }

}
