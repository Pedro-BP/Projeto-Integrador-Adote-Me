<?php

require_once __DIR__ . "/../Database/Connection.php";

class Pet
{
    public static function all()
    {
        $db = Connection::get();
        return $db
            ->query("SELECT * FROM pets")
            ->fetch(PDO::FETCH_ASSOC);
    }
}
