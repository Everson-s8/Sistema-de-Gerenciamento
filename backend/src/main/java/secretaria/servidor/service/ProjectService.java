package secretaria.servidor.service;

import secretaria.servidor.dto.mapper.ProjectMapper;
import secretaria.servidor.dto.mapper.TaskMapper;
import secretaria.servidor.entity.Project;
import secretaria.servidor.entity.Task;
import secretaria.servidor.entity.enums.ProjectStatus;
import secretaria.servidor.exception.BusinessException;
import secretaria.servidor.exception.NotFoundException;
import secretaria.servidor.repository.ProjectRepository;
import secretaria.servidor.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Listar todos os projetos.
     */
    public List<Project> listAll() {
        log.info("Listando todos os projetos...");
        return projectRepository.findAll();
    }

    /**
     * Buscar projeto por ID (lança NotFoundException se não achar).
     */
    public Project findById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Projeto não encontrado para o ID: " + id));
    }

    /**
     * Criar novo projeto.
     */
    public Project create(Project project) {
        // Exemplo de validações de negócio
        validateProjectDates(project);
        validateStatus(project.getStatus());

        log.info("Criando projeto: {}", project.getName());
        return projectRepository.save(project);
    }

    /**
     * Atualizar um projeto existente.
     */
    public Project updateProject(Long projectId, Project newData) {
        Project existing = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Projeto não encontrado para ID: " + projectId));

        existing.setName(newData.getName());
        existing.setDescription(newData.getDescription());
        existing.setStartDate(newData.getStartDate());
        existing.setEndDate(newData.getEndDate());
        existing.setStatus(newData.getStatus());

        log.info("Atualizando projeto ID: {}", projectId);
        return projectRepository.save(existing);
    }


    /**
     * Excluir um projeto.
     */
    public void delete(Long id) {
        Project project = findById(id);
        log.info("Excluindo projeto ID: {}", id);
        projectRepository.delete(project);
    }

    /**
     * Atualizar status via query nativa.
     */
    public Project updateStatus(Long id, ProjectStatus status) {
        // Verifica se projeto existe antes de atualizar
        Project project = findById(id);
        if (status == null) {
            throw new BusinessException("Status inválido.");
        }
        log.info("Atualizando status do projeto ID: {} para {}", id, status);
        projectRepository.updateStatusNative(id, status.name());
        project.setStatus(status);
        return project;
    }

    /**
     * Listar projetos pelo nome (uso de native query).
     */
    public List<Project> findByName(String name) {
        return projectRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * Listar projetos por status (uso de native query).
     */
    public List<Project> findByStatus(ProjectStatus status) {
        return projectRepository.findByStatus(status.name());
    }

    /**
     * Valida datas (exemplo simples).
     */
    private void validateProjectDates(Project project) {
        if (project.getStartDate() != null && project.getEndDate() != null) {
            if (project.getEndDate().isBefore(project.getStartDate())) {
                throw new BusinessException("Data de término não pode ser anterior à data de início.");
            }
        }
        // Exemplo de validação: Não pode iniciar antes de hoje
        if (project.getStartDate() != null && project.getStartDate().isBefore(LocalDate.now())) {
            log.warn("O projeto está começando antes de hoje, verifique se isto é esperado.");
        }
    }

    /**
     * Valida o status do projeto (poderíamos ter regras de transição de status).
     */
    private void validateStatus(ProjectStatus status) {
        if (status == null) {
            throw new BusinessException("Status do projeto não pode ser nulo.");
        }
        // Exemplo de regras de status...
    }
}
