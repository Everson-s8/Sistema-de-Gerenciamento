-- Criação da tabela de projetos
CREATE TABLE project (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         start_date DATE,
                         end_date DATE,
                         team_responsible VARCHAR(50) NOT NULL, -- Utiliza o enum: ADMFIN, ADMPLN, ADMAPO
                         status VARCHAR(50) NOT NULL             -- Valores: PLANEJADO, EM_EXECUCAO, ABORTADO, FINALIZADO
);

-- Criação da tabela de tarefas
CREATE TABLE task (
                      id SERIAL PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      description TEXT,
                      responsible VARCHAR(50),                -- Valores: PLO, GFU, CTB, GBP
                      due_days INTEGER,
                      status VARCHAR(50) NOT NULL,             -- Valores: PLANEJADO, EM_EXECUCAO, ABORTADO, FINALIZADO
                      project_id INTEGER REFERENCES project(id) ON DELETE CASCADE
);

-- Inserção de dados iniciais
INSERT INTO project (name, description, start_date, end_date, team_responsible, status)
VALUES
    ('Projeto Alpha', 'Descrição do Projeto Alpha', '2025-01-01', '2025-06-01', 'ADMFIN', 'PLANEJADO'),
    ('Projeto Beta', 'Descrição do Projeto Beta', '2025-02-01', '2025-08-01', 'ADMPLN', 'EM_EXECUCAO');

INSERT INTO task (title, description, responsible, due_days, status, project_id)
VALUES
    ('Tarefa 1', 'Descrição da Tarefa 1', 'PLO', 5, 'PLANEJADO', 1),
    ('Tarefa 2', 'Descrição da Tarefa 2', 'GFU', 3, 'EM_EXECUCAO', 1),
    ('Tarefa 3', 'Descrição da Tarefa 3', 'CTB', 7, 'FINALIZADO', 2);
