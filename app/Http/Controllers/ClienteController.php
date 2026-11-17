<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Cliente;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::orderBy('nombre')->get();

        return Inertia::render('clientes/index', [
            'clientes' => $clientes,
        ]);
    }

    public function store(StoreClienteRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Cliente::create($data);

        return redirect()->route('clientes.index');
    }

    public function update(UpdateClienteRequest $request, Cliente $cliente): RedirectResponse
    {
        $data = $request->validated();

        $cliente->update($data);

        return redirect()->route('clientes.index');
    }

    public function destroy(Cliente $cliente)
    {

        $cliente->delete();

        return redirect()->route('clientes.index');
    }
}
