export function calcularDiasDesbloqueio(dataEnvio, diasBloqueio) {
  const dataEnvioObj = new Date(dataEnvio);
  const dataAtual = new Date();

  const milissegundosPorDia = 1000 * 60 * 60 * 24;

  const dataDesbloqueio = new Date(
    dataEnvioObj.getTime() + diasBloqueio * milissegundosPorDia
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const diferencaMilissegundos = dataDesbloqueio - dataAtual;

  const diasFaltantes = Math.ceil(diferencaMilissegundos / milissegundosPorDia);

  return diasFaltantes < 0 ? 0 : diasFaltantes;
}
