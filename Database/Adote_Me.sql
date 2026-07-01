-- Banco de dados do projeto Adote-Me

CREATE DATABASE IF NOT EXISTS adote_me
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE adote_me;

-- Tabela: usuarios
CREATE TABLE usuarios (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela: pets
CREATE TABLE pets (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('cachorro', 'gato') NOT NULL,
    porte ENUM('pequeno', 'medio', 'grande') NOT NULL,
    idade VARCHAR(50),
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    foto_url VARCHAR(255),
    historia TEXT,
    numero VARCHAR(20),
    email VARCHAR(150),
    status ENUM('disponivel', 'adotado') NOT NULL DEFAULT 'disponivel',
    admin_id CHAR(36) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pets_admin
        FOREIGN KEY (admin_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- Tabela: postagens
CREATE TABLE postagens (
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    pet_id CHAR(36) NOT NULL,
    usuario_id CHAR(36) NOT NULL,
    foto_url VARCHAR(255),
    relato TEXT,
    curtidas INT NOT NULL DEFAULT 0,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_pet
        FOREIGN KEY (pet_id) REFERENCES pets(id),
    CONSTRAINT fk_posts_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;