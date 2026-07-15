<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Psr7\Response as Psr7Response;

class AuthMiddleware
{
    // Uso: new AuthMiddleware() exige apenas login válido
    //      new AuthMiddleware('admin') exige perfil admin
    public static function check(?string $perfil = null): callable
    {
        return function (Request $request, $handler) use ($perfil) {

            // Pega o token enviado no cabeçalho do header.
            $header = $request->getHeaderLine('Authorization');

            // Se não tiver token, retorna erro.
            if (empty($header) || !preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
                return self::erro('Token não informado', 401);
            }
            try {
                // Tenta validar o token.
                $decoded = JWT::decode($matches[1], new Key($_ENV['JWT_KEY'], 'HS256'));
            } catch (\Throwable $e) {

                // Se der erro significa que o token não é valido.
                return self::erro('Token inválido ou expirado', 401);
            }

            // Se a rota exigir um perfil especifico é verificado isso.
            if ($perfil !== null && $decoded->perfil !== $perfil) {
                return self::erro('Acesso restrito', 403);
            }

            // Guarda algumas informações do usuario para usar depois.
            $request = $request
                ->withAttribute('usuario_id', $decoded->sub)
                ->withAttribute('usuario_perfil', $decoded->perfil);

            // Continua para a próxima etapa da requisição.
            return $handler->handle($request);
        };
    }

    // Cria uma resposta de erro em formato json.
    private static function erro(string $mensagem, int $status): Response
    {
        $response = new Psr7Response();
        $response->getBody()->write(json_encode(['erro' => $mensagem]));
        return $response->withStatus($status)->withHeader('Content-Type', 'application/json');
    }
}
