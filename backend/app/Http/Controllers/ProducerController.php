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
        $producer = Producer::create($request->all());

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
        $producer->update($request->all());

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
}
