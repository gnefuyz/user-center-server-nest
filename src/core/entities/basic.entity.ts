import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BasicContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  update_time: Date;
}
