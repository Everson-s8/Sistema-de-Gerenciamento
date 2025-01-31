package secretaria.servidor.controller;

import secretaria.servidor.dto.TaskDTO;
import secretaria.servidor.dto.mapper.TaskMapper;
import secretaria.servidor.entity.Task;
import secretaria.servidor.entity.enums.TaskStatus;
import secretaria.servidor.exception.BusinessException;
import secretaria.servidor.service.TaskService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    /**
     * Listar tarefas de um projeto.
     */
    @GetMapping
    public ResponseEntity<List<TaskDTO>> listTasks(@PathVariable Long projectId) {
        List<Task> tasks = taskService.listTasksByProject(projectId);
        return ResponseEntity.ok(TaskMapper.toListDTO(tasks));
    }

    /**
     * Criar tarefa em um projeto.
     */
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@PathVariable Long projectId,
                                              @Valid @RequestBody TaskDTO taskDTO) {
        Task task = TaskMapper.toEntity(taskDTO);
        Task saved = taskService.createTask(projectId, task);
        return ResponseEntity.ok(TaskMapper.toDTO(saved));
    }

    /**
     * Atualizar tarefa.
     */
    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long projectId,
                                              @PathVariable Long taskId,
                                              @Valid @RequestBody TaskDTO taskDTO) {
        Task task = TaskMapper.toEntity(taskDTO);
        Task updated = taskService.updateTask(taskId, task);
        return ResponseEntity.ok(TaskMapper.toDTO(updated));
    }


    /**
     * Excluir tarefa.
     */
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long projectId,
                                           @PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Atualizar status da tarefa (via query nativa).
     */
    @PatchMapping("/{taskId}/status")
    public ResponseEntity<TaskDTO> updateTaskStatus(
            @PathVariable Long projectId,
            @PathVariable Long taskId,
            @RequestParam("status") TaskStatus status
    ) {
        Task updated = taskService.updateStatus(taskId, status);
        return ResponseEntity.ok(TaskMapper.toDTO(updated));
    }

}
