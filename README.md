Segue abaixo um exemplo de README.md melhorado, unificando as informações do backend e frontend, sem as seções de licença, contribuição ou testes:

---

```markdown
# 📌 Sistema de Gerenciamento de Projetos

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot**
- **Maven**
- **Banco de Dados PostgreSQL**
- **Utilização de queries nativas** para operações específicas

### Frontend
- **Next.js (React)**
- **TypeScript**
- **Tailwind CSS**
- **Componentes UI personalizados** (utilizando Radix UI, Lucide Icons e class-variance-authority)

---

## ⚙️ Pré-requisitos

Antes de executar a aplicação, certifique-se de ter instalado:
- **Java 17+**
- **Maven**
- **PostgreSQL**
- **Node.js** (com npm ou yarn)

---

## 🖥️ Configuração do Ambiente

### Backend

1. **Clone o repositório e acesse a pasta do backend:**
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   cd SEU_REPOSITORIO/backend
   ```

2. **Configuração do Banco de Dados:**
   - Crie um banco de dados PostgreSQL chamado `projetos_db`.
   - Atualize o arquivo `src/main/resources/application.properties` com as credenciais do seu banco de dados:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/projetos_db
     spring.datasource.username=SEU_USUARIO
     spring.datasource.password=SUA_SENHA
     spring.jpa.hibernate.ddl-auto=update
     ```
     > _Obs.: O `ddl-auto=update` pode ser utilizado em ambiente de desenvolvimento para criar/atualizar as tabelas automaticamente._

3. **Execução da Aplicação Backend:**
   ```bash
   mvn spring-boot:run
   ```
   A API estará disponível em: [http://localhost:8080](http://localhost:8080)

4. **Documentação da API:**
   Se o Swagger/OpenAPI estiver configurado, acesse:  
   [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

5. **Scripts SQL:**
   Uma pasta `sql` contém os scripts de criação das tabelas e inserção de dados iniciais.  
   Por exemplo, o arquivo `sql/create_tables.sql`:
   ```sql
   -- Criação da tabela de projetos
   CREATE TABLE project (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       start_date DATE,
       end_date DATE,
       team_responsible VARCHAR(50) NOT NULL, -- Valores: ADMFIN, ADMPLN, ADMAPO
       status VARCHAR(50) NOT NULL            -- Valores: PLANEJADO, EM_EXECUCAO, ABORTADO, FINALIZADO
   );

   -- Criação da tabela de tarefas
   CREATE TABLE task (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       responsible VARCHAR(50),               -- Valores: PLO, GFU, CTB, GBP
       due_days INTEGER,
       status VARCHAR(50) NOT NULL,            -- Valores: PLANEJADO, EM_EXECUCAO, ABORTADO, FINALIZADO
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
   ```

---

### Frontend

1. **Clone o repositório (caso não esteja na mesma pasta) e acesse a pasta do frontend:**
   ```bash
   cd SEU_REPOSITORIO/frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou, se preferir o yarn:
   ```bash
   yarn install
   ```

3. **Execução do Projeto Frontend:**
   ```bash
   npm run dev
   ```
   O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

4. **Estrutura do Frontend:**
   - **Pasta `src/app`:** Contém o layout principal e o arquivo de estilos globais com Tailwind CSS.
   - **Componentes:** Organizados em pastas como `kanban` (para o board, formulários, listagem de tarefas) e `ui` (componentes de interface reutilizáveis como Botões, Cards, Dialogs, etc).
   - **Hooks e Tipos:** São utilizados para gerenciar o estado e definir as interfaces dos dados (por exemplo, `Project`, `Task`, `ProjectStatus`).

---

## 📌 Funcionalidades Implementadas

- **Gerenciamento de Projetos:**
  - Cadastro, edição e remoção de projetos.
  - Atualização de status do projeto via drag & drop no Kanban.
  - Visualização detalhada do projeto, com informações de descrição, datas, equipe responsável e progresso das tarefas.

- **Gerenciamento de Tarefas:**
  - Inclusão, edição e remoção de tarefas associadas aos projetos.
  - Atualização do status das tarefas (Planejado, Em Execução, Abortado, Finalizado).
  - Visualização das tarefas em um modal detalhado, com ícones, prazos e responsáveis.

- **Interface Responsiva e Interativa:**
  - Utilização do DnD (drag and drop) para mudança de status dos projetos.
  - Componentes UI customizados para uma experiência moderna e consistente.

- **Notificações:**
  - Mensagens de _toast_ informam ao usuário sobre o sucesso ou erro nas operações de cadastro, edição e atualização.

---

## 📌 Estrutura do Banco de Dados

- **Tabela `project`:**
  - Campos: `id`, `name`, `description`, `start_date`, `end_date`, `team_responsible`, `status`.
  - **Observação:** O campo `team_responsible` é mapeado para um enum com valores permitidos: **ADMFIN, ADMPLN, ADMAPO**.

- **Tabela `task`:**
  - Campos: `id`, `title`, `description`, `responsible`, `due_days`, `status`, `project_id`.
  - **Observação:** O campo `responsible` permite apenas valores pré-definidos: **PLO, GFU, CTB, GBP**.

---

## 📌 Endpoints Principais (Backend)

- **Projetos:**
  - `GET /api/projects` – Lista todos os projetos.
  - `GET /api/projects/{id}` – Detalhes de um projeto específico.
  - `POST /api/projects` – Cria um novo projeto.
  - `PUT /api/projects/{projectId}` – Atualiza um projeto existente.
  - `PATCH /api/projects/{id}/status?status={status}` – Atualiza o status de um projeto.

- **Tarefas:**
  - `GET /api/projects/{projectId}/tasks` – Lista todas as tarefas de um projeto.
  - `POST /api/projects/{projectId}/tasks` – Cria uma nova tarefa para um projeto.
  - `PUT /api/projects/{projectId}/tasks/{taskId}` – Atualiza uma tarefa.
  - `PATCH /api/projects/{projectId}/tasks/{taskId}/status?status={status}` – Atualiza o status de uma tarefa.
  - `DELETE /api/projects/{projectId}/tasks/{taskId}` – Exclui uma tarefa.
