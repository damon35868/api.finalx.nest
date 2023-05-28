import * as bcrypt from 'bcrypt';

import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  // ObjectIdColumn,
  // ObjectId,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @ObjectIdColumn()
  // _id: ObjectId;

  @Column({ nullable: true })
  name: string;

  @Unique([])
  @Column()
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;

  // 前置执行钩子
  @BeforeInsert()
  @BeforeUpdate()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
