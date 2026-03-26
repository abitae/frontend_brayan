<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Service extends Model
{
    protected $fillable = ['title', 'description', 'icon_type', 'image_url', 'sort_order'];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    /**
     * Formato para páginas públicas (home, servicios): id como string.
     *
     * @return Collection<int, array{id: string, title: string, description: string, icon_type: string}>
     */
    public static function listForFront(): Collection
    {
        return self::orderBy('sort_order')->get()->map(fn (self $s) => [
            'id' => (string) $s->id,
            'title' => $s->title,
            'description' => $s->description,
            'icon_type' => $s->icon_type,
            'image_url' => $s->image_url,
        ]);
    }
}
