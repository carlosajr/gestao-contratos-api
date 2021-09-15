import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contratos")
class Contrato {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  prestador_id: string;

  @ManyToOne(() => Prestador)
  @JoinColumn({ name: "prestador_id" })
  prestador: Prestador;

  @Column()
  servico_prestado: string;

  @Column()
  data_inicio: Date;

  @Column()
  data_fim: Date;

  @Column()
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Contrato;
