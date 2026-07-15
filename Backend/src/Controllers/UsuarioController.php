<?php

require_once __DIR__ . "/../Models/Usuario.php";

use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UsuarioController
{

    // Lista todos os usuarios.
    public function index(Request $request, Response $response): Response
    {
        // Busca os usuarios no banco.
        $usuarios = Usuario::all();

        // Retorna em formato json.
        $response->getBody()->write(json_encode($usuarios));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    // Faz o cadastro de um novo usuario.
    public function store(Request $request, Response $response): Response
    {
        // Pega dados enviados em json.
        $dados = json_decode($request->getBody()->getContents(), true);

        // Verifica se os campos principais foram preenchidos.
        if (empty($dados['nome']) || empty($dados['email']) || empty($dados['senha'])) {
            $response->getBody()->write(json_encode([
                'erro' => 'Nome, email e senha são obrigatórios',
            ]));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }
        // Confere se já existe alguém usando esse email.
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

    // Faz o login do usuario.
    public function login(Request $request, Response $response): Response
    {

        // Pega os dados enviados.
        $dados = json_decode($request->getBody()->getContents(), true);

        // Verifica se email e senha foram informados.
        if (empty($dados['email']) || empty($dados['senha'])) {
            $response->getBody()->write(json_encode([
                'erro' => 'Email e senha são obrigatórios',
            ]));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        // Procura o usuario pelo email.
        $usuario = Usuario::findByEmail($dados['email']);

        // Confere se o usuario existe e se a senha está correta.
        if (!$usuario || !password_verify($dados['senha'], $usuario['senha_hash'])) {
            $response->getBody()->write(json_encode([
                'erro' => 'Email ou senha inválidos',
            ]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Monta os dados que vão ficar dentro do token.
        $payload = [
            'sub'    => $usuario['id'],
            'perfil' => $usuario['perfil'],
            'iat'    => time(),
            'exp'    => time() + (60 * 60 * 24), // token válido por 24h
        ];

        // Gera o token jwt.
        $token = JWT::encode($payload, $_ENV['JWT_KEY'], 'HS256');

        // Retorna o token e algumas informações do usuario.
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
