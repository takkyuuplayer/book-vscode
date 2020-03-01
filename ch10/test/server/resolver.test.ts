import * as resolver from "src/server/resolver";
import { Repository } from "src/model/task/repository";
import { Task } from "src/server/generated/graphql";

let repository: Repository;
beforeEach(() => {
  repository = new Repository();
});

describe("src/server/resolver", () => {
  describe("Query", () => {
    describe("listTasks", () => {
      it("returns all tasks", () => {
        const listTasks = resolver.Query.listTasks as any;
        const tasks = listTasks(
          undefined,
          undefined,
          { repository },
          undefined
        ) as Array<Task>;

        expect(tasks.length).toBe(2);
      });
    });
  });
  describe("Mutation", () => {
    describe("addTask", () => {
      it("should add a task and returns the task with an id", () => {
        const addTask = resolver.Mutation.addTask as any;
        const task = addTask(
          undefined,
          { input: { text: "New Task" } },
          { repository },
          undefined
        );

        expect(repository.ListTasks().length).toBe(3);
        expect(task.id).toBeTruthy();
        expect(task.done).toBe(false);
        expect(task.text).toBe("New Task");
      });
    });
    describe("doneTask", () => {
      it("should mark a task done", () => {
        const doneTask = resolver.Mutation.doneTask as any;
        doneTask(undefined, { id: "1" }, { repository });
        const tasks = repository.ListTasks();

        expect(tasks.length).toBe(1);
        expect(tasks.find(task => task.id === "1")).toBeUndefined();
      });
    });
  });
});
