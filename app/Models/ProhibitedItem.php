<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProhibitedItem extends Model
{
    protected $fillable = ['prohibited_category_id', 'label', 'sort_order'];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProhibitedCategory::class, 'prohibited_category_id');
    }
}
