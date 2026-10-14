import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

enum RoleTypes {
  Admin = 'Admin',
  Customer = 'Customer',
  Seller = 'Seller',
  Developer = 'Developer'
}

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false
  })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleTypes,
    default: RoleTypes.Customer
  })
  role: RoleTypes 
}
