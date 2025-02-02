import React from "react";

interface FiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedTeam: string;
  onTeamChange: (team: string) => void;
  selectedResponsible: string;
  onResponsibleChange: (responsible: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedStatus,
  onStatusChange,
  selectedTeam,
  onTeamChange,
  selectedResponsible,
  onResponsibleChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="status-filter" className="text-sm font-medium">
          Status:
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-md border p-2"
        >
          <option value="">Todos</option>
          <option value="PLANEJADO">Planejado</option>
          <option value="EM_EXECUCAO">Em Execução</option>
          <option value="ABORTADO">Abortado</option>
          <option value="FINALIZADO">Finalizado</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="team-filter" className="text-sm font-medium">
          Equipe:
        </label>
        <select
          id="team-filter"
          value={selectedTeam}
          onChange={(e) => onTeamChange(e.target.value)}
          className="rounded-md border p-2"
        >
          <option value="">Todas</option>
          <option value="ADMFIN">ADMFIN</option>
          <option value="ADMPLN">ADMPLN</option>
          <option value="ADMAPO">ADMAPO</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="responsible-filter" className="text-sm font-medium">
          Responsável:
        </label>
        <select
          id="responsible-filter"
          value={selectedResponsible}
          onChange={(e) => onResponsibleChange(e.target.value)}
          className="rounded-md border p-2"
        >
          <option value="">Todos</option>
          <option value="PLO">PLO</option>
          <option value="GFU">GFU</option>
          <option value="CTB">CTB</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
