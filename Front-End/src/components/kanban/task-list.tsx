import React, { useState, useEffect } from "react";
import { Project, Task, TaskStatus } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StatusBadge from "../shared/status-badge";
import { Clock, MoreVertical, Plus, User2, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface TaskListProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onAddTask: (projectId: number) => void;
  onEditTask: (task: Task) => void;
  onUpdateTaskStatus: (
    taskId: number,
    status: TaskStatus,
    projectId: number
  ) => Promise<void>;
  onDeleteTask: (projectId: number, taskId: number) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({
  isOpen,
  onClose,
  project: initialProject,
  onAddTask,
  onEditTask,
  onUpdateTaskStatus,
  onDeleteTask,
}) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(
    initialProject
  );

  useEffect(() => {
    setCurrentProject(initialProject);
  }, [initialProject]);

  const handleUpdateTaskStatus = async (
    taskId: number,
    newStatus: TaskStatus
  ) => {
    if (currentProject) {
      await onUpdateTaskStatus(taskId, newStatus, currentProject.id);
      setCurrentProject({
        ...currentProject,
        tasks: currentProject.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      });
    }
  };

  const handleDeleteTaskLocal = async (projectId: number, taskId: number) => {
    try {
      await onDeleteTask(projectId, taskId);
      if (currentProject) {
        setCurrentProject({
          ...currentProject,
          tasks: currentProject.tasks.filter((task) => task.id !== taskId),
        });
      }
    } catch (error) {
      console.error("Error deleting task locally:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto pr-2 -mr-2 flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Tarefas do Projeto: {currentProject?.name}</span>
            <Button
              size="sm"
              onClick={() => currentProject && onAddTask(currentProject.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
          </DialogTitle>
        </DialogHeader>
        {!currentProject?.tasks?.length ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <p>Nenhuma tarefa cadastrada</p>
            <Button
              variant="link"
              className="mt-2"
              onClick={() => currentProject && onAddTask(currentProject.id)}
            >
              Adicionar primeira tarefa
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {currentProject.tasks.map((task) => (
              <div
                key={task.id}
                className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <StatusBadge status={task.status} />
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    )}
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User2 className="h-4 w-4" />
                        {task.responsible}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {task.dueDays} dias
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onEditTask(task)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar Tarefa
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        disabled={task.status === "PLANEJADO"}
                        onClick={() =>
                          handleUpdateTaskStatus(task.id, "PLANEJADO")
                        }
                      >
                        Marcar como Planejado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={task.status === "EM_EXECUCAO"}
                        onClick={() =>
                          handleUpdateTaskStatus(task.id, "EM_EXECUCAO")
                        }
                      >
                        Marcar como Em Execução
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={task.status === "FINALIZADO"}
                        onClick={() =>
                          handleUpdateTaskStatus(task.id, "FINALIZADO")
                        }
                      >
                        Marcar como Finalizado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={task.status === "ABORTADO"}
                        onClick={() =>
                          handleUpdateTaskStatus(task.id, "ABORTADO")
                        }
                        className="text-red-600"
                      >
                        Marcar como Abortado
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-100"
                        onClick={() =>
                          handleDeleteTaskLocal(currentProject!.id, task.id)
                        }
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir Tarefa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskList;
