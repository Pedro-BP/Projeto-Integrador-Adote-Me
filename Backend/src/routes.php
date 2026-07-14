<?php

require_once __DIR__ . "/Middlewares/AuthMiddleware.php";
require_once __DIR__ . "/Controllers/UsuarioController.php";
require_once __DIR__ . "/Controllers/PetController.php";
require_once __DIR__ . "/Controllers/PostagemController.php";

return function ($app) {
    $usuario = new UsuarioController();
    $app->get('/usuarios', [$usuario, 'index'])->add(AuthMiddleware::check('admin'));
    $app->post('/usuarios', [$usuario, 'store']);
    $app->post('/login', [$usuario, 'login']);

    $pet = new PetController();
    $app->get('/pets', [$pet, 'index']);
    $app->get('/pets/{id}', [$pet, 'show']);
    $app->post('/pets', [$pet, 'store'])->add(AuthMiddleware::check('admin'));
    $app->put('/pets/{id}', [$pet, 'update'])->add(AuthMiddleware::check('admin'));
    $app->post('/pets/{id}/foto', [$pet, 'atualizarFoto'])->add(AuthMiddleware::check('admin'));
    $app->delete('/pets/{id}', [$pet, 'destroy'])->add(AuthMiddleware::check('admin'));

    $postagem = new PostagemController();
    $app->get('/postagens', [$postagem, 'index']);
    $app->get('/postagens/{id}', [$postagem, 'show']);
    $app->post('/postagens', [$postagem, 'store'])->add(AuthMiddleware::check());
    $app->post('/postagens/{id}/curtir', [$postagem, 'curtir']);
};
