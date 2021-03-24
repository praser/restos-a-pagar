export interface ILoteDesbloqueio {
  id: number;
  created_at: string;
  updated_at?: string;
  sequencial: number;
  ano: number;
  ce: string;
  responsavelId: string;
  responsavelNome: string;
  responsavelUnidadeId: number;
  responsavelUnidadeSigla: string;
  situacao: string;
  liminarId?: number;
  filePath?: string;
  checksum?: string;
  empenhos: number;
}
