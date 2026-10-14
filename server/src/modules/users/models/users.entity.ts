import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RoleTypes {
  Admin = 'Admin',
  Customer = 'Customer',
  Seller = 'Seller',
  Developer = 'Developer',
}

@Entity('users')
export class UsersModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    select: false
  })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleTypes,
    enumName: 'role_types',
    default: RoleTypes.Customer,
  })
  role: RoleTypes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
