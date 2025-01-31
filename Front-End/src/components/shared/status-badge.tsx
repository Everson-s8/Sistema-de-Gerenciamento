import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  PlayCircle,
  XCircle,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

type ProjectOrTaskStatus =
  | "PLANEJADO"
  | "EM_EXECUCAO"
  | "ABORTADO"
  | "FINALIZADO";

interface StatusConfig {
  label: string;
  color: string;
  icon: LucideIcon;
}

type StatusConfigMap = {
  [K in ProjectOrTaskStatus]: StatusConfig;
};

const statusConfig: StatusConfigMap = {
  PLANEJADO: {
    label: "Planejado",
    color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
    icon: Clock,
  },
  EM_EXECUCAO: {
    label: "Em Execução",
    color:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200",
    icon: PlayCircle,
  },
  ABORTADO: {
    label: "Abortado",
    color: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200",
    icon: XCircle,
  },
  FINALIZADO: {
    label: "Finalizado",
    color: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200",
    icon: CheckCircle,
  },
};

interface StatusBadgeProps {
  status: ProjectOrTaskStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="secondary"
      className={`${config.color} flex items-center gap-1 px-2 py-1`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </Badge>
  );
};

export default StatusBadge;
