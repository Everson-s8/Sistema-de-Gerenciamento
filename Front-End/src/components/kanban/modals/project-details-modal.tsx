import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/shared/status-badge";
import {
  Calendar,
  Users,
  ClipboardList,
  User2,
  Clock,
  Pencil,
  MoreVertical,
  PlusCircle,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Project, Task, TaskStatus } from "@/types";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onEditProject: (project: Project) => void;
  onAddTask: (projectId: number) => void;
  onEditTask: (task: Task) => void;
  onViewTasks: (project: Project) => void;
  onUpdateTaskStatus: (
    taskId: number,
    status: TaskStatus,
    projectId: number
  ) => Promise<void>;
  onDeleteProject: (projectId: number) => Promise<void>;
  onDeleteTask: (projectId: number, taskId: number) => Promise<void>;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  project,
  onEditProject,
  onAddTask,
  onEditTask,
  onViewTasks,
  onUpdateTaskStatus,
  onDeleteProject,
  onDeleteTask,
}) => {
  if (!project) return null;

  const handleDelete = async () => {
    await onDeleteProject(project.id);
    onClose();
  };

  const completedTasks =
    project.tasks?.filter((task) => task.status === "FINALIZADO").length || 0;
  const totalTasks = project.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => onEditProject(project)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar Projeto
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir Projeto
                  </Button>
                </div>
              </div>
              <StatusBadge status={project.status} />
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 p-1">
          {/* Seção  Projetos */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Detalhes do Projeto</h3>
            <p className="text-muted-foreground">{project.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Início: {new Date(project.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Término:{" "}
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : "Não definido"}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                <span>Equipe: {project.teamResponsible}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ClipboardList className="h-4 w-4 mr-2" />
                <span>
                  {completedTasks} de {totalTasks} tarefas concluídas
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progresso Geral</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </section>

          {/* Seção tasks */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tarefas</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddTask(project.id)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova Tarefa
              </Button>
            </div>

            <div className="space-y-3">
              {project.tasks.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma tarefa cadastrada
                </p>
              ) : (
                project.tasks.map((task: Task) => (
                  <Card
                    key={task.id}
                    className="hover:bg-muted/50 transition-colors group"
                  >
                    <CardContent className="p-4 space-y-2">
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
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
                                onUpdateTaskStatus(
                                  task.id,
                                  "PLANEJADO",
                                  project.id
                                )
                              }
                            >
                              Marcar como Planejado
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={task.status === "EM_EXECUCAO"}
                              onClick={() =>
                                onUpdateTaskStatus(
                                  task.id,
                                  "EM_EXECUCAO",
                                  project.id
                                )
                              }
                            >
                              Marcar como Em Execução
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={task.status === "FINALIZADO"}
                              onClick={() =>
                                onUpdateTaskStatus(
                                  task.id,
                                  "FINALIZADO",
                                  project.id
                                )
                              }
                            >
                              Marcar como Finalizado
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={task.status === "ABORTADO"}
                              onClick={() =>
                                onUpdateTaskStatus(
                                  task.id,
                                  "ABORTADO",
                                  project.id
                                )
                              }
                              className="text-red-600"
                            >
                              Marcar como Abortado
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600 focus:bg-red-100"
                              onClick={() => onDeleteTask(project.id, task.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir Tarefa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
