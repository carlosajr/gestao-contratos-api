import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("prestadores")
class Prestador {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tipo_pessoa: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Prestador;
