export type ProjectStatus =
  | "PLANEJADO"
  | "EM_EXECUCAO"
  | "ABORTADO"
  | "FINALIZADO";
export type TaskStatus = ProjectStatus;
export type TeamResponsible = "ADMFIN" | "ADMPLN" | "ADMAPO";
export type TaskResponsible = "PLO" | "GFU" | "CTB" | "GBP";

export interface Task {
  id: number;
  title: string;
  description?: string;
  responsible: TaskResponsible;
  dueDays: number;
  status: TaskStatus;
  projectId: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  teamResponsible: TeamResponsible;
  status: ProjectStatus;
  tasks: Task[];
}

export interface ProjectFormData extends Omit<Project, "id" | "tasks"> {
  id?: number;
}

export interface TaskFormData extends Omit<Task, "id" | "projectId"> {
  id?: number;
  projectId?: number;
}
