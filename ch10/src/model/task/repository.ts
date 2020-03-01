import { ITask } from "./task";

export class Repository {
  private tasks: ITask[];
  constructor() {
    this.tasks = [
      {
        id: "1",
        text: "task1",
        done: false
      },
      {
        id: "2",
        text: "task2",
        done: false
      }
    ];
  }
  public AddTask(task: ITask): ITask {
    if (task.done === undefined) {
      task.done = false;
    }
    task.id = `${parseInt(this.tasks[this.tasks.length - 1].id) + 1}`;
    this.tasks.push(task);
    return task;
  }
  public ListTasks(): ITask[] {
    return this.tasks.filter(task => !task.done);
  }
  public DoneTask(id: string): string | undefined {
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.done = true;
        return id;
      }
    });
    return undefined;
  }
}
