"use strict";
const inputUsuarioEl = document.getElementById("inputCriarUser");
const inputSenhaEl = document.getElementById("inputCriarPassword");
const inputRepetirSenhaEl = document.getElementById("inputRepetirPassword");
const btnCriarContaEl = document.getElementById("btnCriarConta");
const criarUsuario = (event) => {
    event.preventDefault();
    const email = inputUsuarioEl.value.toLowerCase();
    const senha = inputSenhaEl.value;
    const senhaRepetida = inputRepetirSenhaEl.value;
    const emailValido = validaInput(inputUsuarioEl, padraoEmail);
    const senhaValida = validaInput(inputSenhaEl, padraoSenha);
    const camposPreenchidosCorretamente = emailValido && senhaValida && senha === senhaRepetida;
    const usuarioJaExiste = verificaSeUsuarioRepetido();
    ocultaMsgErroUsuarioRepetido();
    exibeMsgsPreenchimentoEmail(inputUsuarioEl);
    exibeMsgsPreenchimentoSenha(inputSenhaEl);
    exibeMsgsPreenchimentoRepetirSenha(inputRepetirSenhaEl);
    if (camposPreenchidosCorretamente && !usuarioJaExiste) {
        const usuario = {
            email: email,
            senha: senha,
            recados: [],
        };
        insereObjetoNaLocalStorage("usuarios", usuario);
        gravaNaSessionStorage("usuarioCorrente", usuario.email.toLowerCase());
        document.location.href = "../public/index.html";
    }
    if (usuarioJaExiste) {
        exibeMsgErroUsuarioRepetido();
    }
};
const verificaSeUsuarioRepetido = () => {
    const listaUsuarios = recuperaDaLocalStorage("usuarios");
    const emailDigitado = inputUsuarioEl.value.toLowerCase();
    const usuarioJaExiste = !!listaUsuarios.find((us) => us.email === emailDigitado);
    return usuarioJaExiste;
};
btnCriarContaEl?.addEventListener("click", criarUsuario);
