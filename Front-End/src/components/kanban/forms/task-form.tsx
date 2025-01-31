import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, User2, AlertCircle } from "lucide-react";
import StatusBadge from "@/components/shared/status-badge";
import { Task, TaskFormData } from "@/types";

interface TaskFormErrors {
  title?: string;
  responsible?: string;
  dueDays?: string;
}

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  projectId: number;
  initialData?: Partial<Task> | null;
  isSubmitting?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  projectId,
  initialData = {},
  isSubmitting = false,
}) => {
  const [formData, setFormData] = React.useState<TaskFormData>({
    title: "",
    description: "",
    responsible: "PLO",
    dueDays: 1,
    status: "PLANEJADO",
    projectId: projectId,
    ...initialData,
  });

  useEffect(() => {
    if (initialData && initialData.id && initialData.id !== formData.id) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData, formData.id]);
  
  
  const [errors, setErrors] = React.useState<TaskFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: TaskFormErrors = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Título é obrigatório";
    }
    if (!formData.responsible) {
      newErrors.responsible = "Responsável é obrigatório";
    }
    if (!formData.dueDays || formData.dueDays < 1) {
      newErrors.dueDays = "Prazo deve ser maior que zero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        projectId,
        id: initialData?.id || undefined, // Inclui o ID se for edição
      } satisfies TaskFormData;
  
      onSubmit(submitData);
    }
  };
  

  const handleChange = <K extends keyof TaskFormData>(
    name: K,
    value: TaskFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof TaskFormErrors]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{initialData?.id ? "Editar Tarefa" : "Nova Tarefa"}</span>
            {formData.status && <StatusBadge status={formData.status} />}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Título <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Digite o título da tarefa"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <div className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Descreva a tarefa"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsible">
                <div className="flex items-center gap-1">
                  <User2 className="h-4 w-4" />
                  Responsável <span className="text-red-500">*</span>
                </div>
              </Label>
              <Select
                value={formData.responsible}
                onValueChange={(value) =>
                  handleChange(
                    "responsible",
                    value as TaskFormData["responsible"]
                  )
                }
              >
                <SelectTrigger
                  className={errors.responsible ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLO">PLO</SelectItem>
                  <SelectItem value="GFU">GFU</SelectItem>
                  <SelectItem value="CTB">CTB</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
              {errors.responsible && (
                <div className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.responsible}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDays">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Prazo (dias) <span className="text-red-500">*</span>
                </div>
              </Label>
              <Input
                id="dueDays"
                type="number"
                min="1"
                value={formData.dueDays}
                onChange={(e) =>
                  handleChange("dueDays", Number(e.target.value))
                }
                placeholder="Digite o prazo em dias"
                className={errors.dueDays ? "border-red-500" : ""}
              />
              {errors.dueDays && (
                <div className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.dueDays}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleChange("status", value as TaskFormData["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANEJADO">Planejado</SelectItem>
                  <SelectItem value="EM_EXECUCAO">Em Execução</SelectItem>
                  <SelectItem value="ABORTADO">Abortado</SelectItem>
                  <SelectItem value="FINALIZADO">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : initialData?.id
                ? "Atualizar"
                : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
