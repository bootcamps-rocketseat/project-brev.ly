<h1 align="center">
<img width="162" height="44" alt="Logo" src="https://github.com/user-attachments/assets/d12681a6-1854-4589-ab91-776fba678570" />
</h1>

<h3 align="center">
  Desafio Prático: Brev.ly
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/bootcamps-rocketseat/project-brev.ly?color=%5965E0">

  <a href="https://www.linkedin.com/in/franciscojunior10/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-franciscojunior10-%5965E0">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/bootcamps-rocketseat/project-brev.ly?color=%5965E0">

  <a href="https://github.com/bootcamps-rocketseat/project-brev.ly/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/bootcamps-rocketseat/project-brev.ly?color=%5965E0">
  </a>

  <a href="https://github.com/bootcamps-rocketseat/project-brev.ly/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/bootcamps-rocketseat/project-brev.ly?color=%5965E0">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/bootcamps-rocketseat/project-brev.ly?color=%5965E0">

   <a href="https://github.com/bootcamps-rocketseat/project-brev.ly/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/bootcamps-rocketseat/project-brev.ly?color=%5965E0">
  </a>
</p>

<p align="center">
  <a href="#sobre-o-projeto-open_file_folder">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação-e-uso-desktop_computer">Instalação e uso</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias-hammer_and_wrench">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença-memo">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#autor-man_technologist">Autor</a>
</p>

## Demonstração

<p>

[▶️ Assistir vídeo](https://github.com/user-attachments/assets/7ffa78cb-8f76-4f7e-8e38-c8ff2347b17c)

</p>

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

## Licença :memo::

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Autor :man_technologist::

Feito com :heart: meu **franciscojunior10** meu :point_right: [Linkedin](https://www.linkedin.com/in/franciscojunior10/)
