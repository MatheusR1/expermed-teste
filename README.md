# Teste Técnico - Fullstack Developer

## Introdução

Bem-vindo ao teste técnico para a vaga de Fullstack Developer! Este teste foi desenvolvido para avaliar suas habilidades em PHP 8, Laravel Lumen e GraphQL usando Lighthouse, persistência de dados no PostgreSQL, além de testar seu conhecimento com filas e React utilizando Chakra UI e Apollo Client.

### Cenário

Você deverá construir uma aplicação simples de gerenciamento de tarefas. O backend exporá uma API GraphQL, enquanto o frontend será responsável por listar, criar, atualizar e remover tarefas.

## Requisitos do Projeto

### Backend (Laravel Lumen, GraphQL e PostgreSQL)

1. **Criar API GraphQL para gerenciamento de tarefas:**

   - A API deve permitir **listar**, **criar**, **atualizar** e **remover** tarefas.
   - Cada tarefa deve conter os seguintes campos:
     - `id`: ID da tarefa (UUID).
     - `title`: Título da tarefa.
     - `description`: Descrição da tarefa.
     - `status`: Status da tarefa (`pendente`, `concluída`).
     - `created_at`: Data de criação da tarefa.

2. **Armazenamento de dados:**

   - Utilize PostgreSQL para persistência dos dados.

3. **Controle de Sessão:**

   - Implemente um controle de sessão básico, simples e intuitivo. Lembrando que o usuário pode se cadastrar.

4. **Processamento em Filas:**

   - Implemente o envio de um e-mail fictício sempre que uma tarefa for criada, usando uma fila padrão para processar o envio de forma assíncrona.
   - Para o envio de email use as seguintes credenciais
      - `MAIL_MAILER="mailtrap"`
      - `MAILTRAP_HOST="sandbox.api.mailtrap.io"`
      - `MAILTRAP_API_KEY="79e2d42d4a17537afe3b854461083462"`
      - `MAILTRAP_INBOX_ID=3128841`

### Frontend (React com Chakra UI)

1. **Interface de Gerenciamento de Tarefas:**

   - Crie uma página que permita ao usuário visualizar a lista de tarefas, criar novas tarefas e remover tarefas existentes, usando um modelo de Kanban.
   - Utilize o Chakra UI para os componentes de UI (botões, formulários, etc).
   - As tarefas devem ser carregadas via **GraphQL Query** usando **Apollo Client** e as operações de criação e remoção devem ser feitas via **GraphQL Mutations**.

2. **Autenticação:**

   - O usuário deve estar autenticado para acessar a página de tarefas.

## Instruções para Execução

1. **Backend:**

   - Utilize Laravel Lumen com Lighthouse para expor a API GraphQL.
   - Crie as migrations para o banco de dados PostgreSQL.
   - Utilize o sistema de filas para o envio de e-mails.

2. **Frontend:**

   - Utilize React com Chakra UI.
   - Consuma a API GraphQL criada no backend para listar, criar e remover tarefas usando Apollo Client.

### Requisitos Técnicos

#### Backend:
  - PHP 8
  - Laravel Lumen
  - GraphQL (Lighthouse)
  - PostgreSQL
  - Controle de filas nativo do Laravel

#### Frontend:
  - React
  - Chakra UI
  - GraphQL 
  - Apollo Client

## Observações

1. Encorajamos o uso de comentários claros e detalhados (preferencialmente em inglês) para facilitar a compreensão do código.
2. Adote os princípios de Programação Orientada a Objetos (OOP).
3. Utilize padrões de projeto (Design Patterns) quando aplicável para garantir a manutenção e escalabilidade do código.


## Diferenciais

1. Utilizar estrutura de desenvolvimento em docker.
2. Controle de sessões via AWS Cognito.


## O que Buscamos

1. Código limpo, legível e autoexplicativo.
2. Nomenclatura de variáveis, classes e funções coerente e descritiva, refletindo claramente suas responsabilidades e propósitos.

## Instruções de Entrega

1. Faça um **fork** deste repositório.
2. Implemente a solução e faça os commits no seu repositório.
3. Envie o link do seu repositório para revisão.
4. Instruções claras sobre como configurar e rodar a aplicação devem estar no README.

---

Boa Sorte!
