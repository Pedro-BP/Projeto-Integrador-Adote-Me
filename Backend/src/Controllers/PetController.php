<?php

require_once __DIR__ . "/../Models/Pet.php";

class PetController
{
    public function index($request, $response)
    {
        $data = Pet::all();
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
}
