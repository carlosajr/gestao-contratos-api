export default interface ICreateContratoDTO {
  contrato_id: string;
  prestador_id: string;
  servico_prestado: string;
  data_inicio: Date;
  data_fim: Date;
}
