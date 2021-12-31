import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  
  @Entity('transactions')
  export default class UserEntity {
    @ApiProperty({ type: String })
    @PrimaryGeneratedColumn()
    readonly id: number = 1;
  
    @ApiProperty({ type: String, maxLength: 64 })
    @Column({ length: 64 })
    @Index({ unique: true })
    readonly name: string = '';
  
  }
  