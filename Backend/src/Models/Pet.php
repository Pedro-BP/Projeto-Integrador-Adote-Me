<?php

require_once __DIR__ . "/../Database/Connection.php";

use Ramsey\Uuid\Uuid;

class Pet
{
    public static function all(array $filtros = [])
    {
        $db = Connection::get();
        $sql = "SELECT * FROM pets WHERE 1=1";
        $params = [];
        if (!empty($filtros['tipo'])) {
            $sql .= " AND tipo = :tipo";
            $params['tipo'] = $filtros['tipo'];
        }
        if (!empty($filtros['porte'])) {
            $sql .= " AND porte = :porte";
            $params['porte'] = $filtros['porte'];
        }
        $sql .= " ORDER BY criado_em DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function findById($id)
    {
        $db = Connection::get();
        $stmt = $db->prepare("SELECT * FROM pets WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $pet = $stmt->fetch(PDO::FETCH_ASSOC);
        return $pet ?: null;
    }

    public static function create(array $dados, string $adminId)
    {
        $db = Connection::get();
        $id = Uuid::uuid4()->toString();
        $stmt = $db->prepare(
            "INSERT INTO pets (id, nome, tipo, porte, idade, cidade, bairro, foto_url, historia, numero, email, admin_id)
             VALUES (:id, :nome, :tipo, :porte, :idade, :cidade, :bairro, :foto_url, :historia, :numero, :email, :admin_id)"
        );
        $stmt->execute([
            'id'        => $id,
            'nome'      => $dados['nome'],
            'tipo'      => $dados['tipo'],
            'porte'     => $dados['porte'],
            'idade'     => $dados['idade']    ?? null,
            'cidade'    => $dados['cidade']   ?? null,
            'bairro'    => $dados['bairro']   ?? null,
            'foto_url'  => $dados['foto_url'] ?? null,
            'historia'  => $dados['historia'] ?? null,
            'numero'    => $dados['numero']   ?? null,
            'email'     => $dados['email']    ?? null,
            'admin_id'  => $adminId,
        ]);
        return $id;
    }

    public static function update(string $id, array $dados)
    {
        $campos = ['nome', 'tipo', 'porte', 'idade', 'cidade', 'bairro', 'foto_url', 'historia', 'numero', 'email', 'status'];
        $sets = [];
        $params = ['id' => $id];
        foreach ($campos as $campo) {
            if (array_key_exists($campo, $dados)) {
                $sets[] = "$campo = :$campo";
                $params[$campo] = $dados[$campo];
            }
        }
        if (empty($sets)) {
            return false;
        }
        $db = Connection::get();
        $sql = "UPDATE pets SET " . implode(', ', $sets) . " WHERE id = :id";
        $stmt = $db->prepare($sql);
        return $stmt->execute($params);
    }

    public static function delete(string $id)
    {
        $db = Connection::get();
        $stmt = $db->prepare("DELETE FROM pets WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
