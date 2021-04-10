import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTasks1597807100485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isUnique: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'points',
            type: 'decimal',
            precision: 10,
            default: 0,
          },
          {
            name: 'difficulty',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quality',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dueDate',
            type: 'date',
          },
          {
            name: 'finishedDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
