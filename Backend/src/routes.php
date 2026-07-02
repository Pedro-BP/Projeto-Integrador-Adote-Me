<?php

require_once __DIR__ . "/Controllers/PetController.php";
require_once __DIR__ . "/Controllers/UsuarioController.php";

return function ($app) {

    $usuario = new UsuarioController();
    $app->get('/usuarios', [$usuario, 'index']);
    $app->post('/usuarios', [$usuario, 'store']);
    $app->post('/login', [$usuario, 'login']);
};
