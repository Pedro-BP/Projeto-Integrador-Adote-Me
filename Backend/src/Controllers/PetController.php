<?php

require_once __DIR__ . "/../Models/Pet.php";

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PetController
{
    private const TIPOS = ['cachorro', 'gato'];
    private const PORTES = ['pequeno', 'medio', 'grande'];
    private const STATUS = ['disponivel', 'adotado'];

    public function index(Request $request, Response $response): Response
    {
        $filtros = $request->getQueryParams();
        $pets = Pet::all([
            'tipo'  => $filtros['tipo']  ?? null,
            'porte' => $filtros['porte'] ?? null,
        ]);

        $response->getBody()->write(json_encode($pets));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function show(Request $request, Response $response, array $args): Response
    {
        $pet = Pet::findById($args['id']);

        if (!$pet) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($pet));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function store(Request $request, Response $response): Response
    {
        $dados = json_decode($request->getBody()->getContents(), true) ?? [];

        $erro = $this->validar($dados);
        if ($erro) {
            $response->getBody()->write(json_encode(['erro' => $erro]));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        $adminId = $request->getAttribute('usuario_id');
        $id = Pet::create($dados, $adminId);

        $response->getBody()->write(json_encode([
            'id'       => $id,
            'mensagem' => 'Pet cadastrado com sucesso',
        ]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        $pet = Pet::findById($args['id']);
        if (!$pet) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $dados = json_decode($request->getBody()->getContents(), true) ?? [];

        if (isset($dados['tipo']) && !in_array($dados['tipo'], self::TIPOS, true)) {
            $response->getBody()->write(json_encode(['erro' => 'Tipo inválido']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        if (isset($dados['porte']) && !in_array($dados['porte'], self::PORTES, true)) {
            $response->getBody()->write(json_encode(['erro' => 'Porte inválido']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        if (isset($dados['status']) && !in_array($dados['status'], self::STATUS, true)) {
            $response->getBody()->write(json_encode(['erro' => 'Status inválido']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        Pet::update($args['id'], $dados);

        $response->getBody()->write(json_encode(['mensagem' => 'Pet atualizado com sucesso']));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function destroy(Request $request, Response $response, array $args): Response
    {
        $pet = Pet::findById($args['id']);
        if (!$pet) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        try {
            Pet::delete($args['id']);
        } catch (\PDOException $e) {
            if ($e->getCode() === '23000') {
                $response->getBody()->write(json_encode([
                    'erro' => 'Não é possível remover: existem postagens vinculadas a este pet',
                ]));
                return $response->withStatus(409)->withHeader('Content-Type', 'application/json');
            }
            throw $e;
        }

        $response->getBody()->write(json_encode(['mensagem' => 'Pet removido com sucesso']));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    private function validar(array $dados): ?string
    {
        if (empty($dados['nome']) || empty($dados['tipo']) || empty($dados['porte'])) {
            return 'Nome, tipo e porte são obrigatórios';
        }

        if (!in_array($dados['tipo'], self::TIPOS, true)) {
            return 'Tipo inválido';
        }

        if (!in_array($dados['porte'], self::PORTES, true)) {
            return 'Porte inválido';
        }

        return null;
    }
}
