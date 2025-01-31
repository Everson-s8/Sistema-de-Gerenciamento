package secretaria.servidor.dto.mapper;

import secretaria.servidor.dto.TaskDTO;
import secretaria.servidor.entity.Task;
import java.util.List;

public class TaskMapper {

    public static Task toEntity(TaskDTO dto) {
        Task task = new Task();
        task.setId(dto.getId());
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setResponsible(dto.getResponsible());
        task.setDueDays(dto.getDueDays());
        task.setStatus(dto.getStatus());
        return task;
    }

    public static TaskDTO toDTO(Task entity) {
        return TaskDTO.fromEntity(entity);
    }

    public static List<TaskDTO> toListDTO(List<Task> tasks) {
        return tasks.stream().map(TaskDTO::fromEntity).toList();
    }
}
