<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingRoute extends Model
{
    protected $table = 'pricing_routes';

    protected $fillable = ['origin', 'destination', 'base_fee', 'price_per_kg', 'volumetric_factor'];

    protected $casts = [
        'base_fee' => 'decimal:2',
        'price_per_kg' => 'decimal:4',
        'volumetric_factor' => 'integer',
    ];
}
