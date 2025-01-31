import React from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectCard from "./card";
import { Project, ProjectStatus } from "@/types";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  title: string;
  status: ProjectStatus;
  projects: Project[];
  onAddProject: (status: ProjectStatus) => void;
  onEditProject: (project: Project) => void;
  onAddTask: (projectId: number) => void;
  onViewTasks: (project: Project) => void;
}

interface KanbanBoardProps {
  projects: Project[];
  onAddProject: (status: ProjectStatus) => void;
  onEditProject: (project: Project) => void;
  onAddTask: (projectId: number) => void;
  onViewTasks: (project: Project) => void;
  onUpdateProjectStatus: (projectId: number, newStatus: ProjectStatus) => void;
}

const DroppableColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  projects,
  onAddProject,
  onEditProject,
  onAddTask,
  onViewTasks,
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col min-h-[500px] w-full min-w-[300px] max-w-[350px] rounded-lg border-2"
    >
      <div className="p-3 border-b-2 border-muted flex justify-between items-center">
        <h3 className="font-semibold">{title}</h3>
        <span className="bg-background text-muted-foreground rounded-full px-2 py-1 text-sm">
          {projects.length}
        </span>
      </div>

      <div className="p-2 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEditProject={onEditProject}
              onAddTask={onAddTask}
              onViewTasks={onViewTasks}
            />
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-muted mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => onAddProject(status)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Projeto
        </Button>
      </div>
    </div>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  projects,
  onAddProject,
  onUpdateProjectStatus,
  onEditProject,
  onAddTask,
  onViewTasks,
}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const columns = [
    { status: "PLANEJADO" as ProjectStatus, title: "Planejado" },
    { status: "EM_EXECUCAO" as ProjectStatus, title: "Em Execução" },
    { status: "ABORTADO" as ProjectStatus, title: "Abortado" },
    { status: "FINALIZADO" as ProjectStatus, title: "Finalizado" },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const projectId = Number(active.id);
    const newStatus = over.id as ProjectStatus;

    if (
      newStatus &&
      ["PLANEJADO", "EM_EXECUCAO", "ABORTADO", "FINALIZADO"].includes(newStatus)
    ) {
      onUpdateProjectStatus(projectId, newStatus);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="h-full p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(({ status, title }) => (
            <DroppableColumn
              key={status}
              status={status}
              title={title}
              projects={projects.filter((p) => p.status === status)}
              onAddProject={onAddProject}
              onEditProject={onEditProject}
              onAddTask={onAddTask}
              onViewTasks={onViewTasks}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
