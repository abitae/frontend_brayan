<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'servicio',
        'mensaje',
        'estimated_price',
        'final_price',
    ];

    protected $casts = [
        'estimated_price' => 'decimal:2',
        'final_price' => 'decimal:2',
    ];
}
