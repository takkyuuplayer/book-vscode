import { ITask } from "src/model/task/task";
import { Repository } from "src/model/task/repository";

describe("src/model/task/task", () => {
  it("has two records after initialization", () => {
    const repo = new Repository();
    const tasks = repo.ListTasks();

    expect(tasks.length).toBe(2);
  });
  it("should add a new task", () => {
    const repo = new Repository();
    const newTask: ITask = {
      id: 0,
      text: "New Task"
    };
    repo.AddTask(newTask);

    const tasks = repo.ListTasks();

    expect(tasks.length).toBe(3);
    expect(
      tasks.find((task: ITask): boolean => task.text === "New Task")
    ).not.toBeUndefined();
  });
  it("should mark a task done", () => {
    const repo = new Repository();
    repo.DoneTask(1);
    const tasks = repo.ListTasks();

    expect(tasks.length).toBe(1);
    expect(tasks.find((task: ITask): boolean => task.id === 1)).toBeUndefined();
  });
});
