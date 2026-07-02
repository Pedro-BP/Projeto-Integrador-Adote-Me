# Projeto Integrador (PI) - Adote-Me

Mural de anúncios simples e centralizado para conectar pessoas que encontraram animais abandonados (ou têm filhotes para doar) com pessoas interessadas em adotar um pet.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/CSS-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![PHP](https://img.shields.io/badge/Backend-PHP%20%2F%20Slim4-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/Banco%20de%20Dados-MySQL-4479A1?logo=mysql&logoColor=white)

## Sobre o projeto

PI para o Módulo de Desenvolvimento de Sistemas do curso Técnico em Informática do Senac.

O **Adote-Me** nasceu para resolver um problema simples: em Tramandaí, ONGs já organizam feiras de adoção de pets e fazem um bom trabalho, mas essa iniciativa é pouco divulgada e os anúncios de animais para adoção acabam se perdendo em redes sociais. O projeto centraliza esses anúncios em um site único, organizado e fácil de navegar.
**Objetivo principal:** criar um site que funcione como um mural de anúncios, substituindo posts perdidos em redes sociais por uma listagem organizada de animais disponíveis para adoção.
**Público-alvo:**

- Pessoas que querem adotar um animal.
- Pessoas que precisam doar um pet (ou encontraram um animal abandonado).

## Funcionalidades

### O que o sistema terá

- **Tela principal (mural):** listagem visual com foto, nome, idade aproximada, porte (pequeno/médio/grande) e cidade/bairro de cada animal.
- **Filtros de busca:** por tipo de animal (cachorro ou gato) e por porte.
- **Cadastro de pets (CRUD):** área administrativa para cadastrar, editar e marcar pets como "Adotado" (removendo-os da listagem pública).
- **Página de detalhes do pet:** história do animal e contato (WhatsApp ou e-mail) do responsável pela doação.
- **Tela de "pós-adoção":** espaço para quem adotou um pet postar fotos/relatos de como o animal está, com reações de outros usuários.

### Fora do escopo

- ❌ Chat interno — o contato acontece direto por WhatsApp/e-mail informado no anúncio.
- ❌ Cadastro/login para o adotante — qualquer pessoa pode navegar e ver os animais sem se cadastrar.
- ❌ Cobrança de taxas ou doações em dinheiro pelo site.
- ❌ Comentários nas postagens de pós-adoção — apenas reações (curtidas) são permitidas.
- ❌ Edição/exclusão de postagem pelo próprio usuário após publicada.
- ❌ Geolocalização/busca por distância — cidade/bairro são apenas texto livre, sem mapa.
- ❌ Aplicativo mobile nativo — o projeto é apenas web.

## Protótipo

> Protótipo das telas em produção no Canva — o link e os prints serão adicionados aqui assim que estiver pronto.

## Arquitetura e tecnologias

| Camada                 | Tecnologia                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------ |
| **Frontend**           | React JS + Vite, estilizado com TailwindCSS                                          |
| **Backend**            | PHP com o framework Slim4 — API própria (RESTful), seguindo arquitetura MVC          |
| **Autenticação**       | JWT (Json Web Token) para login, com autenticação por roles (dois perfis de usuário) |
| **Banco de dados**     | MySQL — IDs em UUID gerados no PHP com `ramsey/uuid`                                 |
| **Ambiente local**     | XAMPP                                                                                |
| **Outras ferramentas** | Canva (prototipagem) · GitHub (versionamento e gestão do projeto)                    |

## Estrutura de pastas

> Seção em construção — a árvore de diretórios do repositório será adicionada aqui em breve.

## Estrutura do banco de dados

O banco é composto por três entidades principais: **usuarios** (admins e usuários comuns), **pets** (animais anunciados) e **postagens** (relatos publicados por quem adotou). Os IDs são UUIDs (`CHAR(36)`) em vez de inteiros sequenciais, para não expor a contagem de registros nem permitir adivinhar URLs de outros pets/posts. O UUID é gerado na aplicação PHP com a biblioteca [`ramsey/uuid`](https://github.com/ramsey/uuid) antes do INSERT.

![Diagrama ER](https://ibb.co/d0x2Gqnr)

### usuarios

| Campo      | Tipo          | Descrição                                |
| ---------- | ------------- | ---------------------------------------- |
| id         | char(36) (PK) | UUID gerado pela aplicação (ramsey/uuid) |
| nome       | string        | Nome do usuário                          |
| email      | string        | E-mail (login), único                    |
| senha_hash | string        | Senha criptografada                      |
| perfil     | string        | `admin` ou `usuario`                     |
| criado_em  | datetime      | Data de criação da conta                 |

### pets

| Campo           | Tipo                        | Descrição                                |
| --------------- | --------------------------- | ---------------------------------------- |
| id              | char(36) (PK)               | UUID gerado pela aplicação (ramsey/uuid) |
| nome            | string                      | Nome do pet                              |
| tipo            | string                      | Cachorro ou gato                         |
| porte           | string                      | Pequeno, médio ou grande                 |
| idade           | string                      | Idade estimada                           |
| cidade / bairro | string                      | Localização do pet                       |
| foto_url        | string                      | Foto do animal                           |
| historia        | text                        | História/descrição do pet                |
| numero / email  | string                      | Contato do responsável pela doação       |
| status          | string                      | `disponivel` ou `adotado`                |
| admin_id        | char(36) (FK → usuarios.id) | Admin que cadastrou o pet                |
| criado_em       | datetime                    | Data do cadastro                         |

### postagens

| Campo      | Tipo                        | Descrição                                |
| ---------- | --------------------------- | ---------------------------------------- |
| id         | char(36) (PK)               | UUID gerado pela aplicação (ramsey/uuid) |
| pet_id     | char(36) (FK → pets.id)     | Pet relacionado ao post                  |
| usuario_id | char(36) (FK → usuarios.id) | Usuário logado que fez o post            |
| foto_url   | string                      | Foto do pet já adotado                   |
| relato     | text                        | Relato de como o pet está                |
| curtidas   | int                         | Contador de reações (sem exigir login)   |
| criado_em  | datetime                    | Data da publicação                       |

### Relacionamentos

- Um **usuario** (perfil `admin`) cadastra vários **pets**.
- Um **usuario** (perfil `usuario`) publica várias **postagens**, mas precisa estar logado para isso.
- Um **pet** pode ter várias **postagens** associadas a ele.

O script completo de criação do banco está em [`database.sql`](./database.sql).

## Endpoints da API

> Seção em construção — a documentação das rotas (endpoints) da API será adicionada aqui em breve.

## Como rodar o projeto

> Seção em construção — assim que o setup do frontend/backend estiver definido, adicionaremos aqui os comandos de instalação e execução , configuração do XAMPP/MySQL, variáveis de ambiente, etc.

## Padrão de commits

O projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/), com mensagens no imperativo e em português.
| Tipo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat` | Nova funcionalidade ou parte da estrutura do sistema | `feat: adiciona script de criação do banco de dados` |
| `fix` | Correção de bug | `fix: corrige filtro de porte na listagem de pets` |
| `docs` | Mudanças em documentação (README, comentários) | `docs: atualiza README com informações do projeto` |
| `chore` | Tarefas de organização/configuração (rename, configs) | `chore: renomeia adote-me.sql para database.sql` |
| `refactor` | Reorganização de código sem mudar comportamento | `refactor: reorganiza rotas da API` |

Boas práticas:

- Verbo no imperativo ("adiciona", "corrige"), não no gerúndio ou particípio.
- Mensagem curta e objetiva na primeira linha (até ~50 caracteres).
- Escopo opcional entre parênteses, ex: `feat(database): adiciona schema inicial`.

## Equipe

- João P. A. de Souza
- Pedro B. Pospichil

## Status

Projeto em desenvolvimento — Projeto Integrador do curso.

<!-- ## Licença
> Defina aqui a licença do projeto (ex: MIT), se aplicável. -->
