# 📌 Sistema de Gerenciamento de Projetos  

## 📖 Visão Geral  
Este projeto tem como objetivo desenvolver um **Sistema de Gerenciamento de Projetos** para a **Secretaria XWZ**, permitindo um controle centralizado dos projetos e suas respectivas tarefas. O sistema possibilita o cadastro, edição e monitoramento dos projetos em execução, bem como suas tarefas associadas.  

## 🚀 Tecnologias Utilizadas  
### Backend  
- **Java 17**  
- **Spring Boot**  
- **Maven**  
- **Banco de Dados PostgreSQL**  

### Frontend  
- **Next.js (React)**  
- **TypeScript**  
- **Tailwind CSS**  

## ⚙️ Configuração do Ambiente  

### Pré-requisitos  
Antes de iniciar, certifique-se de ter instalado:  
- **Java 17+**  
- **Maven**  
- **PostgreSQL**  
- **Node.js e npm (ou yarn)**  

### 🎯 Passos para execução  

#### 🖥️ Backend  
1. Clone o repositório:  
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   cd backend
   ```  
2. Configure o banco de dados PostgreSQL:  
   - Criar um banco de dados chamado `projetos_db`  
   - Atualizar o arquivo `application.properties` com suas credenciais  

3. Compile e execute a aplicação:  
   ```bash
   mvn spring-boot:run
   ```  
4. A API estará disponível em `http://localhost:8080`  

#### 🌐 Frontend  
1. Acesse a pasta do frontend:  
   ```bash
   cd frontend
   ```  
2. Instale as dependências:  
   ```bash
   npm install
   ```  
3. Execute o projeto:  
   ```bash
   npm run dev
   ```  
4. O frontend estará disponível em `http://localhost:3000`  

## 📌 Funcionalidades Implementadas  
✅ Cadastro, edição e remoção de projetos  
✅ Registro de tarefas associadas a cada projeto  
✅ Pesquisa de projetos por nome e status  
✅ Interface moderna e responsiva para visualização dos projetos  
✅ API RESTful para gerenciamento de dados  

## 📌 Estrutura do Banco de Dados  
O banco de dados foi modelado para garantir **integridade referencial e normalização**, contendo tabelas para:  
- **Projetos:** nome, descrição, equipe responsável, status, data de início e término  
- **Tarefas:** título, descrição, responsável, prazo e status  
- **Equipes e responsáveis:** categorias previamente definidas  
