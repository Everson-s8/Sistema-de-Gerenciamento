package secretaria.servidor.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import secretaria.servidor.entity.Project;
import secretaria.servidor.entity.enums.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Exemplo de queries nativas.
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    /**
     * Buscar projetos pelo nome (parte do nome), ignorando caixa.
     */
    @Query(value = """
           SELECT * 
           FROM project p
           WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))
           """, nativeQuery = true)
    List<Project> findByNameContainingIgnoreCase(String name);

    /**
     * Buscar projetos por status (nativo).
     */
    @Query(value = """
           SELECT * 
           FROM project p
           WHERE p.status = :status
           """, nativeQuery = true)
    List<Project> findByStatus(String status);

    /**
     * Buscar todos os projetos finalizados (exemplo).
     */
    @Query(value = """
           SELECT * 
           FROM project p
           WHERE p.status = 'FINALIZADO'
           """, nativeQuery = true)
    List<Project> findAllFinishedProjects();

    /**
     * Exemplo de atualização de status usando query nativa.
     */
    @Modifying
    @Transactional
    @Query(value = """
    UPDATE project
    SET status = :status
    WHERE id = :projectId
    """, nativeQuery = true)
    void updateStatusNative(Long projectId, String status);

    @Modifying
    @Transactional
    @Query(value = """
    UPDATE project
    SET name = :name, description = :description, start_date = :startDate, 
        end_date = :endDate, status = :status
    WHERE id = :projectId
    """, nativeQuery = true)
    void updateProjectNative(Long projectId, String name, String description,
                             LocalDate startDate, LocalDate endDate, String status);

}
