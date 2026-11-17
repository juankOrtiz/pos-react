<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provincias = [
            'Misiones',
            'Corrientes',
            'Entre Rios',
            'Buenos Aires',
            'Chaco',
            'Formosa',
            'Neuquen'
        ];

        foreach ($provincias as $provincia) {
            Province::create(['nombre' => $provincia]);
        }
    }
}
