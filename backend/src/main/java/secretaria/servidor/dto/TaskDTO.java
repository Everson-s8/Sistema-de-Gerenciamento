package secretaria.servidor.dto;

import secretaria.servidor.entity.Task;
import secretaria.servidor.entity.enums.TaskResponsible;
import secretaria.servidor.entity.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskDTO {

    private Long id;

    @NotBlank(message = "Título da tarefa é obrigatório.")
    private String title;

    private String description;
    private TaskResponsible responsible;
    private Integer dueDays;

    @NotNull(message = "Status da tarefa é obrigatório.")
    private TaskStatus status;

    public static TaskDTO fromEntity(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .responsible(task.getResponsible())
                .dueDays(task.getDueDays())
                .status(task.getStatus())
                .build();
    }
}
