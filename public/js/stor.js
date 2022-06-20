"use strict";
const gravaNaLocalStorage = (chave, listaParaGravar) => {
    localStorage.setItem(chave, JSON.stringify(listaParaGravar));
};
const recuperaDaLocalStorage = (chave) => {
    return JSON.parse(localStorage.getItem(chave)) ?? [];
};
const insereObjetoNaLocalStorage = (chave, objeto) => {
    const lista = recuperaDaLocalStorage(chave);
    lista.push(objeto);
    gravaNaLocalStorage(chave, lista);
};
const gravaNaSessionStorage = (chave, valor) => {
    sessionStorage.setItem(chave, JSON.stringify(valor));
};
const recuperaDaSessionStorage = (chave) => {
    return JSON.parse(sessionStorage.getItem(chave)) ?? "";
};
const limpaSessionStorage = () => {
    sessionStorage.clear();
};
