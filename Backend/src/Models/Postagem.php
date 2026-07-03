<?php

require_once __DIR__ . "/../Database/Connection.php";

use Ramsey\Uuid\Uuid;

class Postagem
{
    public static function all(array $filtros = [])
    {
        $db = Connection::get();
        $sql = "SELECT * FROM postagens WHERE 1=1";
        $params = [];
        if (!empty($filtros['pet_id'])) {
            $sql .= " AND pet_id = :pet_id";
            $params['pet_id'] = $filtros['pet_id'];
        }
        $sql .= " ORDER BY criado_em DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function findById($id)
    {
        $db = Connection::get();
        $stmt = $db->prepare("SELECT * FROM postagens WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $postagem = $stmt->fetch(PDO::FETCH_ASSOC);
        return $postagem ?: null;
    }

    public static function create(array $dados, string $usuarioId)
    {
        $db = Connection::get();
        $id = Uuid::uuid4()->toString();
        $stmt = $db->prepare(
            "INSERT INTO postagens (id, pet_id, usuario_id, foto_url, relato)
             VALUES (:id, :pet_id, :usuario_id, :foto_url, :relato)"
        );
        $stmt->execute([
            'id'         => $id,
            'pet_id'     => $dados['pet_id'],
            'usuario_id' => $usuarioId,
            'foto_url'   => $dados['foto_url'] ?? null,
            'relato'     => $dados['relato']   ?? null,
        ]);
        return $id;
    }

    public static function curtir(string $id)
    {
        $db = Connection::get();
        $stmt = $db->prepare("UPDATE postagens SET curtidas = curtidas + 1 WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
