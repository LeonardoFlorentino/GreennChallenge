<?php

use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

return function (Exceptions $exceptions) {
    // Erro de autenticação
    $exceptions->render(function (AuthenticationException $e, $request) {
        return response()->json([
            'mensagem' => 'Não autenticado. Faça login para continuar.',
            'tipo' => 'auth',
            'rota' => $request->path(),
        ], 401);
    });

    // Erro de validação
    $exceptions->render(function (ValidationException $e, $request) {
        return response()->json([
            'mensagem' => 'Dados inválidos enviados. Corrija os campos destacados.',
            'tipo' => 'validation',
            'rota' => $request->path(),
            'erros' => $e->errors(),
        ], 422, [], JSON_UNESCAPED_UNICODE);
    });

    // Modelo não encontrado
    $exceptions->render(function (ModelNotFoundException $e, $request) {
        return response()->json([
            'mensagem' => 'Recurso solicitado não foi encontrado no banco de dados.',
            'tipo' => 'not_found',
            'rota' => $request->path(),
        ], 404);
    });

    // Rota não encontrada
    $exceptions->render(function (NotFoundHttpException $e, $request) {
        return response()->json([
            'mensagem' => 'A rota solicitada não existe. Verifique a URL.',
            'tipo' => 'route',
            'rota' => $request->path(),
        ], 404);
    });

    // Método não permitido
    $exceptions->render(function (MethodNotAllowedHttpException $e, $request) {
        return response()->json([
            'mensagem' => 'Método HTTP não permitido para esta rota. Use um método válido.',
            'tipo' => 'method',
            'rota' => $request->path(),
            'permitidos' => $e->getHeaders()['Allow'] ?? null,
        ], 405);
    });

    // Erro genérico
    $exceptions->render(function (Throwable $e, $request) {
        return response()->json([
            'mensagem' => 'Erro interno do servidor. Tente novamente mais tarde.',
            'tipo' => 'server',
            'rota' => $request->path(),
            'erro_tecnico' => $e->getMessage(),
            'arquivo' => $e->getFile(),
            'linha' => $e->getLine(),
        ], 500);
    });
};
