package secretaria.servidor.entity;

import secretaria.servidor.entity.enums.ProjectStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do projeto é obrigatório.")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    /**
     * Aqui poderia ser um enum TeamResponsible ou mesmo String, de acordo com a necessidade.
     * Se quiser Enum, crie e use @Enumerated(EnumType.STRING). Exemplo:
     *
     * @Enumerated(EnumType.STRING)
     * private TeamResponsible teamResponsible;
     */
    @Column(name = "team_responsible")
    private String teamResponsible;

    @NotNull(message = "Status do projeto é obrigatório.")
    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();
}
