<?php

class Connection
{
    // Cria e retorna a conexão com o database.
    public static function get()
    {
        return new PDO(
            "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};",

            // Usuario do banco.
            $_ENV['DB_USER'],

            // Senha do banco.
            $_ENV['DB_PASS'],

            // Faz o php mostrar os erros caso aconteça na conexão.
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
}
