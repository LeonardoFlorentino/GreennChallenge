<?php

namespace App\Http\Controllers;

use App\Models\Producer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProducerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (app()->environment('local')) {
            \Log::info('[REQUEST] GET /producers | Listando todos os produtores');
        }
        $result = Producer::all();
        if (app()->environment('local')) {
            \Log::info('[SUCESSO] GET /producers | Total: ' . $result->count());
        }
        return response()->json($result);
    }
    public function store(Request $request)
    {
        if (app()->environment('local')) {
            \Log::info('[REQUEST] POST /producers | Dados recebidos: ' . json_encode($request->all()));
        }
        $producer = Producer::create($request->validate($this->rules()));
        if (app()->environment('local')) {
            \Log::info('[SUCESSO] POST /producers | Produtor criado com ID: ' . $producer->id);
        }
        return response()->json($producer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Producer $producer)
    {
        if (app()->environment('local')) {
            \Log::info('[REQUEST] GET /producers/' . $producer->id . ' | Exibindo produtor');
        }
        return response()->json($producer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producer $producer)
    {
        if (app()->environment('local')) {
            \Log::info('[REQUEST] PUT /producers/' . $producer->id . ' | Dados recebidos: ' . json_encode($request->all()));
        }
        $producer->update($request->validate($this->rules(true)));
        if (app()->environment('local')) {
            \Log::info('[SUCESSO] PUT /producers/' . $producer->id . ' | Produtor atualizado');
        }
        return response()->json($producer->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producer $producer)
    {
        if (app()->environment('local')) {
            \Log::info('[REQUEST] DELETE /producers/' . $producer->id . ' | Deletando produtor');
        }
        $producer->delete();
        if (app()->environment('local')) {
            \Log::info('[SUCESSO] DELETE /producers/' . $producer->id . ' | Produtor deletado');
        }
        return response()->noContent();
    }

    private function rules(bool $isUpdate = false): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';

        $optional = $isUpdate ? 'sometimes' : 'nullable';
        return [
            'name' => [$required, 'string', 'max:255'],
            'email' => [$required, 'email', 'max:255'],
            'document' => [$optional, 'string', 'max:50'],
            'status' => [$optional, 'in:active,inactive'],
            'commission' => [$optional, 'integer', 'min:0', 'max:100'],
            'imageUrl' => [$optional, 'url', 'max:2048'],
            'image_url_has_name' => [$optional, 'boolean'],
            'followers_instagram' => [$optional, 'integer', 'min:0'],
            'is_trending' => [$optional, 'boolean'],
            'category' => [$optional, 'string', 'max:255'],
            'direct_sales_last_year' => [$optional, 'integer', 'min:0'],
            'indirect_sales_last_year' => [$optional, 'integer', 'min:0'],
            'direct_sales_last_month' => [$optional, 'integer', 'min:0'],
            'indirect_sales_last_month' => [$optional, 'integer', 'min:0'],
            'last_sale_value' => [$optional, 'integer', 'min:0'],
        ];
    }
}
