package secretaria.servidor.entity.enums;

public enum ProjectStatus {
    PLANEJADO("Planejado"),
    EM_EXECUCAO("Em execução"),
    ABORTADO("Abortado"),
    FINALIZADO("Finalizado");

    private final String descricao;

    ProjectStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
