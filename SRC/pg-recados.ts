const usuarioAtual = recuperaDaSessionStorage("usuarioCorrente");
const descricaoEl = document.getElementById("descricao") as HTMLInputElement;
const detalhamentoEl = document.getElementById(
  "detalhamento"
) as HTMLInputElement;
const addRecadoEl = document.getElementById("addRecado") as HTMLInputElement;
const usuarioUsandoAppEl = document.getElementById(
  "usuarioUsandoApp"
) as HTMLHeadingElement;

const alertSucessoEl = document.getElementById(
  "alertSucesso"
) as HTMLDivElement;

const alertPreencherCamposEl = document.getElementById(
  "alertPreencher"
) as HTMLDivElement;

const btnSairEl = document.getElementById("btnSair") as HTMLInputElement;


let acaoEditar: boolean = false;
let indiceParaEditar: number = 0;
let indiceParaExcluir: number = 0;

const validaRecados = () => {
  const descricao = descricaoEl.value;
  const detalhamento = detalhamentoEl.value;

  return descricao !== "" && detalhamento !== "";
};

const limpaInputs = () => {
  descricaoEl.value = "";
  detalhamentoEl.value = "";
};

const criaLinha = (recado: Recado, index: number) => {
  const novaLinha = document.createElement("tr");
  novaLinha.classList.add("align-middle");
  novaLinha.innerHTML = `
        <td data-title="#" class="text-center">${index + 1}</td>
        <td data-title="Descrição">${recado.descricao}</td>
        <td data-title="Detalhamento">${recado.detalhamento}</td>

        <td data-title="Ações" class="text-center">

        <button type="button"class="button red" data-bs-toggle="modal" data-bs-target="#excluirModal" onclick="preparaExclusao(${index})">
          Excluir
        </button>
        <button type="button" onclick="editaRecado(${index})" class="button green">
          Editar
        </button>
      </td>
      `;

  document.querySelector("#tabelaRecados>tbody")?.appendChild(novaLinha);
};

const geraLinhasTabela = () => {
  const listaRecados = recuperaListaRecadosUsuarioAtual();
  listaRecados.forEach(criaLinha);
};

const editaRecado = (index: number) => {
  acaoEditar = true;
  indiceParaEditar = index;
  carregaRecadoNosInputs(index);
};

const recuperaListaRecadosUsuarioAtual = (): Array<Recado> => {
  const listaUsuarios = recuperaDaLocalStorage("usuarios");
  let listaRecados: Array<Recado> = [];
  const posicaoUsuarioNaLista = listaUsuarios.findIndex(
    (us) => us.email === usuarioAtual
  );
  if (posicaoUsuarioNaLista > -1) {
    const objUsuario = listaUsuarios[posicaoUsuarioNaLista];
    listaRecados = objUsuario.recados;
  }
  return listaRecados;
};

const excluiTodasLinhasTabela = () => {
  const linhas = document.querySelectorAll("#tabelaRecados>tbody tr");
  linhas.forEach((linha) => linha.parentNode?.removeChild(linha));
};

const atualizaTabelaNaTela = () => {
  excluiTodasLinhasTabela();
  geraLinhasTabela();
};

const salvarRecado = (evento: Event) => {
  evento.preventDefault();
  const recadosEstaoPreenchidos = validaRecados();
  if (recadosEstaoPreenchidos) {
    const descricao = descricaoEl.value;
    const detalhamento = detalhamentoEl.value;

    const recado = {
      descricao: descricao,
      detalhamento: detalhamento,
    };

    if (!acaoEditar) {
      gravaRecado(recado);
    }
    if (acaoEditar) {
      atualizaRecado(indiceParaEditar);
    }
    limpaInputs();

    exibeOcultaAlert(alertSucessoEl);
  }

  if (!recadosEstaoPreenchidos) {
    exibeOcultaAlert(alertPreencherCamposEl);
  }

  atualizaTabelaNaTela();
  descricaoEl.focus();
};

