<?php

use Psr\Http\Message\UploadedFileInterface;
use Ramsey\Uuid\Uuid;

class UploadHelper
{
    private const MIME_EXTENSAO = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif',
    ];

    private const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5MB

    public static function salvar(UploadedFileInterface $arquivo, string $subpasta): string
    {
        if ($arquivo->getError() !== UPLOAD_ERR_OK) {
            throw new InvalidArgumentException('Falha no envio do arquivo');
        }
        if ($arquivo->getSize() > self::TAMANHO_MAXIMO) {
            throw new InvalidArgumentException('A imagem deve ter no máximo 5MB');
        }

        $mime = $arquivo->getClientMediaType();
        if (!isset(self::MIME_EXTENSAO[$mime])) {
            throw new InvalidArgumentException('Formato de imagem não suportado (use JPEG, PNG, WEBP ou GIF)');
        }

        $extensao = self::MIME_EXTENSAO[$mime];
        $nomeArquivo = Uuid::uuid4()->toString() . '.' . $extensao;
        $pastaDestino = __DIR__ . "/../../public/uploads/$subpasta";

        if (!is_dir($pastaDestino)) {
            mkdir($pastaDestino, 0777, true);
        }

        $arquivo->moveTo("$pastaDestino/$nomeArquivo");

        return "/uploads/$subpasta/$nomeArquivo";
    }

    public static function remover(?string $fotoUrl): void
    {
        if (!$fotoUrl || !str_starts_with($fotoUrl, '/uploads/')) {
            return;
        }
        $caminho = __DIR__ . '/../../public' . $fotoUrl;
        if (is_file($caminho)) {
            unlink($caminho);
        }
    }
}
