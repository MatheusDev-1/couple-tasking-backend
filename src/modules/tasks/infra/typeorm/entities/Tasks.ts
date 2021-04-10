import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  observation: string;

  @Column()
  category: string;

  @Column()
  difficulty: string;

  @Column()
  points: number;

  @Column()
  quality: string;

  @Column()
  dueDate: Date | string;

  @Column()
  finishedDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
