package secretaria.servidor.controller;

import secretaria.servidor.dto.ProjectDTO;
import secretaria.servidor.dto.mapper.ProjectMapper;
import secretaria.servidor.entity.Project;
import secretaria.servidor.entity.enums.ProjectStatus;
import secretaria.servidor.exception.BusinessException;
import secretaria.servidor.service.ProjectService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    /**
     * Listar todos os projetos.
     */
    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<Project> projects = projectService.listAll();
        return ResponseEntity.ok(ProjectMapper.toListDTO(projects));
    }

    /**
     * Buscar projeto por ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        Project project = projectService.findById(id);
        return ResponseEntity.ok(ProjectMapper.toDTO(project));
    }

    /**
     * Criar novo projeto.
     */
    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody @Valid ProjectDTO projectDTO) {
        Project project = ProjectMapper.toEntity(projectDTO);
        Project saved = projectService.create(project);
        return ResponseEntity.ok(ProjectMapper.toDTO(saved));
    }

    /**
     * Atualizar projeto.
     */
    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> updateProject(
            @PathVariable Long projectId,
            @Valid @RequestBody ProjectDTO projectDTO) {

        Project updatedProject = projectService.updateProject(projectId, ProjectMapper.toEntity(projectDTO));
        return ResponseEntity.ok(ProjectMapper.toDTO(updatedProject));
    }


    /**
     * Excluir projeto.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Atualizar status do projeto (via query nativa).
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ProjectDTO> updateProjectStatus(
            @PathVariable Long id,
            @RequestParam("status") String status
    ) {
        try {
            ProjectStatus projectStatus = ProjectStatus.valueOf(status);
            Project updated = projectService.updateStatus(id, projectStatus);
            return ResponseEntity.ok(ProjectMapper.toDTO(updated));
        } catch (IllegalArgumentException e) {
            throw new BusinessException("Status inválido: " + status);
        }
    }

    /**
     * Buscar projetos por nome (exemplo).
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProjectDTO>> searchByName(@RequestParam("name") String name) {
        List<Project> projects = projectService.findByName(name);
        return ResponseEntity.ok(ProjectMapper.toListDTO(projects));
    }

    /**
     * Buscar projetos por status (exemplo).
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProjectDTO>> searchByStatus(@PathVariable("status") ProjectStatus status) {
        List<Project> projects = projectService.findByStatus(status);
        return ResponseEntity.ok(ProjectMapper.toListDTO(projects));
    }
}
