package secretaria.servidor.dto;

import secretaria.servidor.dto.mapper.TaskMapper;
import secretaria.servidor.entity.Project;
import secretaria.servidor.entity.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {

    private Long id;

    @NotBlank(message = "O nome do projeto é obrigatório.")
    private String name;

    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String teamResponsible;

    @NotNull(message = "O status do projeto é obrigatório.")
    private ProjectStatus status;

    private List<TaskDTO> tasks;

    /**
     * Converter de entidade para DTO.
     */
    public static ProjectDTO fromEntity(Project project) {
        return ProjectDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .teamResponsible(project.getTeamResponsible())
                .status(project.getStatus())
                .tasks(TaskMapper.toListDTO(project.getTasks()))
                .build();
    }
}
