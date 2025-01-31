package secretaria.servidor.service;

import secretaria.servidor.entity.Project;
import secretaria.servidor.entity.Task;
import secretaria.servidor.entity.enums.TaskStatus;
import secretaria.servidor.exception.BusinessException;
import secretaria.servidor.exception.NotFoundException;
import secretaria.servidor.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class TaskService {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Criar tarefa associada a um projeto.
     */
    public Task createTask(Long projectId, Task task) {
        Project project = projectService.findById(projectId);
        task.setProject(project);

        // Regras de negócio, se necessário
        validateTask(task);

        log.info("Criando tarefa '{}' para projeto ID: {}", task.getTitle(), projectId);
        return taskRepository.save(task);
    }

    /**
     * Listar tarefas de um projeto específico.
     */
    public List<Task> listTasksByProject(Long projectId) {
        projectService.findById(projectId); // garante que o projeto existe
        return taskRepository.findAllByProjectId(projectId);
    }

    /**
     * Atualizar tarefa.
     */
    public Task updateTask(Long taskId, Task newData) {
        Task existing = taskRepository.findByIdNative(taskId); // Agora usa Native Query
        if (existing == null) {
            throw new NotFoundException("Tarefa não encontrada para ID: " + taskId);
        }

        existing.setTitle(newData.getTitle());
        existing.setDescription(newData.getDescription());
        existing.setResponsible(newData.getResponsible());
        existing.setDueDays(newData.getDueDays());
        existing.setStatus(newData.getStatus());

        validateTask(existing);
        log.info("Atualizando tarefa ID: {}", taskId);
        return taskRepository.save(existing);
    }


    /**
     * Excluir tarefa.
     */
    public void deleteTask(Long taskId) {
        Task existing = taskRepository.findById(taskId)
                .orElseThrow(() -> new NotFoundException("Tarefa não encontrada para ID: " + taskId));
        log.info("Excluindo tarefa ID: {}", taskId);
        taskRepository.delete(existing);
    }

    /**
     * Atualizar status via query nativa.
     */
    public Task updateStatus(Long taskId, TaskStatus status) {
        Task existing = taskRepository.findById(taskId)
                .orElseThrow(() -> new NotFoundException("Tarefa não encontrada para ID: " + taskId));

        if (status == null) {
            throw new BusinessException("Status inválido.");
        }

        log.info("Atualizando status da tarefa ID: {} para {}", taskId, status);
        taskRepository.updateStatusNative(taskId, status.name());
        existing.setStatus(status);
        return existing;
    }

    /**
     * Validar regras da tarefa (exemplo simples).
     */
    private void validateTask(Task task) {
        if (task.getDueDays() != null && task.getDueDays() < 0) {
            throw new BusinessException("O prazo (dueDays) não pode ser negativo.");
        }
    }

    public Task updateTaskStatus(Long taskId, TaskStatus taskStatus) {
        throw new BusinessException("n era para está aqui.");
    }
}
