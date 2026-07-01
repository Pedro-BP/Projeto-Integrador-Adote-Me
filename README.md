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

## Arquitetura e tecnologias

| Camada                 | Tecnologia                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------ |
| **Frontend**           | React JS + Vite, estilizado com TailwindCSS                                          |
| **Backend**            | PHP com o framework Slim4 — API própria (RESTful), seguindo arquitetura MVC          |
| **Autenticação**       | JWT (Json Web Token) para login, com autenticação por roles (dois perfis de usuário) |
| **Banco de dados**     | MySQL, com Prisma como ORM                                                           |
| **Ambiente local**     | XAMPP                                                                                |
| **Outras ferramentas** | Canva (prototipagem) · GitHub (versionamento e gestão do projeto)                    |

## Como rodar o projeto

> Seção em construção — assim que o setup do frontend/backend estiver definido, adicionaremos aqui os comandos de instalação e execução , configuração do XAMPP/MySQL, variáveis de ambiente, etc.

## Equipe

- João P. A. de Souza
- Pedro B. Pospichil

## Status

Projeto em desenvolvimento — Projeto Integrador do curso.

<!-- ## Licença
> Defina aqui a licença do projeto (ex: MIT), se aplicável. -->
