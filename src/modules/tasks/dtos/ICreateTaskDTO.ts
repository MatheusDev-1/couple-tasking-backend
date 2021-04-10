export default interface ICreateTaskDTO {
  name: string;
  observation?: string;
  category?: string;
  difficulty: string;
  dueDate: Date;
}
