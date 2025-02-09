package com.api.repository.lancamento;

import com.api.model.Lancamento;
import com.api.model.dto.ResumoLancamento;
import com.api.repository.filter.LancamentoFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LancamentoRepositoryQuery {
    Page<Lancamento> filtrar(LancamentoFilter filter, Pageable page);
    Page<ResumoLancamento> resumir(LancamentoFilter filter, Pageable page);
}
