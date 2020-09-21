function percentualDiasDecorridos(dataInicio, dataFim, diasDecorridos) {
  totalDias = (dataFim.getTime() - dataInicio.getTime()) / (1000 * 3600 * 24);
  percent = 100 - (Math.round(diasDecorridos / totalDias * 100));
  return percent > 100 ? 100 : percent;
}