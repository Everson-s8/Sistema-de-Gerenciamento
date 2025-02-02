# 📌 Sistema de Gerenciamento de Projetos

Este repositório, **Sistema-de-Gerenciamento**, contém o código-fonte de um sistema completo para gerenciamento de projetos e tarefas, desenvolvido com tecnologias modernas tanto no backend quanto no frontend. O sistema permite o cadastro, edição, remoção e monitoramento dos projetos, além de gerenciar as tarefas associadas. Ele oferece também uma interface interativa com funcionalidades de *drag & drop* e notificações via *toast*.

---

## 🚀 Tecnologias Utilizadas

### Backend

- **Java 17**
- **Spring Boot**
- **Maven**
- **Banco de Dados PostgreSQL**
- **Queries nativas** para operações específicas

### Frontend

- **Next.js (React)**
- **TypeScript**
- **Tailwind CSS**
- **Componentes UI personalizados** (utilizando Radix UI, Lucide Icons e class-variance-authority)

---

## ⚙️ Pré-requisitos

Antes de executar a aplicação, certifique-se de ter instalado:

- **Java 17+** (ou superior)
- **Maven**
- **PostgreSQL**
- **PGAdmin 4** (recomendado para gerenciar seu banco de dados)
- **Node.js** (com npm ou yarn)

---

## 🖥️ Configuração do Ambiente

### Clonando o Repositório

Abra seu terminal ou Git Bash e clone o repositório com o comando:

```bash
git clone https://github.com/Everson-s8/Sistema-de-Gerenciamento.git
```

### Backend

#### 1. Abrindo o Projeto no IDE:
- Abra sua IDE de Java (por exemplo, IntelliJ IDEA ou Eclipse).
- Selecione a opção para "Open Project" e escolha a pasta `Sistema-de-Gerenciamento/backend`.
- Aguarde o Maven baixar as dependências automaticamente.

**Observação:** Caso as dependências não sejam baixadas automaticamente, você pode forçar o download e a resolução dos *sources* executando:

```bash
mvn clean install -U
```

Isso garantirá que todas as dependências e seus *sources* sejam baixados corretamente.

#### 2. Configuração do Banco de Dados:

- Crie um banco de dados PostgreSQL chamado `projetos_db` usando o PGAdmin 4 ou outro gerenciador de banco.
- Atualize o arquivo `src/main/resources/application.properties` com suas credenciais:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/projetos_db
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
spring.jpa.hibernate.ddl-auto=update
```

**Observação:** O Hibernate pode criar e atualizar as tabelas automaticamente. Se preferir ter um controle manual sobre o schema, utilize o script SQL contido na pasta `sql`. Abra o PGAdmin 4 e execute o arquivo `create_tables.sql` para criar as tabelas e inserir dados iniciais.

#### 3. Execução da Aplicação Backend:

- **Opção 1 – Pela IDE:**
  - Navegue até a classe principal `ProjectManagementApplication` (localizada em `src/main/java/secretaria/servidor/ProjectManagementApplication.java`) e execute-a diretamente pela sua IDE.

- **Opção 2 – Pela Linha de Comando:**

  ```bash
  mvn spring-boot:run
  ```

- A API estará disponível em: [http://localhost:8080](http://localhost:8080)

#### 4. Documentação da API:

Se o Swagger/OpenAPI estiver configurado, acesse: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

### Frontend

#### 1. Abrindo o Projeto no VS Code (ou outra IDE para Node.js):
- Abra a pasta `Sistema-de-Gerenciamento/frontend` no VS Code.

#### 2. Instale as Dependências:

```bash
npm install
```

ou, se preferir o Yarn:

```bash
yarn install
```

#### 3. Execução do Projeto Frontend:

```bash
npm run dev
```

- O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

#### 4. Estrutura do Frontend:

- **Pasta `src/app`**: Contém o layout principal e os estilos globais (Tailwind CSS).
- **Componentes**: Organizados em pastas como `kanban` (para o board, formulários, listagem de tarefas) e `ui` (componentes de interface reutilizáveis).
- **Hooks e Tipos**: Gerenciam o estado e definem as interfaces dos dados (por exemplo, `Project`, `Task`, `ProjectStatus`).

---

## 📌 Funcionalidades Implementadas

### Gerenciamento de Projetos

- Cadastro, edição e remoção de projetos.
- Atualização de status do projeto via drag & drop no Kanban.
- Visualização detalhada dos projetos, com informações de descrição, datas, equipe responsável e progresso das tarefas.

### Gerenciamento de Tarefas

- Inclusão, edição e remoção de tarefas associadas aos projetos.
- Atualização do status das tarefas (Planejado, Em Execução, Abortado, Finalizado).
- Visualização das tarefas em um modal detalhado, com ícones, prazos e responsáveis.

### Filtros e Busca

- Busca dinâmica por nome dos projetos.
- Filtros para refinar a visualização por equipe e por responsável das tarefas.

### Interface Responsiva e Interativa

- Utilização de drag & drop (DnD) para alteração de status.
- Componentes UI customizados para uma experiência moderna e consistente.

### Notificações

- Mensagens de *toast* informam ao usuário sobre o sucesso ou erro nas operações.

---

## 📌 Estrutura do Banco de Dados

### Tabela `project`

- Campos: `id`, `name`, `description`, `start_date`, `end_date`, `team_responsible`, `status`.
- **Observação:** O campo `team_responsible` é mapeado para um enum com os valores permitidos: **ADMFIN, ADMPLN, ADMAPO**.

### Tabela `task`

- Campos: `id`, `title`, `description`, `responsible`, `due_days`, `status`, `project_id`.
- **Observação:** O campo `responsible` permite apenas os valores pré-definidos: **PLO, GFU, CTB, GBP**.

---

## 📌 Endpoints Principais (Backend)

### Projetos

- `GET /api/projects` – Lista todos os projetos.
- `GET /api/projects/{id}` – Detalhes de um projeto específico.
- `POST /api/projects` – Cria um novo projeto.
- `PUT /api/projects/{projectId}` – Atualiza um projeto existente.
- `PATCH /api/projects/{id}/status?status={status}` – Atualiza o status de um projeto.
- `DELETE /api/projects/{projectId}` – Exclui um projeto.

### Tarefas

- `GET /api/projects/{projectId}/tasks` – Lista todas as tarefas de um projeto.
- `POST /api/projects/{projectId}/tasks` – Cria uma nova tarefa para um projeto.
- `PUT /api/projects/{projectId}/tasks/{taskId}` – Atualiza uma tarefa.
- `PATCH /api/projects/{projectId}/tasks/{taskId}/status?status={status}` – Atualiza o status de uma tarefa.
- `DELETE /api/projects/{projectId}/tasks/{taskId}` – Exclui uma tarefa.