const atualizaRecado = (indice: number) => {
  const listaUsuarios = recuperaDaLocalStorage("usuarios");
  const posicaoUsuarioNaLista = posicaoUsuarioAtualNaListaUsuarios();
  const listaRecados = recuperaListaRecadosUsuarioAtual();

  const recado = listaRecados[indice];
  recado.descricao = descricaoEl.value;
  recado.detalhamento = detalhamentoEl.value;
  listaRecados[indice] = recado;
  listaUsuarios[posicaoUsuarioNaLista].recados = listaRecados;
  gravaNaLocalStorage("usuarios", listaUsuarios);
  acaoEditar = false;
};

const carregaRecadoNosInputs = (indice: number) => {
  const listaUsuarios = recuperaDaLocalStorage("usuarios");

  const posicaoUsuarioNaLista = posicaoUsuarioAtualNaListaUsuarios();
  if (posicaoUsuarioNaLista >= 0) {
    const listaRecados = listaUsuarios[posicaoUsuarioNaLista].recados;
    const recado = listaRecados[indice];
    descricaoEl.value = recado.descricao;
    detalhamentoEl.value = recado.detalhamento;
    descricaoEl.focus();
  }
};

const preparaExclusao = (indice: number) => (indiceParaExcluir = indice);
const excluirRecado = () => apagaRecado(indiceParaExcluir);

const apagaRecado = (indice: number) => {
  const listaUsuarios = recuperaDaLocalStorage("usuarios");
  const recado = listaUsuarios[indice];

  const posicaoUsuarioNaLista = posicaoUsuarioAtualNaListaUsuarios();

  limparInput(descricaoEl);
  limparInput(detalhamentoEl);

  if (posicaoUsuarioNaLista >= 0) {
    const listaRecados = listaUsuarios[posicaoUsuarioNaLista].recados;
    listaRecados.splice(indice, 1);
    listaUsuarios[posicaoUsuarioNaLista].recados = listaRecados;
    gravaNaLocalStorage("usuarios", listaUsuarios);
  }
  atualizaTabelaNaTela();
  descricaoEl.focus();
  exibeOcultaAlert(alertSucessoEl);
};

const gravaRecado = (recado: Recado) => {
  const listaUsuarios = recuperaDaLocalStorage("usuarios");
  let objUsuario: Usuario;
  const posicaoUsuarioNaLista = posicaoUsuarioAtualNaListaUsuarios();
  if (posicaoUsuarioNaLista > -1) {
    objUsuario = listaUsuarios[posicaoUsuarioNaLista];
    objUsuario.recados.push(recado);
    listaUsuarios[posicaoUsuarioNaLista] = objUsuario;
    gravaNaLocalStorage("usuarios", listaUsuarios);
    limparInput(descricaoEl);
    limparInput(detalhamentoEl);
  }
};

const posicaoUsuarioAtualNaListaUsuarios = () => {
  const listaUsuarios = recuperaDaLocalStorage("usuarios");
  const posicaoUsuarioNaLista = listaUsuarios.findIndex(
    (us) => us.email === usuarioAtual
  );
  return posicaoUsuarioNaLista;
};

const sairAplicacao = () => {
  limpaSessionStorage();
  document.location.href = "./index.html";
};

const exibeOcultaAlert = (alert: HTMLDivElement) => {
  setTimeout(() => {
    alert.classList.toggle("d-none");
  }, 100);

  setTimeout(() => {
    alert.classList.toggle("d-none");
  }, 1200);
};

addRecadoEl.addEventListener("click", salvarRecado);
btnSairEl.addEventListener("click", sairAplicacao);

document.addEventListener("DOMContentLoaded", () => {
  atualizaTabelaNaTela();
  usuarioUsandoAppEl.innerHTML = `${usuarioAtual}`;
  descricaoEl.focus();
});
