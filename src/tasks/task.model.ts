enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export { Task, TaskStatus };
