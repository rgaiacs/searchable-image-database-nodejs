"use strict";

const config = require("config");
const cors = require("cors");
const express = require("express");
const FileUpload = require("express-fileupload");

const auth_middleware = require("./utils/auth_middleware");

const rotasIndex = require("./rotas/rotasIndex");
const rotasUsuario = require("./rotas/rotasUsuario");
const rotasLesoes = require("./rotas/rotasLesoes");
const rotasDescricoes = require("./rotas/rotasDescricoes");
const rotasImagem = require("./rotas/rotasImagem");

require("./database"); //Obtem a conexão com a base de dados

const app = express();
app.use(express.static(__dirname + "/assets")); //Configura caminho estático para acesso via URL
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));
app.use(FileUpload({ limits: { fileSize: 50 * 1024 * 1024 }})); //Limita o tamanho do arquivo a ser upado a 50Mb

var whitelist = config.get("cors.whitelist");
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate)); //Lidando com politica CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// Middleware
app.use(auth_middleware.get_user_from_session);

//Rotas do sistema
app.use("/", rotasIndex);
app.use("/", rotasUsuario);
app.use("/", rotasLesoes);
app.use("/", rotasDescricoes);
app.use("/", rotasImagem);

module.exports = app;
