import Category from '@modules/categories/infra/typeorm/entities/Category';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public observation?: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @Column()
  public category_id?: string;

  @Column()
  public difficulty: string;

  @Column()
  public points?: number;

  @Column()
  public quality?: string;

  @Column({type: 'timestamptz'})
  public dueDate: Date;

  @Column()
  public finishedDate?: Date;

  @CreateDateColumn()
  public created_at?: Date;

  @UpdateDateColumn()
  public updated_at?: Date;
}

export default Task;
