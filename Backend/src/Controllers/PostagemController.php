<?php

require_once __DIR__ . "/../Models/Postagem.php";
require_once __DIR__ . "/../Models/Pet.php";

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PostagemController
{
    public function index(Request $request, Response $response): Response
    {
        $filtros = $request->getQueryParams();
        $postagens = Postagem::all([
            'pet_id' => $filtros['pet_id'] ?? null,
        ]);

        $response->getBody()->write(json_encode($postagens));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function show(Request $request, Response $response, array $args): Response
    {
        $postagem = Postagem::findById($args['id']);

        if (!$postagem) {
            $response->getBody()->write(json_encode(['erro' => 'Postagem não encontrada']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($postagem));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function store(Request $request, Response $response): Response
    {
        $dados = json_decode($request->getBody()->getContents(), true) ?? [];

        if (empty($dados['pet_id'])) {
            $response->getBody()->write(json_encode(['erro' => 'pet_id é obrigatório']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        if (!Pet::findById($dados['pet_id'])) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $usuarioId = $request->getAttribute('usuario_id');
        $id = Postagem::create($dados, $usuarioId);

        $response->getBody()->write(json_encode([
            'id'       => $id,
            'mensagem' => 'Postagem criada com sucesso',
        ]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function curtir(Request $request, Response $response, array $args): Response
    {
        $postagem = Postagem::findById($args['id']);

        if (!$postagem) {
            $response->getBody()->write(json_encode(['erro' => 'Postagem não encontrada']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        Postagem::curtir($args['id']);

        $response->getBody()->write(json_encode(['mensagem' => 'Curtida registrada']));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}
