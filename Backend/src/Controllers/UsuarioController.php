<?php

require_once __DIR__ . "/../Models/Usuario.php";

use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UsuarioController
{
    public function index(Request $request, Response $response): Response
    {
        $usuarios = Usuario::all();

        $response->getBody()->write(json_encode($usuarios));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    public function store(Request $request, Response $response): Response
    {
        $dados = json_decode($request->getBody()->getContents(), true);

        if (empty($dados['nome']) || empty($dados['email']) || empty($dados['senha'])) {
            $response->getBody()->write(json_encode([
                'erro' => 'Nome, email e senha são obrigatórios',
            ]));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        if (Usuario::findByEmail($dados['email'])) {
            $response->getBody()->write(json_encode([
                'erro' => 'E-mail já cadastrado',
            ]));
            return $response->withStatus(409)->withHeader('Content-Type', 'application/json');
        }

        // 'perfil' nunca vem do cliente: todo cadastro público é sempre 'usuario'
        $id = Usuario::create([
            'nome'  => $dados['nome'],
            'email' => $dados['email'],
            'senha' => $dados['senha'],
        ]);

        $response->getBody()->write(json_encode([
            'id'       => $id,
            'mensagem' => 'Usuário criado com sucesso',
        ]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    public function login(Request $request, Response $response): Response
    {
        $dados = json_decode($request->getBody()->getContents(), true);

        if (empty($dados['email']) || empty($dados['senha'])) {
            $response->getBody()->write(json_encode([
                'erro' => 'Email e senha são obrigatórios',
            ]));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        $usuario = Usuario::findByEmail($dados['email']);

        if (!$usuario || !password_verify($dados['senha'], $usuario['senha_hash'])) {
            $response->getBody()->write(json_encode([
                'erro' => 'Email ou senha inválidos',
            ]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $payload = [
            'sub'    => $usuario['id'],
            'perfil' => $usuario['perfil'],
            'iat'    => time(),
            'exp'    => time() + (60 * 60 * 24), // token válido por 24h
        ];

        $token = JWT::encode($payload, $_ENV['JWT_KEY'], 'HS256');

        $response->getBody()->write(json_encode([
            'token'   => $token,
            'usuario' => [
                'id'     => $usuario['id'],
                'nome'   => $usuario['nome'],
                'email'  => $usuario['email'],
                'perfil' => $usuario['perfil'],
            ],
        ]));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}
