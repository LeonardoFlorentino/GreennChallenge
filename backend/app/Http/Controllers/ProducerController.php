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
        return response()->json(Producer::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $producer = Producer::create($request->validate($this->rules()));

        return response()->json($producer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Producer $producer)
    {
        return response()->json($producer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producer $producer)
    {
        $producer->update($request->validate($this->rules(true)));

        return response()->json($producer->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producer $producer)
    {
        $producer->delete();

        return response()->noContent();
    }

    private function rules(bool $isUpdate = false): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';

        return [
            'name' => [$required, 'string', 'max:255'],
            'email' => [$required, 'email', 'max:255'],
            'document' => [$required, 'string', 'max:50'],
            'status' => [$required, 'in:active,inactive'],
            'commission' => [$required, 'integer', 'min:0', 'max:100'],
            'imageUrl' => [$required, 'url', 'max:2048'],
            'image_url_has_name' => [$required, 'boolean'],
            'followers_instagram' => [$required, 'integer', 'min:0'],
            'is_trending' => [$required, 'boolean'],
            'category' => [$required, 'string', 'max:255'],
            'direct_sales_last_year' => [$required, 'integer', 'min:0'],
            'indirect_sales_last_year' => [$required, 'integer', 'min:0'],
            'direct_sales_last_month' => [$required, 'integer', 'min:0'],
            'indirect_sales_last_month' => [$required, 'integer', 'min:0'],
            'last_sale_value' => [$required, 'integer', 'min:0'],
        ];
    }
}
