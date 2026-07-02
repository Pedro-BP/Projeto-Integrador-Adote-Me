<?php

require_once __DIR__ . "/Controllers/PetController.php";

return function ($app) {
    $pet = new PetController();

    $app->get('/pets', [$pet, 'index']);
};
