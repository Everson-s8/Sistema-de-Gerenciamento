package secretaria.servidor.entity.enums;

public enum TaskStatus {
    PLANEJADO("Planejado"),
    EM_EXECUCAO("Em execução"),
    ABORTADO("Abortado"),
    FINALIZADO("Finalizado");

    private final String descricao;

    TaskStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}