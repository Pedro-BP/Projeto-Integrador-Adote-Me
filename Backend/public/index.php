<?php
require_once __DIR__ . "/../vendor/autoload.php";

use Slim\Factory\AppFactory;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

// CORS
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader("Access-Control-Allow-Origin", "*")
        ->withHeader("Access-Control-Allow-Headers", "Content-Type")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
});

// Error Middleware (mostra os erro maluco)
$app->addErrorMiddleware(true, true, true);

// Carregar Rotas
$routes = require __DIR__ . "/../src/routes.php";
$routes($app);

// Iniciar aplicação 
$app->run();
