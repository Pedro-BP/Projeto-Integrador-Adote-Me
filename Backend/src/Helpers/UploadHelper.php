<?php

use Psr\Http\Message\UploadedFileInterface;
use Ramsey\Uuid\Uuid;

class UploadHelper
{
    // Lista dos formatos de imagem aceitos.
    private const MIME_EXTENSAO = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif',
    ];

    // Tamanho maximo permitido para a imagem, 5mb .
    private const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5MB

    // Salva a imagem na pasta escolhida.
    public static function salvar(UploadedFileInterface $arquivo, string $subpasta): string
    {
        // Verifica se aconteceu algum erro no upload.
        if ($arquivo->getError() !== UPLOAD_ERR_OK) {
            throw new InvalidArgumentException('Falha no envio do arquivo');
        }
        // Confere se a imagem não pasou do tamanho permitido.
        if ($arquivo->getSize() > self::TAMANHO_MAXIMO) {
            throw new InvalidArgumentException('A imagem deve ter no máximo 5MB');
        }

        // Descobre o tipo da imagem enviada.
        $mime = $arquivo->getClientMediaType();

        // Verifica se esse formato é aceito.
        if (!isset(self::MIME_EXTENSAO[$mime])) {
            throw new InvalidArgumentException('Formato de imagem não suportado (use JPEG, PNG, WEBP ou GIF)');
        }

        // Pega a extensão correspondente ao tipo da imagem.
        $extensao = self::MIME_EXTENSAO[$mime];

        // Gera um nome único para evitar arquivos com nomes repetidos.
        $nomeArquivo = Uuid::uuid4()->toString() . '.' . $extensao;

        // Define a pasta onde a imagem será salva.
        $pastaDestino = __DIR__ . "/../../public/uploads/$subpasta";

        // Se a pasta ainda não existir, ela é criada.
        if (!is_dir($pastaDestino)) {
            mkdir($pastaDestino, 0777, true);
        }

        $arquivo->moveTo("$pastaDestino/$nomeArquivo");

        // Retorna o caminho da imagem salva
        return "/uploads/$subpasta/$nomeArquivo";
    }

    // Remove uma imagem salva.
    public static function remover(?string $foto): void
    {
        // Se não tiver foto ou o caminho da errado.
        if (!$foto || !str_starts_with($foto, '/uploads/')) {
            return;
        }
        // Monta o caminho completo do arquivo.
        $caminho = __DIR__ . '/../../public' . $foto;

        // Se o arquivo existir, ele é apagado.
        if (is_file($caminho)) {
            unlink($caminho);
        }
    }
}
