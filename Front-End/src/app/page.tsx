"use client";

import React, { useState, useEffect } from "react";
import KanbanBoard from "@/components/kanban/board/board";
import ProjectForm from "@/components/kanban/forms/project-form";
import TaskForm from "@/components/kanban/forms/task-form";
import TaskList from "@/components/kanban/task-list";
import Layout from "@/components/layout/layout";
import { useToast } from "@/hooks/use-toast";
import {
  Project,
  Task,
  ProjectStatus,
  ProjectFormData,
  TaskFormData,
} from "@/types";

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskListOpen, setTaskListOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/projects");
      if (!response.ok) {
        throw new Error("Erro ao carregar projetos");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar projetos",
        description:
          "Não foi possível carregar a lista de projetos. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = (initialStatus: ProjectStatus) => {
    setSelectedProject({ status: initialStatus } as Project);
    setProjectFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project); // Puxa os dados do projeto
    setProjectFormOpen(true);
  };
  

  const handleAddTask = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project || null);
    setSelectedTask(null);
    setTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task); 
    setTaskFormOpen(true);
  };
  
  

  const handleViewTasks = (project: Project) => {
    setSelectedProject(project);
    setTaskListOpen(true);
  };

  const handleUpdateProjectStatus = async (
    projectId: number,
    newStatus: ProjectStatus
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/projects/${projectId}/status?status=${newStatus}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      toast({
        title: "Status atualizado",
        description: `Status do projeto atualizado para ${newStatus}`,
      });

      await fetchProjects();
    } catch (error) {
      console.error("Error updating project status:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status do projeto.",
      });
    }
  };

  const handleSubmitProject = async (formData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      if (!formData.id) {
        throw new Error("ID do projeto ausente. Algo está errado!");
      }
  
      const url = `http://localhost:8080/api/projects/${formData.id}`;
      const method = formData.id ? "PUT" : "POST"; // Garante que "PUT" seja usado na edição
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao salvar projeto");
      }
  
      toast({
        title: `Projeto ${formData.id ? "atualizado" : "criado"} com sucesso!`,
        description: formData.name,
      });
  
      await fetchProjects(); // Atualiza os projetos na tela
      setProjectFormOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar projeto",
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  useEffect(() => {
    if (selectedProject) {
      setSelectedProject(
        projects.find((p) => p.id === selectedProject.id) || null
      );
    }
  }, [projects]);
  

  const handleSubmitTask = async (formData: TaskFormData) => {
    setIsSubmitting(true);
    try {
      if (!selectedProject?.id) {
        throw new Error("Projeto não selecionado");
      }
  
      const url = formData.id
        ? `http://localhost:8080/api/projects/${selectedProject.id}/tasks/${formData.id}`
        : `http://localhost:8080/api/projects/${selectedProject.id}/tasks`;
  
      const method = formData.id ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao salvar tarefa");
      }
  
      toast({
        title: `Tarefa ${formData.id ? "atualizada" : "criada"} com sucesso!`,
        description: formData.title,
      });
  
      // ✅ Atualiza a lista de tarefas no estado global sem precisar de F5
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === selectedProject.id
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === formData.id ? { ...task, ...formData } : task
                ),
              }
            : project
        )
      );
  
      setTaskFormOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar tarefa",
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedProject) {
      setSelectedProject(
        projects.find((p) => p.id === selectedProject.id) || null
      );
    }
  }, [projects]);
  
  
  
  const handleUpdateTaskStatus = async (taskId: number, newStatus: ProjectStatus) => {
    try {
      if (!selectedProject?.id) {
        throw new Error("Projeto não selecionado");
      }
  
      const response = await fetch(
        `http://localhost:8080/api/projects/${selectedProject.id}/tasks/${taskId}/status?status=${newStatus}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar status");
      }
  
      toast({
        title: "Status atualizado",
        description: `Status da tarefa atualizado para ${newStatus}`,
      });
  
      // 🔥 Atualiza a tarefa no estado do projeto sem precisar de F5
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === selectedProject.id
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === taskId ? { ...task, status: newStatus } : task
                ),
              }
            : project
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status da tarefa.",
      });
    }
  };
  
  


  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  

  return (
    <Layout>
      <KanbanBoard
        projects={projects}
        onAddProject={handleAddProject}
        onEditProject={handleEditProject}
        onAddTask={handleAddTask}
        onViewTasks={handleViewTasks}
        onUpdateProjectStatus={handleUpdateProjectStatus}
      />

        <ProjectForm
          isOpen={projectFormOpen}
          onClose={() => setProjectFormOpen(false)}
          onSubmit={handleSubmitProject}
          initialData={selectedProject || undefined}
          isSubmitting={isSubmitting}
        />


      <TaskForm
        isOpen={taskFormOpen}
        onClose={() => setTaskFormOpen(false)}
        onSubmit={handleSubmitTask}
        projectId={selectedProject?.id || 0}
        initialData={selectedTask || undefined}
        isSubmitting={isSubmitting}
      />

      <TaskList
        isOpen={taskListOpen}
        onClose={() => setTaskListOpen(false)}
        project={selectedProject}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}  // ✅ Adicionado corretamente
        onUpdateTaskStatus={handleUpdateTaskStatus}  // ✅ Adicionado corretamente
      />

    </Layout>
  );
}
