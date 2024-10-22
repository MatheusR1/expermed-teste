# Projeto Laravel com Docker

Este projeto é uma aplicação Laravel configurada para ser executada em contêineres Docker utilizando o Laravel Sail. A configuração inclui serviços para o Laravel, MySQL, Redis e Mailpit.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Laravel Sail](https://laravel.com/docs/8.x/sail)

## Estrutura do Docker Compose

O arquivo `docker-compose.yml` define os seguintes serviços:

### 1. Laravel

- **Imagem**: `sail-8.3/app`
- **Portas**: 8067 (para acessar o Laravel) e 5173 (para o Vite)
- **Volumes**: O código-fonte local é montado em `/var/www/html`
- **Ambiente**:
  - `WWWUSER`: ID do usuário do contêiner
  - `LARAVEL_SAIL`: Ativado para permitir a configuração do Sail
  - `XDEBUG_MODE`: Configuração do Xdebug
  - `XDEBUG_CONFIG`: Configurações do cliente do Xdebug
- **Dependências**: Depende dos serviços MySQL, Redis e Mailpit.

### 2. MySQL

- **Imagem**: `mysql/mysql-server:8.0`
- **Portas**: 3307 (para acessar o MySQL)
- **Volumes**: Persistência de dados em `sail-mysql`
- **Ambiente**:
  - `MYSQL_ROOT_PASSWORD`: Senha do root do MySQL
  - `MYSQL_DATABASE`: Nome do banco de dados
  - `MYSQL_USER`: Nome do usuário do MySQL
  - `MYSQL_PASSWORD`: Senha do usuário do MySQL

### 3. Redis

- **Imagem**: `redis:alpine`
- **Portas**: 6379 (para acessar o Redis)
- **Volumes**: Persistência de dados em `sail-redis`

### 4. Mailpit

- **Imagem**: `axllent/mailpit:latest`
- **Portas**: 1025 (para capturar e-mails) e 8026 (para o dashboard do Mailpit)

## Configuração

1. **Clone o repositório**:

   ```bash
   git clone <URL-do-repositório>
   cd <nome-do-repositório>


1. **Executar os contêineres**:

   ```bash
    ./vendor/bin/sail up
    ./vendor/bin/sail up -d


## Acessando a Aplicação
Laravel: http://localhost:8067
Acesse a aplicação Laravel através deste URL.

MySQL: Acesse pelo cliente de sua preferência em localhost:3307.

Redis: Acesse pelo cliente de sua preferência em localhost:6379.

Mailpit: http://localhost:8026 para o dashboard e use localhost:1025 para capturar e-mails.
