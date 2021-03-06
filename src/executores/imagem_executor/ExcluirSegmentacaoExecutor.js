"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ExcluirSegmentacaoExecutor");

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const gate_keeper = require("../../utils/gate_keeper");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req, res);
        await ImagemRepositorio.excluirSegmentacaoDeCitoplasma(req.params.id_celula);
        await ImagemRepositorio.excluirSegmentacaoDeNucleo(req.params.id_celula);
        await ImagemRepositorio.excluirCelula(req.params.id_celula, req.params.id_imagem);
    }
};

async function validarRequisicao(req, res) {

    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [imagem] = await Promise.all([imagemTask]);

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    gate_keeper.check_strict_ownership(
        imagem,
        res.locals.user
    );
}
