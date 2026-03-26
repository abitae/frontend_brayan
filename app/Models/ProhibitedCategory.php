<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class ProhibitedCategory extends Model
{
    protected $fillable = ['title', 'sort_order'];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(ProhibitedItem::class, 'prohibited_category_id')->orderBy('sort_order');
    }

    /**
     * Formato para páginas públicas: { title, items: string[] }.
     *
     * @return Collection<int, array{title: string, items: string[]}>
     */
    public static function listForFront(): Collection
    {
        return self::with('items')->orderBy('sort_order')->get()->map(fn (self $c) => [
            'title' => $c->title,
            'items' => $c->items->pluck('label')->values()->all(),
        ]);
    }

    /**
     * Formato para admin (CRUD): id, title, items con id y label.
     *
     * @return Collection<int, array{id: int, title: string, items: array<int, array{id: int, label: string}>}>
     */
    public static function listForAdmin(): Collection
    {
        return self::with('items')->orderBy('sort_order')->get()->map(fn (self $c) => [
            'id' => $c->id,
            'title' => $c->title,
            'items' => $c->items->map(fn ($i) => ['id' => $i->id, 'label' => $i->label])->values()->all(),
        ]);
    }
}
