"use strict";
const msgUsuarioEl = document.getElementsByClassName("msgUsuario");
const msgInputUsuarioEl = document.getElementsByClassName("msgInputUsuario");
const msgInputSenhaEl = document.getElementsByClassName("msgInputSenha");
const msgInputRepetirSenhaEl = document.getElementsByClassName("msgInputRepetirSenha");
const padraoEmail = ["@"];
const padraoSenha = ["*", "&", "#"];
const objMsgsErro = {
    usuarioInexistente: "O usuário não existe. Use apenas letras minúsculas para o e-mail",
    emailVazio: "Digite um e-mail",
    emailForaPadrao: "E-mail fora dos padrões",
    senhaVazia: "Digite uma senha",
    senhaForaPadrao: "A senha deve conter pelos menos um dos caracteres *, & ou #",
    repetirSenhaVazio: "Digite uma senha",
    senhaNaoCoincide: "As senhas não coincidem",
    usuarioRepetido: "Usuário já cadastrado. Use outro e-mail apenas com letras minúsculas.",
};
const campoPreenchidoSegundoPadrao = (inputEl, arrayCaracteresComPadrao) => {
    const caracteresDigitados = inputEl.value.split("");
    let resultado = false;
    for (const caratere of arrayCaracteresComPadrao) {
        resultado = caracteresDigitados.includes(caratere) || resultado;
    }
    return resultado;
};
const inputVazio = (inputEl) => {
    if (inputEl.value === "") {
        return true;
    }
    return false;
};
const validaInput = (inputEl, padrao) => {
    const inputPreenchido = !inputVazio(inputEl);
    const inputNoPadrao = campoPreenchidoSegundoPadrao(inputEl, padrao);
    return inputPreenchido && inputNoPadrao;
};
const limparInput = (inputEl) => {
    inputEl.value = "";
};
const exibeMsgsPreenchimentoEmail = (inputUsuario) => {
    const emailVazio = inputVazio(inputUsuario);
    const emailNosPadroes = campoPreenchidoSegundoPadrao(inputUsuario, padraoEmail);
    const msgUsuario = msgInputUsuarioEl[0];
    const emailPreenchidoDeFormaCorreta = !emailVazio && emailNosPadroes;
    if (emailVazio) {
        msgUsuario.innerHTML = objMsgsErro.emailVazio;
        msgUsuario.classList.add("msg_exibir");
        return;
    }
    if (emailPreenchidoDeFormaCorreta) {
        msgUsuario.innerHTML = "";
        msgUsuario.classList.remove("msg_exibir");
    }
    if (!emailPreenchidoDeFormaCorreta) {
        msgUsuario.innerHTML = objMsgsErro.emailForaPadrao;
        msgUsuario.classList.add("msg_exibir");
    }
};
const exibeMsgsPreenchimentoSenha = (inputSenha) => {
    const senhaVazia = inputVazio(inputSenha);
    const senhaNosPadroes = campoPreenchidoSegundoPadrao(inputSenha, padraoSenha);
    const msgSenha = msgInputSenhaEl[0];
    const senhaPreenchidaDeFormaCorreta = !senhaVazia && senhaNosPadroes;
    if (senhaVazia) {
        msgSenha.innerHTML = objMsgsErro.senhaVazia;
        msgSenha.classList.add("msg_exibir");
        return;
    }
    if (senhaPreenchidaDeFormaCorreta) {
        msgSenha.innerHTML = "";
        msgSenha.classList.remove("msg_exibir");
        return;
    }
    if (!senhaPreenchidaDeFormaCorreta) {
        msgSenha.innerHTML = objMsgsErro.senhaForaPadrao;
        msgSenha.classList.add("msg_exibir");
        return;
    }
};
const exibeMsgsPreenchimentoRepetirSenha = (inputRepetirSenhaEl) => {
    const campoRepetirSenhaVazio = inputVazio(inputRepetirSenhaEl);
    const senha = inputSenhaEl.value;
    const senhaRepetida = inputRepetirSenhaEl.value;
    const duasSenhasSaoIguais = senha === senhaRepetida;
    const msgRepetirSenha = msgInputRepetirSenhaEl[0];
    if (campoRepetirSenhaVazio) {
        msgRepetirSenha.innerHTML = objMsgsErro.repetirSenhaVazio;
        msgRepetirSenha.classList.add("msg_exibir");
        return;
    }
    if (duasSenhasSaoIguais) {
        msgRepetirSenha.innerHTML = "";
        msgRepetirSenha.classList.remove("msg_exibir");
        return;
    }
    if (!duasSenhasSaoIguais) {
        msgRepetirSenha.innerHTML = objMsgsErro.senhaNaoCoincide;
        msgRepetirSenha.classList.add("msg_exibir");
        return;
    }
};
const ocultaMsgErroUsuarioInexistente = () => {
    const msgUsuarioInexistente = msgUsuarioEl[0];
    msgUsuarioInexistente.innerHTML = "";
    msgUsuarioInexistente.classList.remove("msg_exibir");
};
const exibeMsgErroUsuarioInexistente = () => {
    const msgUsuarioInexistente = msgUsuarioEl[0];
    msgUsuarioInexistente.innerHTML = objMsgsErro.usuarioInexistente;
    msgUsuarioInexistente.classList.add("msg_exibir");
};
const ocultaMsgErroUsuarioRepetido = () => {
    const msgUsuarioInexistente = msgUsuarioEl[0];
    msgUsuarioInexistente.innerHTML = "";
    msgUsuarioInexistente.classList.remove("msg_exibir");
};
const exibeMsgErroUsuarioRepetido = () => {
    const msgUsuarioInexistente = msgUsuarioEl[0];
    msgUsuarioInexistente.innerHTML = objMsgsErro.usuarioRepetido;
    msgUsuarioInexistente.classList.add("msg_exibir");
};
