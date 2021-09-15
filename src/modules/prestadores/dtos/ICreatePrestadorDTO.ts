export default interface ICreatePrestadorDTO {
  id?: string;
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome: string;
  email: string;
  cep: string;
  endereco: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}
