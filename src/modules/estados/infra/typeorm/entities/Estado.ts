import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("estados")
class Estado {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  codigo: number;

  @Column()
  sigla: string;

  @Column()
  nome: string;
}

export default Estado;
