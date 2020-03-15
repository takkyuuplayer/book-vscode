// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function createCommand(scope: vscode.WorkspaceFolder): vscode.ShellExecution {
  return new vscode.ShellExecution("lll", [".", "--skiplist", "node_modules"], {
    cwd: scope.uri.fsPath
  });
}

async function resolveTask(task: vscode.Task): Promise<vscode.Task> {
  task.execution = createCommand(task.scope as vscode.WorkspaceFolder);
  task.source = "lll";
  task.problemMatchers = ["$lll"];
  return task;
}

async function provideTasks(): Promise<vscode.Task[]> {
  const tasks: vscode.Task[] = [];
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    return tasks;
  }

  for (const workspaceFolder of vscode.workspace.workspaceFolders) {
    const taskDefinition = { type: "lll" };
    let task = new vscode.Task(
      taskDefinition,
      workspaceFolder,
      "lint " + workspaceFolder.name,
      "lll",
      createCommand(workspaceFolder),
      "$lll"
    );
    tasks.push(task);
  }

  return tasks;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.tasks.registerTaskProvider("lll", {
    provideTasks,
    resolveTask
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
