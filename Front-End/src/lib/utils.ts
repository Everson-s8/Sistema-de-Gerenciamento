import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formata data para exibição
export function formatDate(date: string | Date): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR");
}

// Calcula o progresso das tarefas
export function calculateTaskProgress(tasks: Task[]): number {
  if (!tasks?.length) return 0;
  const completed = tasks.filter((task) => task.status === "FINALIZADO").length;
  return Math.round((completed / tasks.length) * 100);
}
