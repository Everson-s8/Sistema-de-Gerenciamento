export const PROJECT_STATUS = {
  PLANEJADO: "Planejado",
  EM_EXECUCAO: "Em Execução",
  ABORTADO: "Abortado",
  FINALIZADO: "Finalizado",
} as const;

export const TASK_STATUS = {
  PLANEJADO: "Planejado",
  EM_EXECUCAO: "Em Execução",
  ABORTADO: "Abortado",
  FINALIZADO: "Finalizado",
} as const;

export const TEAM_RESPONSIBLE = {
  ADMFIN: "ADMFIN",
  ADMPLN: "ADMPLN",
  ADMAPO: "ADMAPO",
} as const;

export const TASK_RESPONSIBLE = {
  PLO: "PLO",
  GFU: "GFU",
  CTB: "CTB",
  GBP: "GBP",
} as const;

export type ProjectStatus = keyof typeof PROJECT_STATUS;
export type TaskStatus = keyof typeof TASK_STATUS;
export type TeamResponsible = keyof typeof TEAM_RESPONSIBLE;
export type TaskResponsible = keyof typeof TASK_RESPONSIBLE;
