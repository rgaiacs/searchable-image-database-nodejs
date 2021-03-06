"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const GeradorIdUnico = require("../../utils/gerador_identificador_unico");
const Criptografia = require("../../utils/criptografia");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const SessaoRepositorio = require("../../repositorios/sessao_repositorio");

module.exports = {

    async Executar(req, res) {
        const senhaCriptografada = Criptografia.criarCriptografiaMd5Utf8(req.body.senha);
        let usuario = await UsuarioRepositorio.obterUsuarioBasePorEmail(
            req.body.email
        );

        if (usuario && usuario.dataValues.senha === senhaCriptografada) {
            let Authorization = GeradorIdUnico.gerarUuidv4();
            const sessaoCriada = await SessaoRepositorio.criarRegistroDeSessao(
                usuario.email,
                Authorization
            ).catch(err => {
                ObjetoExcecao.status = HttpStatus.INTERNAL_SERVER_ERROR;
                ObjetoExcecao.title = Excecao.ERRO_INTERNO;
                ObjetoExcecao.detail = `Failed to register new session due ${err}`;
                throw ObjetoExcecao;
            });

            if (sessaoCriada) {
                return {
                    usuario: usuario,
                    Authorization: Authorization
                };
            }
        }

        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }
};
