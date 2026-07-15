<?php

require_once __DIR__ . "/../Models/Pet.php";
require_once __DIR__ . "/../Helpers/UploadHelper.php";

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PetController
{
    // Listas que servem para validar alguns campos.
    private const TIPOS = ['cachorro', 'gato'];
    private const PORTES = ['pequeno', 'medio', 'grande'];
    private const STATUS = ['disponivel', 'adotado'];

    // Lista os pets, podendo filtrar por alguns campos.
    public function index(Request $request, Response $response): Response
    {
        // Pega os filtros enviados pela Url.
        $filtros = $request->getQueryParams();

        // Busca os pets no banco usando os filtros,se tiver.
        $pets = Pet::all([
            'tipo'   => $filtros['tipo']   ?? null,
            'porte'  => $filtros['porte']  ?? null,
            'status' => $filtros['status'] ?? null,
        ]);

        // Retorna os dados em json.
        $response->getBody()->write(json_encode($pets));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    // Mostra apenas um pet pelo id.
    public function show(Request $request, Response $response, array $args): Response
    {
        $pet = Pet::findById($args['id']);

        // Se não encontrar, retorna um erro.
        if (!$pet) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        $response->getBody()->write(json_encode($pet));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    // Cadastra um novo pet.
    public function store(Request $request, Response $response): Response
    {
        // Pega os dados enviados.
        $dados = $request->getParsedBody() ?? [];

        // Faz algumas validações padrões.
        $erro = $this->validar($dados);
        if ($erro) {
            $response->getBody()->write(json_encode(['erro' => $erro]));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        // Verifica se alguma foto foi enviada.
        $arquivo = $request->getUploadedFiles()['foto'] ?? null;
        if ($arquivo && $arquivo->getError() === UPLOAD_ERR_OK) {
            try {
                // Salva a imagem e guarda o caminho dela.
                $dados['foto'] = UploadHelper::salvar($arquivo, 'pets');
            } catch (InvalidArgumentException $e) {
                $response->getBody()->write(json_encode(['erro' => $e->getMessage()]));
                return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
            }
        }

        // Pega o id do administrador que fez o cadastro.
        $adminId = $request->getAttribute('usuario_id');

        // Salva o pet no banco.
        $id = Pet::create($dados, $adminId);
        $response->getBody()->write(json_encode([
            'id'       => $id,
            'mensagem' => 'Pet cadastrado com sucesso',
        ]));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    // Atualiza somente a foto do pet.
    public function atualizarFoto(Request $request, Response $response, array $args): Response
    {
        // Verifica se o pet existe.
        $pet = Pet::findById($args['id']);
        if (!$pet) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        // Pega a imagem enviada.
        $arquivo = $request->getUploadedFiles()['foto'] ?? null;
        if (!$arquivo || $arquivo->getError() !== UPLOAD_ERR_OK) {
            $response->getBody()->write(json_encode(['erro' => 'Envie um arquivo de imagem no campo "foto"']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        try {
            $novoPath = UploadHelper::salvar($arquivo, 'pets');
        } catch (InvalidArgumentException $e) {
            $response->getBody()->write(json_encode(['erro' => $e->getMessage()]));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        // Remove a foto antiga e atualiza no banco.
        UploadHelper::remover($pet['foto']);
        Pet::update($args['id'], ['foto' => $novoPath]);

        $response->getBody()->write(json_encode([
            'foto'     => $novoPath,
            'mensagem' => 'Foto atualizada com sucesso',
        ]));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    // Atualiza os dados de um pet.
    public function update(Request $request, Response $response, array $args): Response
    {
        $pet = Pet::findById($args['id']);
        if (!$pet) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        // Pega os dados enviados em json.
        $dados = json_decode($request->getBody()->getContents(), true) ?? [];

        // Valida alguns campos dos dados enviados.
        if (isset($dados['tipo']) && !in_array($dados['tipo'], self::TIPOS, true)) {
            $response->getBody()->write(json_encode(['erro' => 'Tipo inválido']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }
        if (isset($dados['porte']) && !in_array($dados['porte'], self::PORTES, true)) {
            $response->getBody()->write(json_encode(['erro' => 'Porte inválido']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }
        if (isset($dados['status']) && !in_array($dados['status'], self::STATUS, true)) {
            $response->getBody()->write(json_encode(['erro' => 'Status inválido']));
            return $response->withStatus(422)->withHeader('Content-Type', 'application/json');
        }

        // Atualiza no banco.
        Pet::update($args['id'], $dados);
        $response->getBody()->write(json_encode(['mensagem' => 'Pet atualizado com sucesso']));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    // Remove um pet.
    public function destroy(Request $request, Response $response, array $args): Response
    {
        $pet = Pet::findById($args['id']);
        if (!$pet) {
            $response->getBody()->write(json_encode(['erro' => 'Pet não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        try {
            Pet::delete($args['id']);
        } catch (\PDOException $e) {

            // Se existir relacionamento no banco não é possivel excluir.
            if ($e->getCode() === '23000') {
                $response->getBody()->write(json_encode([
                    'erro' => 'Não é possível remover: existem postagens vinculadas a este pet',
                ]));
                return $response->withStatus(409)->withHeader('Content-Type', 'application/json');
            }
            throw $e;
        }
        UploadHelper::remover($pet['foto']);
        $response->getBody()->write(json_encode(['mensagem' => 'Pet removido com sucesso']));
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
    }

    // Faz uma validaçao antes de cadastrar.
    private function validar(array $dados): ?string
    {
        // Confere se os campos principais foram preenchidos.
        if (empty($dados['nome']) || empty($dados['tipo']) || empty($dados['porte'])) {
            return 'Nome, tipo e porte são obrigatórios';
        }

        // Verifica se o tipo de pet existe na lista.
        if (!in_array($dados['tipo'], self::TIPOS, true)) {
            return 'Tipo inválido';
        }
        // Verifica se o porte do pet existe na lista. 
        if (!in_array($dados['porte'], self::PORTES, true)) {
            return 'Porte inválido';
        }
        return null;
    }
}
