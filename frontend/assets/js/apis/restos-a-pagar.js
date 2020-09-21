var apiRestosAPagar = {
    url: 'http://localhost:3003/',
    ug: {
        buscar: function(id) {
            return xhrRequest(apiRestosAPagar.url + 'ug/' + id);
        },
        criar: function(data) {
            return xhrRequest(apiRestosAPagar.url + 'ug', 'POST', JSON.stringify({ ug: data }));
        },
        deletar: function(id) {
            return xhrRequest(apiRestosAPagar.url + 'ug/' + id, 'DELETE');
        },
        editar: function(id, data) {
            return xhrRequest(apiRestosAPagar.url + 'ug/' + id, 'PUT', JSON.stringify({ ug: data }));
        },
        listar: function() {
            return xhrRequest(apiRestosAPagar.url + 'ug');
        },
        listarGestores: function(loading = true) {
            return xhrRequest(apiRestosAPagar.url + 'ug/gestores', 'GET', {}, loading);
        }
    },
    notaEmpenhoSaldo: {
        _formatarDados: function(data) {
            return $.map(data, function(value) {
                if(Object.keys(value).length > 1) {
                    try {
                        notaEmpenhoCcor = splitNotaEmpenhoCcor(value.notaEmpenhoCcor);
                        return {
                            pcaspConta: parseInt(value.contaContabil),
                            ugCodigo: parseInt(value.ugExecutora),
                            convenio: parseNumeroConvenio(value.numOriginalTvNeCcor),
                            operacao: parseNumeroContratoRepasse(value.numOriginalTvNeCcor),
                            ptres: parseInt(value.ptres),
                            tipoResultadoPrimarioId:parseInt(value.resultadoEof),
                            tipoResultadoPrimarioDescricao: value[''],
                            anoOrcamentario: parseInt(notaEmpenhoCcor[0]),
                            documento: notaEmpenhoCcor.join(''),
                            dataEmissao: ddmmyyyyToyyyymmdd(value.diaEmissaoNeCcor),
                            saldoContaContabil: numeral(value['saldoRContaContabil)']).value(),
                        }
                    } catch (error) {
                        bootbox.alert({
                            title: 'Ops...',
                            message: 'Houve um erro formatar o número da nota d empenho Ccor. Por favor rente novamente e caso o erro persista contate a GEOTR.',
                        })
                    }
                }
            })
        },
        criar: function(data) {
            _data = {
                uuid: createUUID(),
                matricula: data.user,
                dataReferencia: data.position,
                saldos: apiRestosAPagar.notaEmpenhoSaldo._formatarDados(data.balances)
            };
            return xhrRequest(apiRestosAPagar.url + 'notas-empenho/saldo', 'POST', JSON.stringify(_data), false);
        }
    },
    operacoes: {
        passiveisBloqueio: {
            listar: function(anoExecucao, tipoInformacaoId = 3, unidadeId = null, siglaGestor = null, loading = true) {
                data = {unidadeId, siglaGestor};
                return xhrRequest(apiRestosAPagar.url + 'operacoes/passiveis-bloqueio/' + anoExecucao + '/' + tipoInformacaoId, 'GET', data, loading);
            }
        },
    },
    estatisticas: {
        listar: function(anoExecucao, tipoInformacaoId = 3, unidadeId = null, siglaGestor = null, loading = true) {
            data = {unidadeId, siglaGestor};
            data = Object.keys(data).reduce(function(r, e) {
                if (!stringIsEmpty(data[e])) r[e] = data[e];
                return r;
            }, {});
            return xhrRequest(apiRestosAPagar.url + 'estatisticas/' + anoExecucao + '/' + tipoInformacaoId, 'GET', data, loading);
        },
    },
    unidades: {
        listar: function(loading = true) {
            return xhrRequest(apiRestosAPagar.url + 'unidades', 'GET', {}, loading);
        }
    },

    tipoInformacao: {
        listar: function(ano, loading = false) {
            return xhrRequest(apiRestosAPagar.url + 'tipos-informacoes/' + ano, 'GET', {}, loading);
        }
    },

    status: function(loading = false) {
        return xhrRequest(apiRestosAPagar.url, 'GET', {}, loading);
    },

    parametros: {
        listar: function(loading = false) {
            return xhrRequest(apiRestosAPagar.url + 'parametros/', 'GET', {}, loading);
        }
    }
}