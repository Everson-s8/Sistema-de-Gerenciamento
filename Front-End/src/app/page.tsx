"use client";

import React, { useState, useEffect } from "react";
import KanbanBoard from "@/components/kanban/board/board";
import ProjectForm from "@/components/kanban/forms/project-form";
import Filters from "@/components/Filters/Filters";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskListOpen, setTaskListOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");
  const [selectedResponsibleFilter, setSelectedResponsibleFilter] = useState("");
  const [selectedTeamFilter, setSelectedTeamFilter] = useState("");
  
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
      setAllProjects(data);
      return data; // Retorna os dados para uso onde necessário
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar projetos",
        description:
          "Não foi possível carregar a lista de projetos. Tente novamente.",
      });
      return []; // Retorna array vazio em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar novo projeto
  const handleAddProject = (initialStatus: ProjectStatus) => {
    const newProject: ProjectFormData = {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      teamResponsible: "ADMFIN",
      status: initialStatus,
    };

    setSelectedProject(null); 
    setProjectFormOpen(true);
  };

  // Função para editar projeto existente
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectFormOpen(true);
  };

  // Função para salvar projeto (novo ou edição)
  const handleSubmitProject = async (formData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const isEditing = selectedProject?.id;
      const url = isEditing
        ? `http://localhost:8080/api/projects/${selectedProject.id}`
        : "http://localhost:8080/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar projeto");
      }

      toast({
        title: isEditing ? "Projeto atualizado" : "Projeto criado",
        description: formData.name,
      });

      await fetchProjects();
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

  const handleAddTask = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project || null);
    setSelectedTask(null);
    setTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    const project = projects.find((p) => p.tasks.some((t) => t.id === task.id));
    setSelectedProject(project || null);
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

      const updatedTask = await response.json();

      const updatedProjects = await fetchProjects();

      const updatedProject = updatedProjects.find(
        (p: Project) => p.id === selectedProject.id
      );
      setSelectedProject(updatedProject || null);

      toast({
        title: `Tarefa ${formData.id ? "atualizada" : "criada"} com sucesso!`,
        description: formData.title,
      });

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

  const handleUpdateTaskStatus = async (
    taskId: number,
    newStatus: ProjectStatus
  ) => {
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

      const updatedProjects = await fetchProjects();

      const updatedProject = updatedProjects.find(
        (p: Project) => p.id === selectedProject.id
      );
      setSelectedProject(updatedProject || null);

      toast({
        title: "Status atualizado",
        description: `Status da tarefa atualizado para ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status da tarefa.",
      });
    }
  };

  const searchProjects = async (name: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/projects/search?name=${encodeURIComponent(name)}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar projetos");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error searching projects:", error);
      toast({
        variant: "destructive",
        title: "Erro na busca",
        description: "Não foi possível buscar os projetos. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchProjects(searchTerm);
      } else {
        fetchProjects();
      }
    }, 500); 
  
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    let filtered = allProjects;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filtro por status
    if (selectedStatusFilter) {
      filtered = filtered.filter(project => project.status === selectedStatusFilter);
    }
  
    // Filtro por equipe responsável
    if (selectedTeamFilter) {
      filtered = filtered.filter(project => project.teamResponsible === selectedTeamFilter);
    }
  
    // Filtro por responsável das tarefas
    if (selectedResponsibleFilter) {
      filtered = filtered.filter(project =>
        project.tasks && project.tasks.some(task => task.responsible === selectedResponsibleFilter)
      );
    }
  
    setProjects(filtered);
  }, [searchTerm, selectedStatusFilter, selectedTeamFilter, selectedResponsibleFilter, allProjects]);


  
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
    <Layout onSearchChange={(value: string) => setSearchTerm(value)}>
    <Filters
      selectedStatus={selectedStatusFilter}
      onStatusChange={setSelectedStatusFilter}
      selectedTeam={selectedTeamFilter}
      onTeamChange={setSelectedTeamFilter}
      selectedResponsible={selectedResponsibleFilter}
      onResponsibleChange={setSelectedResponsibleFilter}
    />
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
        onClose={() => {
          setProjectFormOpen(false);
          setSelectedProject(null);
        }}
        onSubmit={handleSubmitProject}
        initialData={selectedProject}
        isSubmitting={isSubmitting}
      />

      <TaskForm
        isOpen={taskFormOpen}
        onClose={() => {
          setTaskFormOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSubmitTask}
        projectId={selectedProject?.id || 0}
        initialData={selectedTask}
        isSubmitting={isSubmitting}
      />

      <TaskList
        isOpen={taskListOpen}
        onClose={() => {
          setTaskListOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onUpdateTaskStatus={handleUpdateTaskStatus}
      />
    </Layout>
  );
}
