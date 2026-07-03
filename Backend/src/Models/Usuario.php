<?php

require_once __DIR__ . "/../Database/Connection.php";

use Ramsey\Uuid\Uuid;

class Usuario
{
    // Mostra todas as colunas do usuário menos a senha
    public static function all()
    {
        $db = Connection::get();
        return $db
            ->query("SELECT id, nome, email, perfil, criado_em FROM usuarios")
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create(array $dados)
    {
        $db = Connection::get();
        $id = Uuid::uuid4()->toString();
        $stmt = $db->prepare(
            "INSERT INTO usuarios (id, nome, email, senha_hash, perfil)
             VALUES (:id, :nome, :email, :senha_hash, :perfil)"
        );
        $stmt->execute([
            'id'            => $id,
            'nome'          => $dados['nome'],
            'email'         => $dados['email'],
            'senha_hash'    => password_hash($dados['senha'], PASSWORD_DEFAULT),
            'perfil'        => $dados['perfil'] ?? 'usuario',
        ]);
        return $id;
    }

    public static function findById($id)
    {
        $db = Connection::get();
        $stmt = $db->prepare(
            "SELECT id, nome, email, perfil, criado_em FROM usuarios WHERE id = :id"
        );
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function findByEmail($email)
    {
        $db = Connection::get();
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
