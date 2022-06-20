const gravaNaLocalStorage = (
    chave: string,
    listaParaGravar: Array<Usuario>
  ): void => {
    localStorage.setItem(chave, JSON.stringify(listaParaGravar));
  };
  
  const recuperaDaLocalStorage = (chave: string): Array<Usuario> => {
    return JSON.parse(localStorage.getItem(chave) as string) ?? [];
  };
  
  const insereObjetoNaLocalStorage = (chave: string, objeto: Usuario) => {
    const lista = recuperaDaLocalStorage(chave);
    lista.push(objeto);
    gravaNaLocalStorage(chave, lista);
  };
  
  const gravaNaSessionStorage = (chave: string, valor: string): void => {
    sessionStorage.setItem(chave, JSON.stringify(valor));
  };
  
  const recuperaDaSessionStorage = (chave: string): string => {
    return JSON.parse(sessionStorage.getItem(chave) as string) ?? "";
  };
  
  const limpaSessionStorage = (): void => {
    sessionStorage.clear();
  };
  