<?php
require_once __DIR__ . "/../vendor/autoload.php";

use Slim\Factory\AppFactory;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->safeLoad();

// Em produção (Railway) não existe arquivo .env — as variáveis vêm
// direto do ambiente (getenv()), então garantimos que caiam em $_ENV também.
foreach (["DB_HOST", "DB_NAME", "DB_USER", "DB_PASS", "JWT_KEY"] as $chave) {
    if (!isset($_ENV[$chave]) && getenv($chave) !== false) {
        $_ENV[$chave] = getenv($chave);
    }
}

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

// CORS
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader("Access-Control-Allow-Origin", "*")
        ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
});

// Error Middleware (mostra os erro maluco)
$app->addErrorMiddleware(true, true, true);

// Responde preflight (OPTIONS) de qualquer rota antes de chegar no auth/404
$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

// Carregar Rotas
$routes = require __DIR__ . "/../src/routes.php";
$routes($app);

// Iniciar aplicação 
$app->run();
