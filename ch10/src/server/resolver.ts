import { QueryResolvers, MutationResolvers } from "./generated/graphql";
import { ITask } from "src/model/task/task";

export const Query: QueryResolvers = {
  listTasks(parent, args, { repository }) {
    return repository.ListTasks().map(task => {
      return {
        id: `${task.id}`,
        text: task.text,
        done: !!task.done
      };
    });
  }
};

export const Mutation: MutationResolvers = {
  addTask(parent, { input: { text } }, { repository }) {
    const newTask: ITask = {
      id: "0",
      text
    };
    const task = repository.AddTask(newTask);
    return {
      id: `${task.id}`,
      text: task.text,
      done: !!task.done
    };
  },
  doneTask(parent, { id }, { repository }) {
    if (repository.DoneTask(id) === undefined) {
      return false;
    }
    return true;
  }
};
