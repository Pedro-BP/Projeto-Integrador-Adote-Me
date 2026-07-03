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
            $header = $request->getHeaderLine('Authorization');
            if (empty($header) || !preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
                return self::erro('Token não informado', 401);
            }
            try {
                $decoded = JWT::decode($matches[1], new Key($_ENV['JWT_KEY'], 'HS256'));
            } catch (\Throwable $e) {
                return self::erro('Token inválido ou expirado', 401);
            }
            if ($perfil !== null && $decoded->perfil !== $perfil) {
                return self::erro('Acesso restrito', 403);
            }
            $request = $request
                ->withAttribute('usuario_id', $decoded->sub)
                ->withAttribute('usuario_perfil', $decoded->perfil);

            return $handler->handle($request);
        };
    }

    private static function erro(string $mensagem, int $status): Response
    {
        $response = new Psr7Response();
        $response->getBody()->write(json_encode(['erro' => $mensagem]));
        return $response->withStatus($status)->withHeader('Content-Type', 'application/json');
    }
}
