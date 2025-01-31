import React from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/shared/status-badge";
import {
  Calendar,
  Users,
  MoreVertical,
  PlusCircle,
  ClipboardList,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onEditProject: (project: Project) => void;
  onAddTask: (projectId: number) => void;
  onViewTasks: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEditProject,
  onAddTask,
  onViewTasks,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: project.id.toString(),
      data: project,
    });

  const cardStyle: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 999 : undefined,
    position: isDragging ? "relative" : undefined,
    pointerEvents: isDragging ? "auto" : undefined,
  };

  const completedTasks =
    project.tasks?.filter((task) => task.status === "FINALIZADO").length || 0;
  const totalTasks = project.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div ref={setNodeRef} style={cardStyle} {...attributes} {...listeners}>
      <Card className="w-full mb-4 hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {project.name}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditProject(project)}>
                  Editar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddTask(project.id)}>
                  Adicionar Tarefa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewTasks(project)}>
                  Ver Tarefas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <StatusBadge status={project.status} />
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>{project.teamResponsible}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {totalTasks > 0 && (
            <div className="flex items-center text-sm text-muted-foreground">
              <ClipboardList className="h-4 w-4 mr-2" />
              <span>
                {completedTasks} de {totalTasks} tarefas concluídas
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-4">
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onAddTask(project.id)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Tarefa
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
