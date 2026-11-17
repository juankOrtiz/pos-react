<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable('nombre', 'direccion', 'province_id', 'codigo_postal', 'telefono')]
class Cliente extends Model
{
    use SoftDeletes;

    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_id');
    }
}
