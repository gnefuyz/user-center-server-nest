import { BasicContentEntity } from 'src/core/entities/basic.entity';
import { Column, Entity } from 'typeorm';

export enum UserGender {
  male = 'male',
  female = 'female',
  secret = 'secret',
}

@Entity('user')
export class UserEntity extends BasicContentEntity {
  @Column({ type: 'varchar', length: 16, comment: '账号', unique: true })
  account: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '盐值' })
  salt: string;

  @Column({ type: 'varchar', length: 32, comment: '姓', nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 32, comment: '名', nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 32, comment: '昵称', nullable: true })
  nick_name: string;

  @Column({ default: '', comment: '头像地址', nullable: true })
  thumb_url: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.secret,
    comment: '性别',
  })
  gender: UserGender;
}
