<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    public $timestamps = false;

    protected $guarded = [];

    public function clientes(): HasMany
    {
        return $this->hasMany(Cliente::class);
    }
}
