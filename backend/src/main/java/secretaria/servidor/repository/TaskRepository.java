package secretaria.servidor.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import secretaria.servidor.entity.Task;
import secretaria.servidor.entity.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Exemplo de queries nativas para tasks.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query(value = """
           SELECT * 
           FROM task t
           WHERE t.project_id = :projectId
           """, nativeQuery = true)
    List<Task> findAllByProjectId(Long projectId);

    @Query(value = """
           SELECT * 
           FROM task t
           WHERE t.status = :status
           """, nativeQuery = true)
    List<Task> findAllByStatus(String status);

    @Modifying
    @Transactional
    @Query(value = """
       UPDATE task
       SET status = :status
       WHERE id = :taskId
       """, nativeQuery = true)
    void updateStatusNative(Long taskId, String status);

    @Query(value = """
       SELECT * FROM task
       WHERE id = :taskId
       """, nativeQuery = true)
    Task findByIdNative(Long taskId);

}
