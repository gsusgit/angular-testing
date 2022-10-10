export interface Task {
  name: string;
  description?: string;
  done: boolean;
  id: string;
  userId?: string;
  projectId?: string;
}
