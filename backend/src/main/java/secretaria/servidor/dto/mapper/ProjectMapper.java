package secretaria.servidor.dto.mapper;

import secretaria.servidor.dto.ProjectDTO;
import secretaria.servidor.entity.Project;
import java.util.List;

public class ProjectMapper {

    public static Project toEntity(ProjectDTO dto) {
        Project project = new Project();
        project.setId(dto.getId());
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setTeamResponsible(dto.getTeamResponsible());
        project.setStatus(dto.getStatus());
        // As tasks serão tratadas separadamente no service ou com TaskMapper
        return project;
    }

    public static ProjectDTO toDTO(Project entity) {
        return ProjectDTO.fromEntity(entity);
    }

    public static List<ProjectDTO> toListDTO(List<Project> projects) {
        return projects.stream().map(ProjectDTO::fromEntity).toList();
    }
}