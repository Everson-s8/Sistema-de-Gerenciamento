import React from "react";
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
import { Calendar, Users, AlertCircle } from "lucide-react";
import { ProjectFormData, Project } from "@/types";

interface ProjectFormErrors {
  name?: string;
  teamResponsible?: string;
  endDate?: string;
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  initialData?: Project | null;
  isSubmitting?: boolean;
}

const defaultFormData: ProjectFormData = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  teamResponsible: "ADMFIN",
  status: "PLANEJADO",
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}) => {
  const [formData, setFormData] =
    React.useState<ProjectFormData>(defaultFormData);
  const [errors, setErrors] = React.useState<ProjectFormErrors>({});

  // Reset form when opening/closing or when initialData changes
  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Se tiver dados iniciais, é uma edição
        setFormData({
          ...initialData,
          startDate: initialData.startDate
            ? new Date(initialData.startDate).toISOString().split("T")[0]
            : "",
          endDate: initialData.endDate
            ? new Date(initialData.endDate).toISOString().split("T")[0]
            : "",
        });
      } else {
        // Se não tiver dados iniciais, é uma criação
        setFormData(defaultFormData);
      }
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: ProjectFormErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    if (!formData.teamResponsible) {
      newErrors.teamResponsible = "Equipe responsável é obrigatória";
    }
    if (
      formData.endDate &&
      formData.startDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      newErrors.endDate = "Data de término deve ser posterior à data de início";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = <K extends keyof ProjectFormData>(
    name: K,
    value: ProjectFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpa o erro do campo quando ele é alterado
    if (errors[name as keyof ProjectFormErrors]) {
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
          <DialogTitle>
            {initialData ? "Editar Projeto" : "Novo Projeto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nome do Projeto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Digite o nome do projeto"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <div className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição </Label>{" "}
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Descreva o projeto"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Data de Início
                  </div>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Data de Término
                  </div>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && (
                  <div className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.endDate}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamResponsible">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Equipe Responsável <span className="text-red-500">*</span>
                </div>
              </Label>
              <Select
                value={formData.teamResponsible}
                onValueChange={(value) =>
                  handleChange(
                    "teamResponsible",
                    value as ProjectFormData["teamResponsible"]
                  )
                }
              >
                <SelectTrigger
                  className={errors.teamResponsible ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Selecione a equipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMFIN">ADMFIN</SelectItem>
                  <SelectItem value="ADMPLN">ADMPLN</SelectItem>
                  <SelectItem value="ADMAPO">ADMAPO</SelectItem>
                </SelectContent>
              </Select>
              {errors.teamResponsible && (
                <div className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.teamResponsible}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleChange("status", value as ProjectFormData["status"])
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
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : initialData
                ? "Atualizar"
                : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
