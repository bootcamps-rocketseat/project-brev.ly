<h3 align="center">
  Desafio Prático: Brev.ly
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/bootcamps-rocketseat/project-brev.ly?color=%5965E0">

  <a href="https://www.linkedin.com/in/franciscojunior10/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-franciscojunior10-%5965E0">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/bootcamps-rocketseat/project-brev.ly?color=Y65E0">

  <a href="https://github.com/bootcamps-rocketseat/project-brev.ly/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/bootcamps-rocketseat/project-brev.ly?color=%5965E0">
  </a>

  <a href="https://github.com/bootcamps-rocketseat/project-brev.ly/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/bootcamps-rocketseat/project-brev.ly?color=%5965E0">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/bootcamps-rocketseat/project-brev.ly?color=Y65E0=%5965E0">

   <a href="https://github.com/bootcamps-rocketseat/project-brev.ly/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/bootcamps-rocketseat/project-brev.ly?color=%5965E0">
  </a>
</p>

<p align="center">
  <a href="#sobre-o-projeto-open_file_folder">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação-e-uso-desktop_computer">Instalação e uso</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias-hammer_and_wrench">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades-white_check_mark">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença-memo">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#autor-man_technologist">Autor</a>
</p>

## Demonstração :video_camera::

https://github.com/user-attachments/assets/7ffa78cb-8f76-4f7e-8e38-c8ff2347b17c

## Sobre o projeto :open_file_folder::

Aplicação FullStack de encurtador de URLs desenvolvida para permitir o cadastro, listagem e remoção de links encurtados, além do redirecionamento automático para a URL original e geração de relatórios de acesso para cada link.

## Instalação e uso :desktop_computer::

**Clone o projeto e acesse a pasta**

###### Clonar projeto

```bash
git clone https://github.com/bootcamps-rocketseat/project-brev.ly.git
```

###### Abre pasta

```bash
cd project-brev.ly
```

**Siga as etapas abaixo para instalar e executar o server**

###### Abri a pasta

```bash
cd server
```

###### Instalar dependências

```bash
pnpm i
```

###### Criar o .env e preencher as variaveis

```bash
cp .env.example .env
```

###### Preencher as variaveis de ambiente

```bash
PORT=
DATABASE_URL=
NODE_ENV=

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
FRONTEND_URL=""
```

###### Executar o docker compose

```bash
docker compose up -d --build
```

###### Executar as migrations

```bash
pnpm run db:migrate
```

###### Rodar a api

```bash
pnpm run dev
```

**Siga as etapas abaixo para executar os testes no server**

###### Executar o pretest

```bash
pnpm run pretest
```

###### Executar os testes

```bash
pnpm run test
```

**Siga as etapas abaixo para instalar e executar o web**

###### Abri a pasta

```bash
cd web
```

###### Instalar dependências

```bash
pnpm i
```

###### Criar o .env e preencher as variaveis

```bash
cp .env.example .env
```

###### Preencher as variaveis de ambiente

```bash
VITE_FRONTEND_URL=
VITE_BACKEND_URL=
```

###### Rodar o front

```bash
pnpm run dev
```

## Tecnologias :hammer_and_wrench::

**Front-end**:

- React
- TypeScript
- Vite
- TailwindCSS
- TanStack Query
- React Hook Form

**Back-end**:

- Node.js
- Fastify
- PostgreSQL
- Drizzle ORM
- Zod

**Infraestrutura**

- Docker
- Cloudflare R2

## Funcionalidades :white_check_mark::

**Front-end**:

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com encurtamento mal formatado
  - [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados

**Back-end**:

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com URL encurtada mal formatada
  - [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
  - [x] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  - [x] Deve ser gerado um nome aleatório e único para o arquivo
  - [x] Deve ser possível realizar a listagem de forma performática
  - [x] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

## Licença :memo::

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Autor :man_technologist::

Feito com :heart: meu **franciscojunior10** meu :point_right: [Linkedin](https://www.linkedin.com/in/franciscojunior10/)
