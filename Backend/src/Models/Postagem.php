<?php

require_once __DIR__ . "/../Database/Connection.php";

use Ramsey\Uuid\Uuid;

class Postagem
{
    private const SELECT_COM_JOIN =
    "SELECT postagens.*, pets.nome AS pet_nome, usuarios.nome AS usuario_nome
         FROM postagens
         JOIN pets ON pets.id = postagens.pet_id
         JOIN usuarios ON usuarios.id = postagens.usuario_id";

    public static function all(array $filtros = [])
    {
        $db = Connection::get();
        $sql = self::SELECT_COM_JOIN . " WHERE 1=1";
        $params = [];
        if (!empty($filtros['pet_id'])) {
            $sql .= " AND postagens.pet_id = :pet_id";
            $params['pet_id'] = $filtros['pet_id'];
        }
        $sql .= " ORDER BY postagens.criado_em DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function findById($id)
    {
        $db = Connection::get();
        $stmt = $db->prepare(self::SELECT_COM_JOIN . " WHERE postagens.id = :id");
        $stmt->execute(['id' => $id]);
        $postagem = $stmt->fetch(PDO::FETCH_ASSOC);
        return $postagem ?: null;
    }

    public static function create(array $dados, string $usuarioId)
    {
        $db = Connection::get();
        $id = Uuid::uuid4()->toString();
        $stmt = $db->prepare(
            "INSERT INTO postagens (id, pet_id, usuario_id, foto, relato)
             VALUES (:id, :pet_id, :usuario_id, :foto, :relato)"
        );
        $stmt->execute([
            'id'         => $id,
            'pet_id'     => $dados['pet_id'],
            'usuario_id' => $usuarioId,
            'foto'       => $dados['foto']   ?? null,
            'relato'     => $dados['relato'] ?? null,
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
